import * as usuarioService from "../services/usuario.service.js";

export const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const userData = await usuarioService.login(req.body);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: userData,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const obtenerUsuarios = async (_, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    res.json(usuarios);
  } catch {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(usuario);
  } catch {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    await usuarioService.actualizar(req.params.id, req.body);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminar(req.params.id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

export const obtenerUsuariosPorRol = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuariosPorRol(req.params.rol);
    res.json({
      message: `Usuarios con rol ${req.params.rol}`,
      data: usuarios,
    });
  } catch {
    res.status(500).json({
      message: "Error al obtener usuarios por rol",
    });
  }
};
