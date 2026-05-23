import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { obtenerHorariosDisponibles } from "../controllers/citaController.js";

const router = express.Router();

// 📅 disponibilidad de horarios
router.get("/", verificarToken, obtenerHorariosDisponibles);



export default router;