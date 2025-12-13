import { Router } from "express";
import {
  obtenerEstudiantes,
  obtenerEstudiante,
  inscribir,
  historial,
  pagos,
} from "../controllers/estudiante.controller.js";

const router = Router();

// Solo ADMIN puede listar todos los estudiantes
router.get("/", obtenerEstudiantes);

// ADMIN y el propio ESTUDIANTE pueden ver su perfil
router.get("/:id", obtenerEstudiante);

// Inscripción (solo ADMIN puede inscribir manualmente)
router.post("/inscribir", inscribir);

// Historial académico (ESTUDIANTE ve el suyo, ADMIN puede ver todos)
router.get("/:id/historial", historial);

// Pagos del estudiante
router.get("/:id/pagos", pagos);

export default router;
