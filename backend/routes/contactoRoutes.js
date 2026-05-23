import express from "express";
import upload from "../middlewares/upload.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import authAdmin from "../middlewares/authAdmin.js";
import { body } from "express-validator";
import {  crearMensaje,  obtenerMensajes, responderMensaje,} from "../controllers/contactoController.js";

const router = express.Router();

// Obtener mensajes (solo admin)
router.get( "/", verificarToken, authAdmin, obtenerMensajes);

// Responder mensaje (solo admin)
router.put( "/responder/:id", verificarToken, authAdmin, responderMensaje);

// Crear mensaje público
router.post(  "/",  upload.single("archivo"),  [body("tipo").notEmpty().withMessage("Tipo requerido"),body("nombre") .notEmpty()
      .withMessage("Nombre requerido"), body("email") .isEmail() .withMessage("Email inválido"), body("mensaje") .notEmpty()
      .withMessage("Mensaje requerido"),], crearMensaje);

      export default router;