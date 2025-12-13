import { Router } from "express";
import {
  obtenerInscripciones,
  obtenerPorEstudiante,
  obtenerPorCurso,
  crearInscripcion,
  actualizarInscripcionController,
  eliminarInscripcion,
} from "../controllers/inscripcion.controller.js";

const router = Router();

router.get("/", obtenerInscripciones);
router.get("/estudiante/:id", obtenerPorEstudiante);
router.get("/curso/:id", obtenerPorCurso);
router.post("/", crearInscripcion);
router.put("/:id", actualizarInscripcionController);
router.delete("/:id", eliminarInscripcion);

export default router;
