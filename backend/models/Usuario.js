import mongoose from "mongoose";
const usuarioSchema = new mongoose.Schema({

nombre: String,
email: String,
password: String,

rol: {
  type: String,
  enum: ["admin", "secretaria", "odontologo"],
  default: "secretaria"
}

});

export default mongoose.model("Usuario", usuarioSchema);