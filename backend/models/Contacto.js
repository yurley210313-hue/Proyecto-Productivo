import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: [
      "Consulta",
      "Sugerencia",
      "Queja",
      "Reclamo",
    ],
    required: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  documento: {
    type: String,
  },

  telefono: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },

  mensaje: {
    type: String,
    required: true,
  },

  // SOLO para reclamos
  fechaIncidente: {
    type: Date,
  },

  descripcionIncidente: {
    type: String,
  },

  estado: {
    type: String,
    enum: [
      "Pendiente",
      "Respondido",
      "Cerrado",
    ],
    default: "Pendiente",
  },

  respuestaAdmin: {
    type: String,
    default: "",
  },

  fechaRespuesta: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  prioridad: {
  type: String,
  enum: ["Baja", "Media", "Alta"],
},
archivo: {
  type: String,
},

});
 
export default mongoose.model("Contacto", contactoSchema);