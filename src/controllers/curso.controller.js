import * as cursoService from "../services/curso.service.js";

/**
 * Crear curso
 */
export const registrarCurso = async (req, res) => {
  try {
    const nuevoCurso = await cursoService.crearCurso(req.body);
    res
      .status(201)
      .json({ message: "Curso creado correctamente", data: nuevoCurso });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el curso",
      error: error.message,
    });
  }
};

/**
 * Obtener todos los cursos
 */
export const obtenerCursos = async (_, res) => {
  try {
    const cursos = await cursoService.obtenerTodos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener cursos",
      error: error.message,
    });
  }
};

/**
 * Obtener curso por ID
 */
export const obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await cursoService.obtenerPorId(req.params.id);
    if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
    res.json(curso);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el curso",
      error: error.message,
    });
  }
};

/**
 * Obtener cursos por estado
 */
export const obtenerCursosPorEstado = async (req, res) => {
  try {
    const cursos = await cursoService.obtenerPorEstado(req.params.estado);
    res.json({
      message: `Cursos en estado ${req.params.estado}`,
      data: cursos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener cursos por estado",
      error: error.message,
    });
  }
};

/**
 * Actualizar curso
 */
export const actualizarCurso = async (req, res) => {
  try {
    await cursoService.actualizar(req.params.id, req.body);
    res.json({ message: "Curso actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar curso",
      error: error.message,
    });
  }
};

/**
 * Eliminar curso
 */
export const eliminarCurso = async (req, res) => {
  try {
    await cursoService.eliminar(req.params.id);
    res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar curso",
      error: error.message,
    });
  }
};
