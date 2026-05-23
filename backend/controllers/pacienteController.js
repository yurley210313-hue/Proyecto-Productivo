import Paciente from "../models/Paciente.js";
export const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarPaciente = async (req, res) => {
  try {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Paciente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarPorDocumento = async (req, res) => {
  try {
    const { documento } = req.params;

    const paciente = await Paciente.findOne({ documento });

    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    res.json(paciente);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};