import Especialidad from "../models/Especialidad.js";

// GET
export const obtenerEspecialidades = async (req, res) => {

  try {

    const especialidades =
      await Especialidad.find();

    res.json(especialidades);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al obtener especialidades"
    });

  }

};

// POST
export const crearEspecialidad = async (req, res) => {

  try {

    const nuevaEspecialidad =
      new Especialidad(req.body);

    await nuevaEspecialidad.save();

    res.status(201).json(nuevaEspecialidad);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al crear especialidad"
    });

  }

};

// PUT
export const actualizarEspecialidad = async (req, res) => {

  try {

    const especialidad =
      await Especialidad.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(especialidad);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al actualizar especialidad"
    });

  }

};

// DELETE
export const eliminarEspecialidad = async (req, res) => {

  try {

    await Especialidad.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Especialidad eliminada"
    });

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al eliminar especialidad"
    });

  }

};