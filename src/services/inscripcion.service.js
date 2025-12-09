import { pool } from "../config/db.js";

// Obtener todas
export const obtenerInscripciones = async () => {
  const [rows] = await pool.promise().query(`
    SELECT 
      i.*, 
      u.nombre AS nombre_estudiante, 
      u.apellido AS apellido_estudiante, 
      s.nombre AS nombre_seccion
    FROM Inscripcion i
    JOIN Usuario u ON i.estudiante_id = u.usuario_id
    JOIN Seccion s ON i.seccion_id = s.seccion_id
  `);

  return rows;
};

// Obtener por estudiante
export const obtenerPorEstudiante = async (id) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      i.*, 
      s.nombre AS nombre_seccion
    FROM Inscripcion i
    JOIN Seccion s ON i.seccion_id = s.seccion_id
    WHERE i.estudiante_id = ?
    `,
    [id]
  );

  return rows;
};

// Obtener por curso
export const obtenerPorCurso = async (id) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      i.*, 
      u.nombre AS nombre_estudiante,
      u.apellido AS apellido_estudiante
    FROM Inscripcion i
    JOIN Usuario u ON i.estudiante_id = u.usuario_id
    JOIN Seccion s ON i.seccion_id = s.seccion_id
    WHERE s.curso_id = ? AND u.rol = 'ESTUDIANTE'
    `,
    [id]
  );

  return rows;
};

// Crear
export const crearInscripcion = async ({ estudiante_id, seccion_id }) => {
  // Validar si ya está inscrito
  const [inscrito] = await pool
    .promise()
    .query(
      `SELECT 1 FROM Inscripcion WHERE estudiante_id = ? AND seccion_id = ?`,
      [estudiante_id, seccion_id]
    );
  if (inscrito.length > 0) throw new Error("El estudiante ya está inscrito");

  // Verificar estado y capacidad de sección
  const [seccion] = await pool
    .promise()
    .query(
      `SELECT estado, capacidad_maxima, curso_id FROM Seccion WHERE seccion_id = ?`,
      [seccion_id]
    );
  if (!seccion.length) throw new Error("La sección no existe");
  if (seccion[0].estado !== "abierta")
    throw new Error("La sección no está abierta");

  // Verificar cupo
  const [inscritos] = await pool
    .promise()
    .query(
      `SELECT COUNT(*) AS total FROM Inscripcion WHERE seccion_id = ? AND estado = 'activa'`,
      [seccion_id]
    );
  if (
    seccion[0].capacidad_maxima &&
    inscritos[0].total >= seccion[0].capacidad_maxima
  )
    throw new Error("Sección llena");

  // Crear inscripción
  await pool.promise().query(
    `INSERT INTO Inscripcion (estudiante_id, seccion_id, estado)
     VALUES (?, ?, 'activa')`,
    [estudiante_id, seccion_id]
  );

  // Actualizar curso actual del estudiante
  await pool.promise().query(
    `UPDATE Usuario
     SET curso_actual_id = ?
     WHERE usuario_id = ?`,
    [seccion[0].curso_id, estudiante_id]
  );
};

// Actualizar estado
export const actualizarInscripcion = async (id, { estado }) => {
  await pool
    .promise()
    .query(`UPDATE Inscripcion SET estado = ? WHERE inscripcion_id = ?`, [
      estado,
      id,
    ]);
};

// Eliminar
export const eliminarInscripcion = async (id) => {
  await pool
    .promise()
    .query(`DELETE FROM Inscripcion WHERE inscripcion_id = ?`, [id]);
};
