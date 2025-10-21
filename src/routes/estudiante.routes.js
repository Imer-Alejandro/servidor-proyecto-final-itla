import { Router } from "express";
import {
  obtenerEstudiantes,
  obtenerEstudiante,
  inscribir,
  historial,
  pagos,
} from "../controllers/estudiante.controller.js";

import { verificarRol, permitirRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo ADMIN puede listar todos los estudiantes
router.get("/", verificarRol, permitirRoles("ADMIN"), obtenerEstudiantes);

// ADMIN y el propio ESTUDIANTE pueden ver su perfil
router.get(
  "/:id",
  verificarRol,
  permitirRoles("ADMIN", "ESTUDIANTE"),
  obtenerEstudiante
);

// Inscripción (solo ADMIN puede inscribir manualmente)
router.post("/inscribir", verificarRol, permitirRoles("ADMIN"), inscribir);

// Historial académico (ESTUDIANTE ve el suyo, ADMIN puede ver todos)
router.get(
  "/:id/historial",
  verificarRol,
  permitirRoles("ADMIN", "ESTUDIANTE"),
  historial
);

// Pagos del estudiante
router.get(
  "/:id/pagos",
  verificarRol,
  permitirRoles("ADMIN", "ESTUDIANTE"),
  pagos
);

export default router;
