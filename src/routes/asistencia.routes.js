import { Router } from "express";
import asistenciaController from "../controllers/asistencia.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js"

const router = Router();

// Listar asistencias
router.get("/", asistenciaController.listarAsistencias);
// Obtener asistencia por ID
router.get("/:id", asistenciaController.obtenerAsistencia);
// Registrar asistencia
router.post("/", asistenciaController.registrarAsistencia);
// Actualizar asistencia
router.put("/:id", asistenciaController.actualizarAsistencia);
// Eliminar asistencia
router.delete("/:id", asistenciaController.eliminarAsistencia);

export default router;
