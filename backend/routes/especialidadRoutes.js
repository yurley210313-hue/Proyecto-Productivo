import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";

import {   obtenerEspecialidades,   crearEspecialidad,   actualizarEspecialidad,   eliminarEspecialidad
} from "../controllers/especialidadController.js";

const router = express.Router();

// GET
router.get("/", obtenerEspecialidades);

// POST
router.post(   "/",   verificarToken,   crearEspecialidad );

// PUT
router.put(   "/:id",   verificarToken,   actualizarEspecialidad );

// DELETE
router.delete(   "/:id",   verificarToken,   eliminarEspecialidad );

export default router;