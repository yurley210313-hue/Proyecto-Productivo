import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import {   crearCita,   obtenerCitas,   obtenerHorariosDisponibles,   obtenerCalendario,   obtenerCitasPorPaciente,   eliminarCita,
  actualizarCita, sugerirOdontologo, buscarCitasPaciente
} from "../controllers/citaController.js";

const router = express.Router();

// Rutas privadas

router.get("/", verificarToken, obtenerCitas);
router.delete("/:id", verificarToken, eliminarCita);
router.put("/:id", verificarToken, actualizarCita);
router.get("/calendario", verificarToken, obtenerCalendario);
router.get("/paciente/:id", verificarToken, obtenerCitasPorPaciente);
router.get("/sugerir-odontologo", verificarToken, sugerirOdontologo);

// Ruta pública
router.get("/disponibilidad", obtenerHorariosDisponibles);
router.post("/", crearCita); 
router.get("/buscar", buscarCitasPaciente);

export default router;