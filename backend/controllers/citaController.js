import Cita from "../models/Cita.js";
import Paciente from "../models/Paciente.js";
import Servicio from "../models/Servicio.js";
import Odontologo from "../models/Odontologo.js";
import calcularBloques from "../utils/calcularBloques.js";
import { obtenerHorariosBase } from "../utils/horarios.js";
import { obtenerOdontologosPorServicio } from "../utils/obtenerOdontologos.js";



// CREAR CITA
export const crearCita = async (req, res) => {
      
  try {
    const {
      fecha,
      hora,
      servicio,
      paciente,
      odontologo,
      nombre,
      documento,
      fechaNacimiento,
      telefono,
      email
    } = req.body;

    if (!fecha || !hora || !servicio) {
      return res.status(400).json({
        mensaje: "Fecha, hora y servicio son obligatorios"
      });
    }

  const servicioDB = await Servicio.findById(servicio);

if (!servicioDB) {
  return res.status(404).json({ mensaje: "Servicio no encontrado" });
}

const odontologos =   await obtenerOdontologosPorServicio(
    servicioDB,
    fecha,
    hora
  );


    // ✅ validar hora dentro del horario
    const horariosValidos = obtenerHorariosBase(fecha);
    if (!horariosValidos.includes(hora)) {
      return res.status(400).json({
        mensaje: "Hora fuera del horario permitido"
      });
    }

    // ⏱ bloques SIEMPRE antes de usarlos
    const bloquesNueva = calcularBloques(hora, servicioDB.duracion);
    
    if (odontologos.length === 0) {
      return res.status(400).json({
        mensaje: "No hay odontólogos disponibles"
      });
    }

    // 📅 rango fecha
    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);
    

  // 🤖 asignación automática 

 let disponibles = [];

for (let o of odontologos) {
  const citas = await Cita.find({
    fecha: { $gte: inicioDia, $lte: finDia },
    odontologo: o._id
  }).populate("servicio");

  const conflicto = citas.some(c => {
    const bloquesExistentes = calcularBloques(
      c.hora,
      c.servicio.duracion
    );

    return bloquesNueva.some(b => bloquesExistentes.includes(b));
  });

  if (!conflicto) {
    disponibles.push({
      odontologo: o,
      carga: citas.length
    });
  }
}

if (disponibles.length === 0) {
  return res.status(400).json({
    mensaje: "No hay disponibilidad"
  });
}

// ordenar por menor carga
disponibles.sort((a, b) => a.carga - b.carga);

// tomar los de menor carga
const menorCarga = disponibles[0].carga;
const candidatos = disponibles.filter(d => d.carga === menorCarga);

// elegir aleatorio entre los mejores
const randomIndex = Math.floor(Math.random() * candidatos.length);

let odontologoAsignado;

// ✅ si admin seleccionó odontólogo
if (odontologo) {

  // ✅ buscar odontólogo manual
  odontologoAsignado = await Odontologo.findById(odontologo);

  if (!odontologoAsignado) {
    return res.status(404).json({
      mensaje: "Odontólogo no encontrado"
    });
  }

  // ✅ validar que pertenezca a la especialidad
const especialidadesOdontologo =
  odontologoAsignado.especialidades.map(e =>
    String(typeof e === "object" ? e._id : e)
  );

const especialidadServicio = String(
  typeof servicioDB.especialidad === "object"
    ? servicioDB.especialidad._id
    : servicioDB.especialidad
);

if (!especialidadesOdontologo.includes(especialidadServicio)) {
  return res.status(400).json({
    mensaje: "El odontólogo no corresponde al servicio"
  });
}
  // ✅ validar disponibilidad
  const citasOdontologo = await Cita.find({
    fecha: { $gte: inicioDia, $lte: finDia },
    odontologo: odontologoAsignado._id
  }).populate("servicio");

  const conflicto = citasOdontologo.some(c => {

    const bloquesExistentes = calcularBloques(
      c.hora,
      c.servicio.duracion
    );

    return bloquesNueva.some(
      b => bloquesExistentes.includes(b)
    );
  });

  if (conflicto) {
    return res.status(400).json({
      mensaje: "El odontólogo seleccionado no está disponible"
    });
  }

} else {

  // asignación automática
  odontologoAsignado =
    candidatos[randomIndex].odontologo;
}


//  crear paciente 
let pacienteId;

if (paciente && paciente !== "nuevo") {

  pacienteId = paciente;

} else {

  // crear/buscar automáticamente desde web pública
  let pacienteExistente = await Paciente.findOne({
    documento
  });

  if (!pacienteExistente) {

    pacienteExistente = new Paciente({
      nombre,
      documento,
      telefono,
      email,
      fechaNacimiento,
      odontologoAsignado: odontologoAsignado._id
    });

    await pacienteExistente.save();
  }

  pacienteId = pacienteExistente._id;
}

// Crear nueva cita
const nuevaCita = new Cita({
  fecha,
  hora,
  servicio,
  paciente: pacienteId,
  odontologo: odontologoAsignado._id
});

try {

  await nuevaCita.save();

} catch (error) {
if (error.code === 11000) {
return res.status(400).json({
mensaje:
"Ese horario ya fue reservado"     });   }

  throw error;
}
    res.status(201).json({
      mensaje: "Cita creada correctamente",
      odontologo: odontologoAsignado.nombre
    });

  } 
  catch (error) {
  console.error(error);

  res.status(500).json({
    mensaje: "Error al crear cita",
    error: error.message
    });
  }
};

