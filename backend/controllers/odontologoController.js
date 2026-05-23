import Odontologo from "../models/Odontologo.js";

//Crear Ondotólogo 
export const crearOdontologo = async (req, res) => {
  try {
    const odontologo = new Odontologo(req.body);
    await odontologo.save();
    res.status(201).json(odontologo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear odontólogo" });
  }
};

// Obtener todos los Odontólogo

export const obtenerOdontologos = async (req, res) => {
  try {
    const odontologos = await Odontologo.find();
    res.json(odontologos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener odontólogos" });
  }
};

//Actualizar Odontólogo
export const actualizarOdontologo = async (req, res) => {
  try {
    const odontologo = await Odontologo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(odontologo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

// Eliminar Odontólogo

export const eliminarOdontologo = async (req, res) => {
  try {
    await Odontologo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
};