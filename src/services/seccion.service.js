import { pool } from "../config/db.js";

/**
 * Obtener todas las secciones con nombre del docente y curso
 */
export const obtenerSecciones = async () => {
  const [rows] = await pool.promise().query(`
    SELECT 
      s.*,
      u.nombre AS docente_nombre,
      u.apellido AS docente_apellido,
      c.nombre AS curso_nombre
    FROM Seccion s
    INNER JOIN Usuario u ON s.docente_id = u.usuario_id
    INNER JOIN Curso c ON s.curso_id = c.curso_id
  `);
  return rows;
};

/**
 * Obtener secciones por curso
 */
export const obtenerSeccionesPorCurso = async (curso_id) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      s.*,
      u.nombre AS docente_nombre,
      u.apellido AS docente_apellido
    FROM Seccion s
    INNER JOIN Usuario u ON s.docente_id = u.usuario_id
    WHERE s.curso_id = ?
    `,
    [curso_id]
  );
  return rows;
};

/**
 * Crear una nueva sección
 */
export const crearSeccion = async (nuevaSeccion) => {
  const { curso_id, docente_id, capacidad_maxima, estado } = nuevaSeccion;

  // Verificar que el docente exista y tenga rol de 'docente'
  const [docenteRows] = await pool
    .promise()
    .query("SELECT rol FROM Usuario WHERE usuario_id = ?", [docente_id]);

  if (!docenteRows.length) throw new Error("El docente especificado no existe");

  if (docenteRows[0].rol !== "docente")
    throw new Error("El usuario seleccionado no tiene rol de docente");

  await pool.promise().query(
    `
    INSERT INTO Seccion (curso_id, docente_id, capacidad_maxima, estado)
    VALUES (?, ?, ?, ?)
    `,
    [curso_id, docente_id, capacidad_maxima, estado || "abierta"]
  );

  return { message: "Sección creada correctamente" };
};

/**
 * Actualizar una sección existente
 */
export const actualizarSeccion = async (id, datos) => {
  const { curso_id, docente_id, capacidad_maxima, estado } = datos;

  // Validar docente si se envía un nuevo docente_id
  if (docente_id) {
    const [docenteRows] = await pool
      .promise()
      .query("SELECT rol FROM Usuario WHERE usuario_id = ?", [docente_id]);

    if (!docenteRows.length)
      throw new Error("El docente especificado no existe");

    if (docenteRows[0].rol?.toUpperCase() !== "DOCENTE")
      throw new Error("El usuario seleccionado no tiene rol de docente");
  }

  await pool.promise().query(
    `
    UPDATE Seccion 
    SET curso_id = ?, docente_id = ?, capacidad_maxima = ?, estado = ?
    WHERE seccion_id = ?
    `,
    [curso_id, docente_id, capacidad_maxima, estado, id]
  );

  return { message: "Sección actualizada correctamente" };
};

/**
 * Eliminar una sección
 */
export const eliminarSeccion = async (id) => {
  await pool.promise().query("DELETE FROM Seccion WHERE seccion_id = ?", [id]);
  return { message: "Sección eliminada correctamente" };
};
