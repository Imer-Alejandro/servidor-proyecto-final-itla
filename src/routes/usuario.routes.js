import { Router } from "express";
import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  obtenerUsuariosPorRol,
} from "../controllers/usuario.controllers.js";

import { verificarRol, permitirRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// rutas publicas

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
router.get("/rol/:rol", obtenerUsuariosPorRol);

export default router;
