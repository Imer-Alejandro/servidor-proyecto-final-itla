import { pool } from "../config/db.js";

// Obtener todas las secciones
export const obtenerSecciones = async () => {
  const [rows] = await pool.promise().query("SELECT * FROM Seccion");
  return rows;
};

// Obtener secciones por curso
export const obtenerSeccionesPorCurso = async (curso_id) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Seccion WHERE curso_id = ?", [curso_id]);
  return rows;
};

// Crear una nueva sección
export const crearSeccion = async (nuevaSeccion) => {
  const { curso_id, docente_id, capacidad_maxima, estado } = nuevaSeccion;
  await pool
    .promise()
    .query(
      "INSERT INTO Seccion (curso_id, docente_id, capacidad_maxima, estado) VALUES (?, ?, ?, ?)",
      [curso_id, docente_id, capacidad_maxima, estado || "abierta"]
    );
};

// Actualizar una sección existente
export const actualizarSeccion = async (id, datos) => {
  const { curso_id, docente_id, capacidad_maxima, estado } = datos;
  await pool
    .promise()
    .query(
      "UPDATE Seccion SET curso_id = ?, docente_id = ?, capacidad_maxima = ?, estado = ? WHERE seccion_id = ?",
      [curso_id, docente_id, capacidad_maxima, estado, id]
    );
};

// Eliminar una sección
export const eliminarSeccion = async (id) => {
  await pool.promise().query("DELETE FROM Seccion WHERE seccion_id = ?", [id]);
};
