import { Router } from "express";
import {
  obtenerInscripciones,
  obtenerPorEstudiante,
  obtenerPorCurso,
  crearInscripcion,
  actualizarInscripcion,
  eliminarInscripcion,
} from "../controllers/inscripcion.controller.js";

const router = Router();

router.get("/", obtenerInscripciones);
router.get("/estudiante/:id", obtenerPorEstudiante);
router.get("/curso/:id", obtenerPorCurso);
router.post("/", crearInscripcion);
router.put("/:id", actualizarInscripcion);
router.delete("/:id", eliminarInscripcion);

export default router;
