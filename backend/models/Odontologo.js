import mongoose from "mongoose";

const odontologoSchema = new mongoose.Schema({
  nombre: String,

  documento: String,

  especialidades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Especialidad"
    }
  ],

  telefono: String,
  email: String,

  estado: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Odontologo", odontologoSchema);