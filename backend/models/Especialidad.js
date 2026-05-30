import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    collection: "especialidades"
  }
);

export default mongoose.model(  "Especialidad",  especialidadSchema);