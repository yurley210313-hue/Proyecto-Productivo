import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import {   obtenerServicios,   crearServicio,   actualizarServicio,   eliminarServicio } from "../controllers/servicioController.js";

const router = express.Router();

// GET todos
router.get("/", obtenerServicios);


// POST crear
router.post("/", verificarToken, crearServicio);

// PUT actualizar
router.put("/:id", verificarToken, actualizarServicio);

// DELETE eliminar
router.delete("/:id", verificarToken, eliminarServicio);

export default router;