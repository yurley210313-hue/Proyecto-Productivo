import Cita from "../models/Cita.js";
import Paciente from "../models/Paciente.js";
import Servicio from "../models/Servicio.js";
import Odontologo from "../models/Odontologo.js";


export const obtenerDashboard = async (req, res) => {
  try {

    const hoy = new Date();

    const inicioDia = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate()
    );

    const finDia = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate() + 1
    );

    // 🔹 CONTADORES GENERALES
    const totalPacientes = await Paciente.countDocuments();
    const totalCitas = await Cita.countDocuments();
    const totalServicios = await Servicio.countDocuments();

    // 🔹 DATOS DEL DÍA
    const citasHoy = await Cita.countDocuments({
      fecha: { $gte: inicioDia, $lt: finDia }
    });

    const canceladas = await Cita.countDocuments({
      estado: "cancelada"
    });

    const pacientesNuevos = await Paciente.countDocuments({
      nuevoPaciente: true
    });

    const proximas = await Cita.find()
      .sort({ fecha: 1 })
      .limit(5)
      .populate("paciente");

    // 🔥 RESPUESTA COMPLETA
    res.json({
      totalPacientes,
           totalCitas,
      totalServicios,
      citasHoy,
      canceladas,
      pacientesNuevos,
      proximas
    });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};