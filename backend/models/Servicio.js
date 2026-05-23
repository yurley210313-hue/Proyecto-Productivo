import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({

  nombre: String,
  descripcion: String,
  precioReferencial: Number,
  duracion: Number,

  especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Especialidad"
  },

  activo: {
    type: Boolean,
    default: true
  },

  imagen: String

});

export default mongoose.model("Servicio", servicioSchema);