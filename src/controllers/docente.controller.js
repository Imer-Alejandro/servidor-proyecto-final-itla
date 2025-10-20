import * as docenteService from "../services/docente.service.js";

// Docentes
export const obtenerDocentes = async (req, res) => {
  try {
    const docentes = await docenteService.obtenerTodosDocentes();
    res.json({ data: docentes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener docentes", error: error.message });
  }
};

export const obtenerDocente = async (req, res) => {
  try {
    const docente = await docenteService.obtenerDocentePorId(req.params.id);
    if (!docente)
      return res.status(404).json({ message: "Docente no encontrado" });
    res.json({ data: docente });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener docente", error: error.message });
  }
};

// Secciones
export const obtenerSecciones = async (req, res) => {
  try {
    const secciones = await docenteService.obtenerSeccionesDocente(
      req.params.id
    );
    res.json({ data: secciones });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener secciones", error: error.message });
  }
};

// Asistencias
export const registrarAsistencia = async (req, res) => {
  try {
    const asistencia = await docenteService.registrarAsistencia(req.body);
    res
      .status(201)
      .json({ message: "Asistencia registrada", data: asistencia });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar asistencia", error: error.message });
  }
};

// Calificaciones
export const registrarCalificacion = async (req, res) => {
  try {
    const calificacion = await docenteService.registrarCalificacion(req.body);
    res
      .status(201)
      .json({ message: "Calificación registrada", data: calificacion });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al registrar calificación",
        error: error.message,
      });
  }
};

// Evaluaciones
export const obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await docenteService.obtenerEvaluacionesSeccion(
      req.params.seccion_id
    );
    res.json({ data: evaluaciones });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener evaluaciones", error: error.message });
  }
};
