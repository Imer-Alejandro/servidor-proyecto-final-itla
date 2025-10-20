import * as estudianteService from "../services/estudiante.service.js";

export const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await estudianteService.obtenerTodosEstudiantes();
    res.json({ data: estudiantes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener estudiantes", error: error.message });
  }
};

export const obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await estudianteService.obtenerEstudiantePorId(
      req.params.id
    );
    if (!estudiante)
      return res.status(404).json({ message: "Estudiante no encontrado" });
    res.json({ data: estudiante });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener estudiante", error: error.message });
  }
};

export const inscribir = async (req, res) => {
  try {
    const { estudiante_id, seccion_id } = req.body;
    const inscripcion = await estudianteService.inscribirEstudiante(
      estudiante_id,
      seccion_id
    );
    res.status(201).json({ message: "Inscripción exitosa", data: inscripcion });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al inscribir estudiante", error: error.message });
  }
};

export const historial = async (req, res) => {
  try {
    const estudiante_id = req.params.id;
    const historial = await estudianteService.obtenerHistorial(estudiante_id);
    res.json({ data: historial });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener historial", error: error.message });
  }
};

export const pagos = async (req, res) => {
  try {
    const estudiante_id = req.params.id;
    const pagos = await estudianteService.obtenerPagos(estudiante_id);
    res.json({ data: pagos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener pagos", error: error.message });
  }
};
