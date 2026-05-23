import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { obtenerDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", verificarToken, obtenerDashboard);

export default router;