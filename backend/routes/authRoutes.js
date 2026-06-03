import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { login, crearAdmin } from "../controllers/authController.js";
import authAdmin from "../middlewares/authAdmin.js";


const router = express.Router();

router.post("/login", login);
router.post( "/register-admin", verificarToken, authAdmin, crearAdmin);

export default router;