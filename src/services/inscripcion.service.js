import { pool } from "../config/db.js";

// Obtener todas las inscripciones
export const obtenerInscripciones = async () => {
  const [rows] = await pool.promise().query(`
    SELECT i.*, e.nombre AS nombre_estudiante, c.nombre AS nombre_curso
    FROM Inscripcion i
    JOIN Perfil_Estudiante e ON i.estudiante_id = e.estudiante_id
    JOIN Curso c ON i.curso_id = c.curso_id
  `);
  return rows;
};

// Obtener inscripciones por estudiante
export const obtenerInscripcionesPorEstudiante = async (idEstudiante) => {
  const [rows] = await pool.promise().query(
    `
    SELECT i.*, c.nombre AS nombre_curso
    FROM Inscripcion i
    JOIN Curso c ON i.curso_id = c.curso_id
    WHERE i.estudiante_id = ?
    `,
    [idEstudiante]
  );
  return rows;
};

// Obtener inscripciones por curso
export const obtenerInscripcionesPorCurso = async (idCurso) => {
  const [rows] = await pool.promise().query(
    `
    SELECT i.*, e.nombre AS nombre_estudiante
    FROM Inscripcion i
    JOIN Perfil_Estudiante e ON i.estudiante_id = e.estudiante_id
    WHERE i.curso_id = ?
    `,
    [idCurso]
  );
  return rows;
};

// Crear una nueva inscripción
export const crearInscripcion = async (nuevaInscripcion) => {
  const { estudiante_id, curso_id, estado } = nuevaInscripcion;
  await pool
    .promise()
    .query(
      `INSERT INTO Inscripcion (estudiante_id, curso_id, estado) VALUES (?, ?, ?)`,
      [estudiante_id, curso_id, estado || "Activa"]
    );
};

// Actualizar inscripción
export const actualizarInscripcion = async (id, datos) => {
  const { estado } = datos;
  await pool
    .promise()
    .query(`UPDATE Inscripcion SET estado = ? WHERE inscripcion_id = ?`, [
      estado,
      id,
    ]);
};

// Eliminar inscripción
export const eliminarInscripcion = async (id) => {
  await pool
    .promise()
    .query(`DELETE FROM Inscripcion WHERE inscripcion_id = ?`, [id]);
};
