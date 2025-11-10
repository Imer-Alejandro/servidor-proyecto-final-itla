import { pool } from "../config/db.js";

/**
 * Obtener todos los estudiantes
 */
export const obtenerTodosEstudiantes = async () => {
  const [rows] = await pool.promise().query(
    `SELECT usuario_id, nombre, apellido, email, estado, matricula, fecha_ingreso, curso_actual_id
     FROM Usuario
     WHERE rol = 'ESTUDIANTE'`
  );
  return rows;
};

/**
 * Obtener un estudiante por ID
 */
export const obtenerEstudiantePorId = async (id) => {
  const [rows] = await pool.promise().query(
    `SELECT usuario_id, nombre, apellido, email, estado, matricula, fecha_ingreso, curso_actual_id
     FROM Usuario
     WHERE usuario_id = ? AND rol = 'ESTUDIANTE'`,
    [id]
  );
  return rows[0];
};

/**
 * Inscribir estudiante en una sección
 */
export const inscribirEstudiante = async (estudiante_id, seccion_id) => {
  const [result] = await pool.promise().query(
    `INSERT INTO Inscripcion (estudiante_id, seccion_id)
     VALUES (?, ?)`,
    [estudiante_id, seccion_id]
  );

  return { inscripcion_id: result.insertId, estudiante_id, seccion_id };
};

/**
 * Obtener historial académico del estudiante
 */
export const obtenerHistorial = async (estudiante_id) => {
  const [rows] = await pool.promise().query(
    `SELECT i.inscripcion_id, c.nombre AS curso, i.nota_final, i.aprobado, i.estado
     FROM Inscripcion i
     JOIN Seccion s ON i.seccion_id = s.seccion_id
     JOIN Curso c ON s.curso_id = c.curso_id
     WHERE i.estudiante_id = ?`,
    [estudiante_id]
  );
  return rows;
};

/**
 * Obtener pagos del estudiante
 */
export const obtenerPagos = async (estudiante_id) => {
  const [rows] = await pool.promise().query(
    `SELECT p.pago_id, p.monto, p.fecha_pago, p.estado, p.metodo, i.seccion_id
     FROM Pago p
     JOIN Inscripcion i ON p.inscripcion_id = i.inscripcion_id
     WHERE i.estudiante_id = ?`,
    [estudiante_id]
  );
  return rows;
};
