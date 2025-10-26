import * as evaluacionService from "../services/evaluacion.service.js";

// Obtener todas las evaluaciones
export const obtenerEvaluaciones = async (_, res) => {
  try {
    const evaluaciones = await evaluacionService.obtenerEvaluaciones();
    res.json(evaluaciones);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo evaluaciones",
      error: error.message,
    });
  }
};

// Obtener por curso
export const obtenerPorCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluaciones = await evaluacionService.obtenerEvaluacionesPorCurso(
      id
    );
    res.json(evaluaciones);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo evaluaciones del curso",
      error: error.message,
    });
  }
};

// Crear
export const crearEvaluacion = async (req, res) => {
  try {
    await evaluacionService.crearEvaluacion(req.body);
    res.json({ message: "Evaluación creada exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la evaluación",
      error: error.message,
    });
  }
};

// Actualizar
export const actualizarEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    await evaluacionService.actualizarEvaluacion(id, req.body);
    res.json({ message: "Evaluación actualizada" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la evaluación",
      error: error.message,
    });
  }
};

// Eliminar
export const eliminarEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    await evaluacionService.eliminarEvaluacion(id);
    res.json({ message: "Evaluación eliminada" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la evaluación",
      error: error.message,
    });
  }
};
