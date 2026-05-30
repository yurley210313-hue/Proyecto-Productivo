import Servicio from "../models/Servicio.js";

// GET
export const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find()
.populate("especialidad");
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST
export const crearServicio = async (req, res) => {
  try {
    const nuevo = new Servicio({
      ...req.body,
      precioReferencial: Number(req.body.precioReferencial)
    });

    await nuevo.save();
    res.json(nuevo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT
export const actualizarServicio = async (req, res) => {
  try {
    const actualizado = await Servicio.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        precioReferencial: Number(req.body.precioReferencial)
      },
      {  new: true, runValidators: true }
    );

    res.json(actualizado);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const eliminarServicio = async (req, res) => {
  try {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Servicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};