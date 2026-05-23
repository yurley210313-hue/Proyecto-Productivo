import Odontologo from "../models/Odontologo.js";
import Cita from "../models/Cita.js";

export const obtenerOdontologosPorServicio = async (
  servicioDB,
  fecha,
  hora
) => {

  // validar especialidad
  if (!servicioDB?.especialidad) {
    console.log("El servicio no tiene especialidad");
    return [];
  }

  // odontólogos activos con esa especialidad
  const odontologos = await Odontologo.find({
    especialidades: servicioDB.especialidad,
    estado: true
  });

  if (!odontologos.length) {
    console.log("No hay odontólogos para esta especialidad");
    return [];
  }

  // calcular carga de citas por odontólogo
  const odontologosConCarga = await Promise.all(

    odontologos.map(async (odontologo) => {

      const cantidadCitas = await Cita.countDocuments({
        odontologo: odontologo._id,
        fecha,
        estado: { $ne: "cancelada" }
      });

      return {
        odontologo,
        carga: cantidadCitas
      };
    })
  );

  // ordenar por menor carga
  odontologosConCarga.sort((a, b) => a.carga - b.carga);

  console.log(
    "Odontólogos ordenados:",
    odontologosConCarga.map(o => ({
      nombre: o.odontologo.nombre,
      carga: o.carga
    }))
  );

  // devolver odontólogos ordenados
  return odontologosConCarga.map(o => o.odontologo);
};