import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Configuración
dotenv.config();

// Crear app
const app = express();

// Conectar base de datos 
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
import authRoutes from "./routes/authRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import citaRoutes from "./routes/citaRoutes.js";
import servicioRoutes from "./routes/servicioRoutes.js";
import odontologoRoutes from "./routes/odontologoRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import contactoRoutes from "./routes/contactoRoutes.js";
import especialidadRoutes from "./routes/especialidadRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/odontologos", odontologoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/uploads",  express.static("uploads"));


// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});