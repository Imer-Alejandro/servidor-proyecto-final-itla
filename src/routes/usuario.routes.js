import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuariosPorRol,
} from "../controllers/usuario.controllers.js";

const router = Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/rol/:rol", obtenerUsuariosPorRol);
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);

router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
