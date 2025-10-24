import { Router } from "express";
import {
  registrarPago,
  obtenerPagos,
  obtenerPagoPorId,
  obtenerPagosPorEstudiante,
  actualizarPago,
  eliminarPago,
} from "../controllers/pago.controller.js";

const router = Router();

// Rutas principales de pago
router.post("/", registrarPago);
router.get("/", obtenerPagos);
router.get("/:id", obtenerPagoPorId);
router.get("/estudiante/:idEstudiante", obtenerPagosPorEstudiante);
router.put("/:id", actualizarPago);
router.delete("/:id", eliminarPago);

export default router;
