import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String },
  documento: { type: String },
  telefono: { type: String },
  email: { type: String },
  fechaNacimiento: { type: Date },

  //  doctor fijo del paciente
  odontologoAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Odontologo"
  }
});

export default mongoose.model("Paciente", PacienteSchema);