import { Router } from "express";
import {
  obtenerDocentes,
  obtenerDocente,
  obtenerSecciones,
  registrarAsistencia,
  registrarCalificacion,
  obtenerEvaluaciones,
} from "../controllers/docente.controller.js";

import { verificarRol, permitirRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo ADMIN puede ver la lista completa de docentes
router.get("/", verificarRol, permitirRoles("ADMIN"), obtenerDocentes);

// ADMIN y propio DOCENTE pueden ver su perfil
router.get(
  "/:id",
  verificarRol,
  permitirRoles("ADMIN", "DOCENTE"),
  obtenerDocente
);

// Secciones asignadas a un docente
router.get(
  "/:id/secciones",
  verificarRol,
  permitirRoles("ADMIN", "DOCENTE"),
  obtenerSecciones
);

// Registrar asistencia
router.post(
  "/asistencia",
  verificarRol,
  permitirRoles("DOCENTE"),
  registrarAsistencia
);

// Registrar calificación
router.post(
  "/calificacion",
  verificarRol,
  permitirRoles("DOCENTE"),
  registrarCalificacion
);

// Obtener evaluaciones de una sección
router.get(
  "/evaluaciones/:seccion_id",
  verificarRol,
  permitirRoles("DOCENTE"),
  obtenerEvaluaciones
);

export default router;
