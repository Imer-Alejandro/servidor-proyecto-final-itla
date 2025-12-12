import { Router } from "express";
import {
  obtenerDocentes,
  obtenerDocente,
  obtenerSecciones,
  registrarAsistencia,
  registrarCalificacion,
  obtenerEvaluaciones,
} from "../controllers/docente.controller.js";

const router = Router();
router.get("/", obtenerDocentes);

router.get("/:id", obtenerDocente);

// Secciones asignadas a un docente
router.get("/:id/secciones", obtenerSecciones);

// Registrar asistencia
router.post("/asistencia", registrarAsistencia);

// Registrar calificación
router.post("/calificacion", registrarCalificacion);

// Obtener evaluaciones de una sección
router.get("/evaluaciones/:seccion_id", obtenerEvaluaciones);

export default router;
