import express from "express";
import {
  obtenerSecciones,
  obtenerSeccionesPorCurso,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
} from "../controllers/seccion.controller.js";

const router = express.Router();

router.get("/", obtenerSecciones);
router.get("/:curso_id", obtenerSeccionesPorCurso);
router.post("/", crearSeccion);
router.put("/:id", actualizarSeccion);
router.delete("/:id", eliminarSeccion);

export default router;
