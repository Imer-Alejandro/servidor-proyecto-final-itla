import * as usuarioService from "../services/usuario.service.js";

export const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res
      .status(201)
      .json({ message: "Usuario creado correctamente", data: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuario", error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    await usuarioService.actualizar(req.params.id, req.body);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminar(req.params.id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};

export const obtenerUsuariosPorRol = async (req, res) => {
  try {
    const rol = req.params.rol; // toma el rol desde la URL
    const usuarios = await usuarioService.obtenerUsuariosPorRol(rol);
    res.json({ message: `Usuarios con rol ${rol}`, data: usuarios });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener usuarios por rol",
        error: error.message,
      });
  }
};
