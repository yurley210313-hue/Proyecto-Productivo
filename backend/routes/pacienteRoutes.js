import express from "express";
import {   obtenerPacientes,   obtenerPaciente,   crearPaciente,   actualizarPaciente,
eliminarPaciente,   buscarPorDocumento } from "../controllers/pacienteController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas pacientes
router.get("/", verificarToken, obtenerPacientes);
router.get("/documento/:documento", verificarToken, buscarPorDocumento);
router.get("/:id", verificarToken, obtenerPaciente);

router.post("/", verificarToken, crearPaciente);
router.put("/:id", verificarToken, actualizarPaciente);
router.delete("/:id", verificarToken, eliminarPaciente);

export default router;