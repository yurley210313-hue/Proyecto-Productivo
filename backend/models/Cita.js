import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema({
  
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente"
  },
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio"
  },
  odontologo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Odontologo"
  },
  fecha: Date,
  hora: String,
  mensaje: String,
});

// 🔒 BLOQUEO DE DUPLICADOS 
CitaSchema.index(
  { odontologo: 1, fecha: 1, hora: 1 },
  { unique: true }
);

export default mongoose.model("Cita", CitaSchema);