import { Router } from "express";
import calificacionController from "../controllers/calificacion.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

// Listar calificaciones
router.get("/", calificacionController.listarCalificaciones);
// Obtener calificación por ID
router.get("/:id", calificacionController.obtenerCalificacion);
// Registrar calificación
router.post("/", calificacionController.registrarCalificacion);
// Actualizar calificación
router.put("/:id", calificacionController.actualizarCalificacion);
// Eliminar calificación
router.delete("/:id", calificacionController.eliminarCalificacion);

export default router;
