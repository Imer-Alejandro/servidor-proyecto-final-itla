import { pool } from "../config/db.js";

/**
 * Crear un nuevo curso
 */
export const crearCurso = async ({
  nombre,
  descripcion,
  costo_total,
  requisitos,
  fecha_inicio,
  fecha_fin,
  fecha_limite_inscripcion,
  estado,
}) => {
  const [result] = await pool.promise().query(
    `INSERT INTO Curso (nombre, descripcion, costo_total, requisitos, fecha_inicio, fecha_fin, fecha_limite_inscripcion, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      descripcion,
      costo_total,
      requisitos,
      fecha_inicio,
      fecha_fin,
      fecha_limite_inscripcion,
      estado || "programado",
    ]
  );

  return {
    curso_id: result.insertId,
    nombre,
    descripcion,
    costo_total,
    requisitos,
    fecha_inicio,
    fecha_fin,
    fecha_limite_inscripcion,
    estado: estado || "programado",
  };
};

/**
 * Obtener todos los cursos
 */
export const obtenerTodos = async () => {
  const [rows] = await pool.promise().query("SELECT * FROM Curso");
  return rows;
};

/**
 * Obtener curso por ID
 */
export const obtenerPorId = async (id) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Curso WHERE curso_id = ?", [id]);
  return rows[0];
};

/**
 * Obtener cursos por estado (programado, en_curso, finalizado)
 */
export const obtenerPorEstado = async (estado) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Curso WHERE estado = ?", [estado]);
  return rows;
};

/**
 * Actualizar curso
 */
export const actualizar = async (id, datos) => {
  const campos = [];
  const valores = [];
  for (let key in datos) {
    campos.push(`${key} = ?`);
    valores.push(datos[key]);
  }
  valores.push(id);

  await pool
    .promise()
    .query(`UPDATE Curso SET ${campos.join(", ")} WHERE curso_id = ?`, valores);
};

/**
 * Eliminar curso
 */
export const eliminar = async (id) => {
  await pool.promise().query("DELETE FROM Curso WHERE curso_id = ?", [id]);
};
