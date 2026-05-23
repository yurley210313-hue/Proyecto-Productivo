import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import {    crearOdontologo,   obtenerOdontologos,   actualizarOdontologo,   eliminarOdontologo
} from "../controllers/odontologoController.js";

const router = express.Router();

router.get("/", verificarToken, obtenerOdontologos);
router.post("/", verificarToken, crearOdontologo);
router.put("/:id", verificarToken, actualizarOdontologo);
router.delete("/:id", verificarToken, eliminarOdontologo);


export default router;