// ===============================
// OBTENER CITAS
// ===============================
export const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate("paciente", "nombre documento telefono email")
      .populate("servicio", "nombre duracion precioReferencial")
      .populate("odontologo", "nombre");

    res.json(citas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener citas"
    });
  }
};
export const obtenerCitasPorPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    const citas = await Cita.find({ paciente: id })
      .populate("paciente", "nombre documento telefono email")
      .populate("servicio", "nombre duracion precioReferencial")
      .populate("odontologo", "nombre");

    res.json(citas);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener citas del paciente"
    });
  }
};

// BUSCAR CITAS PUBLICAS
export const buscarCitasPaciente = async (req, res) => {

  try {

    const { documento, telefono } = req.query;

    if (!documento && !telefono) {
      return res.status(400).json({
        mensaje: "Documento o teléfono requerido"
      });
    }

    const paciente = await Paciente.findOne({
      $or: [
        { documento },
        { telefono }
      ]
    });

    if (!paciente) {
      return res.status(404).json({
        mensaje: "Paciente no encontrado"
      });
    }

    const citas = await Cita.find({
      paciente: paciente._id
    })
    .populate("servicio", "nombre precioReferencial")
    .populate("odontologo", "nombre");

    res.json(citas);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al buscar citas"
    });

  }
};

// ACTUALIZAR CITA

