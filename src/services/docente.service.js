import { pool } from "../config/db.js";

/**
 * Obtener todos los docentes
 */
export const obtenerTodosDocentes = async () => {
  const [rows] = await pool.promise().query(
    `SELECT usuario_id, nombre, apellido, email, estado, especialidad, titulo_academico
     FROM Usuario
     WHERE rol = 'DOCENTE'`
  );
  return rows;
};

/**
 * Obtener docente por ID
 */
export const obtenerDocentePorId = async (id) => {
  const [rows] = await pool.promise().query(
    `SELECT usuario_id, nombre, apellido, email, estado, especialidad, titulo_academico
     FROM Usuario
     WHERE usuario_id = ? AND rol = 'DOCENTE'`,
    [id]
  );
  return rows[0];
};

/**
 * Obtener secciones asignadas a un docente
 */
export const obtenerSeccionesDocente = async (docente_id) => {
  const [rows] = await pool.promise().query(
    `SELECT s.seccion_id, s.curso_id, c.nombre AS curso_nombre, s.capacidad_maxima, s.estado
     FROM Seccion s
     JOIN Curso c ON s.curso_id = c.curso_id
     WHERE s.docente_id = ?`,
    [docente_id]
  );
  return rows;
};

/**
 * Registrar asistencia
 */
export const registrarAsistencia = async ({
  inscripcion_id,
  seccion_id,
  fecha_clase,
  registrada_por,
  estado,
  comentario,
}) => {
  const [result] = await pool.promise().query(
    `INSERT INTO Asistencia (inscripcion_id, seccion_id, fecha_clase, registrada_por, estado, comentario)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      inscripcion_id,
      seccion_id,
      fecha_clase,
      registrada_por,
      estado,
      comentario,
    ]
  );
  return { asistencia_id: result.insertId, inscripcion_id, seccion_id };
};

/**
 * Registrar calificación
 */
export const registrarCalificacion = async ({
  evaluacion_id,
  inscripcion_id,
  nota_obtenida,
  comentario_docente,
  registrada_por,
}) => {
  const [result] = await pool.promise().query(
    `INSERT INTO Calificacion (evaluacion_id, inscripcion_id, nota_obtenida, comentario_docente, registrada_por)
     VALUES (?, ?, ?, ?, ?)`,
    [
      evaluacion_id,
      inscripcion_id,
      nota_obtenida,
      comentario_docente,
      registrada_por,
    ]
  );
  return { calificacion_id: result.insertId, evaluacion_id, inscripcion_id };
};

/**
 * Obtener evaluaciones de una sección
 */
export const obtenerEvaluacionesSeccion = async (seccion_id) => {
  const [rows] = await pool
    .promise()
    .query(`SELECT * FROM Evaluacion WHERE seccion_id = ?`, [seccion_id]);
  return rows;
};
