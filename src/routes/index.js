import { Router } from "express";

import usuarioRoutes from "./usuario.routes.js";
import cursoRoutes from "./curso.routes.js";
import seccionRoutes from "./seccion.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";
import docenteRoutes from "./docente.routes.js";
import estudianteRoutes from "./estudiante.routes.js";
import evaluacionRoutes from "./evaluacion.routes.js";
import inscripcionRoutes from "./inscripcion.routes.js";
import pagoRoutes from "./pago.routes.js";

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/cursos", cursoRoutes);
router.use("/secciones", seccionRoutes);
router.use("/asistencia", asistenciaRoutes);
router.use("/docente", docenteRoutes);
router.use("/estudiante", estudianteRoutes);
router.use("/evaluacion", evaluacionRoutes);
router.use("/inscripcion", inscripcionRoutes);
router.use("/pago", pagoRoutes);

export { router };
