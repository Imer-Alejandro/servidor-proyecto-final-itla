import { Router } from "express";
import {
  registrarCurso,
  obtenerCursos,
  obtenerCursoPorId,
  obtenerCursosPorEstado,
  actualizarCurso,
  eliminarCurso,
} from "../controllers/curso.controller.js";

const router = Router();

// Rutas principales de curso
router.post("/", registrarCurso);
router.get("/", obtenerCursos);
router.get("/:id", obtenerCursoPorId);
router.get("/estado/:estado", obtenerCursosPorEstado);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCurso);

export default router;
