import * as inscripcionService from "../services/inscripcion.service.js";

// Obtener todas
export const obtenerInscripciones = async (_, res) => {
  try {
    const inscripciones = await inscripcionService.obtenerInscripciones();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo inscripciones",
      error: error.message,
    });
  }
};

// Obtener por estudiante
export const obtenerPorEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const inscripciones =
      await inscripcionService.obtenerInscripcionesPorEstudiante(id);
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo inscripciones del estudiante",
      error: error.message,
    });
  }
};

// Obtener por curso
export const obtenerPorCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const inscripciones = await inscripcionService.obtenerInscripcionesPorCurso(
      id
    );
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo inscripciones del curso",
      error: error.message,
    });
  }
};

// Crear
export const crearInscripcion = async (req, res) => {
  try {
    await inscripcionService.crearInscripcion(req.body);
    res.json({ message: "Inscripción creada exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear inscripción",
      error: error.message,
    });
  }
};

// Actualizar
export const actualizarInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    await inscripcionService.actualizarInscripcion(id, req.body);
    res.json({ message: "Inscripción actualizada" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar inscripción",
      error: error.message,
    });
  }
};

// Eliminar
export const eliminarInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    await inscripcionService.eliminarInscripcion(id);
    res.json({ message: "Inscripción eliminada" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar inscripción",
      error: error.message,
    });
  }
};