export const actualizarCita = async (req, res) => {
  try {

    const { fecha, hora, servicio, odontologo } = req.body;

    const cita = await Cita.findById(req.params.id).populate("servicio");
    
if (req.body.estado && Object.keys(req.body).length === 1) {
  cita.estado = req.body.estado;
  await cita.save();
  return res.json({
    mensaje: "Estado actualizado correctamente",
    cita
  });

}

    if (!cita) {
      return res.status(404).json({
        mensaje: "Cita no encontrada"
      });
    }

    // 🔎 servicio (nuevo o actual)
    const servicioDB = await Servicio.findById(servicio || cita.servicio._id);

    if (!servicioDB) {
      return res.status(404).json({
        mensaje: "Servicio no encontrado"
      });
    }

    // 📅 fecha y hora finales
    const fechaFinal = fecha || cita.fecha;
    const horaFinal = hora || cita.hora;

    // ✅ validar horario permitido
    const horariosValidos = obtenerHorariosBase(fechaFinal);
    if (!horariosValidos.includes(horaFinal)) {
      return res.status(400).json({
        mensaje: "Hora fuera del horario permitido"
      });
    }

    // ⏱ bloques
    const bloquesNueva = calcularBloques(horaFinal, servicioDB.duracion);

    // 📅 rango del día
    const inicioDia = new Date(fechaFinal);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fechaFinal);
    finDia.setHours(23, 59, 59, 999);

    // 🔎 odontólogos por especialidad
    
 const odontologos =   await obtenerOdontologosPorServicio(
    servicioDB,
    fechaFinal,
    horaFinal
  );

    if (odontologos.length === 0) {
      return res.status(400).json({
        mensaje: "No hay odontólogos disponibles"
      });
    }

    let odontologoAsignado = null;

// ✅ SI EL ADMIN ELIGE MANUALMENTE
if (odontologo) {

  odontologoAsignado =
    await Odontologo.findById(odontologo);

  if (!odontologoAsignado) {
    return res.status(404).json({
      mensaje: "Odontólogo no encontrado"
    });
  }

  // validar especialidad
const especialidadesOdontologo =
  odontologoAsignado.especialidades.map(e =>
    String(typeof e === "object" ? e._id : e)
  );

const especialidadServicio = String(
  typeof servicioDB.especialidad === "object"
    ? servicioDB.especialidad._id
    : servicioDB.especialidad
);

if (!especialidadesOdontologo.includes(especialidadServicio)) {
  return res.status(400).json({
    mensaje: "El odontólogo no corresponde al servicio"
  });
}
  // validar conflictos
  const citasOdontologo = await Cita.find({
    _id: { $ne: cita._id },
    fecha: { $gte: inicioDia, $lte: finDia },
    odontologo: odontologoAsignado._id
  }).populate("servicio");

  const conflicto = citasOdontologo.some(c => {

    const bloquesExistentes = calcularBloques(
      c.hora,
      c.servicio.duracion
    );

    return bloquesNueva.some(
      b => bloquesExistentes.includes(b)
    );
  });

  if (conflicto) {
    return res.status(400).json({
      mensaje:
        "El odontólogo seleccionado no está disponible"
    });
  }

} else {

  // 🤖 automático
  odontologos.sort(() => Math.random() - 0.5);

  for (let o of odontologos) {

    const citas = await Cita.find({
      _id: { $ne: cita._id },
      fecha: { $gte: inicioDia, $lte: finDia },
      odontologo: o._id
    }).populate("servicio");

    const conflicto = citas.some(c => {

      const bloquesExistentes = calcularBloques(
        c.hora,
        c.servicio.duracion
      );

      return bloquesNueva.some(
        b => bloquesExistentes.includes(b)
      );
    });

    if (!conflicto) {
      odontologoAsignado = o;
      break;
    }
  }
}
    if (!odontologoAsignado) {
      return res.status(400).json({
        mensaje: "No hay disponibilidad en ese horario"
      });
    }

    // 💾 actualizar cita
cita.fecha = fechaFinal;
cita.hora = horaFinal;
cita.servicio = servicio || cita.servicio;
cita.odontologo = odontologoAsignado._id;

if (req.body.estado) {
cita.estado = req.body.estado;
}

try {
      await cita.save();
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          mensaje: "Ese horario ya fue reservado"
        });
      }
      throw error;
    }

    res.json({
      mensaje: "Cita actualizada correctamente",
      odontologo: odontologoAsignado.nombre,
      cita
    });
  } 
  catch (error) {
 console.error(error);

  res.status(500).json({
    mensaje: "Error al actualizar cita",
    error: error.message
    });
  }
};


// ELIMINAR CITA

export const eliminarCita = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({
        mensaje: "Cita no encontrada"
      });
    }

    await cita.deleteOne();

    res.json({
      mensaje: "Cita eliminada correctamente"
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar cita"
    });
  }
};

export const obtenerCalendario = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate("paciente")
      .populate("servicio")
      .populate("odontologo");

    res.json(citas);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener calendario"
    });

  }
};


// DISPONIBILIDAD

