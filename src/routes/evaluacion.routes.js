import { Router } from "express";
import {
  obtenerEvaluaciones,
  obtenerPorCurso,
  crearEvaluacion,
  actualizarEvaluacion,
  eliminarEvaluacion,
} from "../controllers/evaluacion.controller.js";

const router = Router();

router.get("/", obtenerEvaluaciones);
router.get("/curso/:id", obtenerPorCurso);
router.post("/", crearEvaluacion);
router.put("/:id", actualizarEvaluacion);
router.delete("/:id", eliminarEvaluacion);

export default router;
