import * as inscripcionService from "../services/inscripcion.service.js";

export const obtenerInscripciones = async (_, res) => {
  try {
    res.json(await inscripcionService.obtenerInscripciones());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPorEstudiante = async (req, res) => {
  try {
    res.json(await inscripcionService.obtenerPorEstudiante(req.params.id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPorCurso = async (req, res) => {
  try {
    res.json(await inscripcionService.obtenerPorCurso(req.params.id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const crearInscripcion = async (req, res) => {
  try {
    await inscripcionService.crearInscripcion(req.body);
    res.status(201).json({ message: "Inscripción creada" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const actualizarInscripcion = async (req, res) => {
  try {
    await inscripcionService.actualizarInscripcion(req.params.id, req.body);
    res.json({ message: "Inscripción actualizada" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const eliminarInscripcion = async (req, res) => {
  try {
    await inscripcionService.eliminarInscripcion(req.params.id);
    res.json({ message: "Inscripción eliminada" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