export const obtenerHorariosDisponibles = async (req, res) => {
  try {
    const { fecha, servicio } = req.query;

    if (!fecha || !servicio) {
      return res.status(400).json({
        mensaje: "Fecha y servicio son requeridos"
      });
    }

    const servicioDB = await Servicio.findById(servicio);

    if (!servicioDB) {
      return res.status(404).json({
        mensaje: "Servicio no encontrado"
      });
    }

    const odontologos =   await obtenerOdontologosPorServicio(
    servicioDB,
    fecha,
    null
  );

    if (odontologos.length === 0) {
      return res.json([]); 
    }

    const horariosBase = obtenerHorariosBase(fecha);

    //  rango del día
    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    //  UNA sola consulta 
    const citas = await Cita.find({
      fecha: { $gte: inicioDia, $lte: finDia },
      odontologo: { $in: odontologos.map(o => o._id) }
    }).populate("servicio");

    const disponibles = [];

    for (let hora of horariosBase) {

      const bloquesNueva = calcularBloques(hora, servicioDB.duracion);

      // verificar si AL MENOS un odontólogo está libre
      let hayDisponible = false;

      for (let o of odontologos) {

        const citasOdontologo = citas.filter(
          c => c.odontologo.toString() === o._id.toString()
        );

        const conflicto = citasOdontologo.some(c => {
          const bloquesExistentes = calcularBloques(
            c.hora,
            c.servicio.duracion
          );

          return bloquesNueva.some(b => bloquesExistentes.includes(b));
        });

        if (!conflicto) {
          hayDisponible = true;
          break;
        }
      }

      if (hayDisponible) {
        disponibles.push(hora);
      }
    }

    return res.json({
  disponibles,
  todos: horariosBase
});

  } catch (error) {
    console.error("Error disponibilidad:", error);
    return res.status(500).json({
      mensaje: "Error al obtener disponibilidad"
    });
  }
};

export const obtenerDisponibilidadOdontologo = async (req, res) => {
  try {

    const {
      fecha,
      servicio,
      odontologo
    } = req.query;

    const servicioDB =
      await Servicio.findById(servicio);

    const horariosBase =
      obtenerHorariosBase(fecha);

    const inicioDia = new Date(fecha);
    inicioDia.setHours(0,0,0,0);

    const finDia = new Date(fecha);
    finDia.setHours(23,59,59,999);

    const citas = await Cita.find({
      fecha: {
        $gte: inicioDia,
        $lte: finDia
      },
      odontologo
    }).populate("servicio");

    const disponibles = [];

    for (let hora of horariosBase) {

      const bloquesNueva =
        calcularBloques(
          hora,
          servicioDB.duracion
        );

      const conflicto = citas.some(c => {

        const bloquesExistentes =
          calcularBloques(
            c.hora,
            c.servicio.duracion
          );

        return bloquesNueva.some(
          b => bloquesExistentes.includes(b)
        );
      });

      if (!conflicto) {
        disponibles.push(hora);
      }
    }

res.json(
  disponibles.map(h => h.slice(0,5))
);

  } catch (error) {

    res.status(500).json({
      mensaje:
        "Error disponibilidad odontólogo"
    });
  }
};
export const sugerirOdontologo = async (req, res) => {
  try {
    const { fecha, hora, servicio } = req.query;

    const servicioDB = await Servicio.findById(servicio);
   const odontologos =   await obtenerOdontologosPorServicio(
    servicioDB,
    fecha,
    hora
  );
const inicioDia = new Date(fecha);
inicioDia.setHours(0,0,0,0);

const finDia = new Date(fecha);
finDia.setHours(23,59,59,999);
    let mejor = null;
    let menorCarga = Infinity;

    for (let o of odontologos) {

      const citas = await Cita.find({
        odontologo: o._id,
        fecha: { $gte: inicioDia, $lte: finDia }
      });

      if (citas.length < menorCarga) {
        menorCarga = citas.length;
        mejor = o;
      }
    }

    res.json(mejor);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al sugerir odontólogo"
    });
  }
};