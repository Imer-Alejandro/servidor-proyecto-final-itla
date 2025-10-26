import { pool } from "../config/db.js";

// Obtener todas las evaluaciones
export const obtenerEvaluaciones = async () => {
  const [rows] = await pool.promise().query(`
    SELECT e.*, c.nombre AS nombre_curso, d.nombre AS nombre_docente
    FROM Evaluacion e
    JOIN Curso c ON e.curso_id = c.curso_id
    JOIN Perfil_Docente d ON e.docente_id = d.docente_id
  `);
  return rows;
};

// Obtener evaluaciones por curso
export const obtenerEvaluacionesPorCurso = async (cursoId) => {
  const [rows] = await pool.promise().query(
    `
    SELECT e.*, d.nombre AS nombre_docente
    FROM Evaluacion e
    JOIN Perfil_Docente d ON e.docente_id = d.docente_id
    WHERE e.curso_id = ?
    `,
    [cursoId]
  );
  return rows;
};

// Crear una nueva evaluación
export const crearEvaluacion = async (nuevaEvaluacion) => {
  const {
    curso_id,
    docente_id,
    titulo,
    descripcion,
    fecha,
    ponderacion,
    estado,
  } = nuevaEvaluacion;
  await pool.promise().query(
    `
      INSERT INTO Evaluacion (curso_id, docente_id, titulo, descripcion, fecha, ponderacion, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
    [
      curso_id,
      docente_id,
      titulo,
      descripcion,
      fecha,
      ponderacion,
      estado || "Activa",
    ]
  );
};

// Actualizar una evaluación
export const actualizarEvaluacion = async (id, datos) => {
  const { titulo, descripcion, fecha, ponderacion, estado } = datos;
  await pool.promise().query(
    `
      UPDATE Evaluacion
      SET titulo = ?, descripcion = ?, fecha = ?, ponderacion = ?, estado = ?
      WHERE evaluacion_id = ?
      `,
    [titulo, descripcion, fecha, ponderacion, estado, id]
  );
};

// Eliminar evaluación
export const eliminarEvaluacion = async (id) => {
  await pool
    .promise()
    .query(`DELETE FROM Evaluacion WHERE evaluacion_id = ?`, [id]);
};
