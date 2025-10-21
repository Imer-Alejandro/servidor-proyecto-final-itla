import * as seccionService from "../services/seccion.service.js";

export const obtenerSecciones = async (_, res) => {
  try {
    const secciones = await seccionService.obtenerSecciones();
    res.json(secciones);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener secciones", error: error.message });
  }
};

export const obtenerSeccionesPorCurso = async (req, res) => {
  try {
    const secciones = await seccionService.obtenerSeccionesPorCurso(
      req.params.curso_id
    );
    res.json(secciones);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener secciones por curso",
        error: error.message,
      });
  }
};

export const crearSeccion = async (req, res) => {
  try {
    await seccionService.crearSeccion(req.body);
    res.json({ message: "Sección creada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la sección", error: error.message });
  }
};

export const actualizarSeccion = async (req, res) => {
  try {
    await seccionService.actualizarSeccion(req.params.id, req.body);
    res.json({ message: "Sección actualizada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar la sección",
        error: error.message,
      });
  }
};

export const eliminarSeccion = async (req, res) => {
  try {
    await seccionService.eliminarSeccion(req.params.id);
    res.json({ message: "Sección eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la sección", error: error.message });
  }
};
