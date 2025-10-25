import { pool } from "../config/db.js";

/**
 * Crear un nuevo pago
 */
export const crearPago = async ({
  inscripcion_id,
  monto,
  metodo,
  referencia,
  registrado_por,
  estado,
}) => {
  const [result] = await pool.promise().query(
    `INSERT INTO Pago (inscripcion_id, monto, metodo, referencia, registrado_por, estado)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      inscripcion_id,
      monto,
      metodo,
      referencia || null,
      registrado_por,
      estado || "Pendiente",
    ]
  );

  return {
    pago_id: result.insertId,
    inscripcion_id,
    monto,
    metodo,
    referencia,
    registrado_por,
    estado: estado || "Pendiente",
  };
};

/**
 * Obtener todos los pagos
 */
export const obtenerTodos = async () => {
  const [rows] = await pool.promise().query(`
    SELECT 
      p.*, 
      u.nombre AS registrado_por_nombre,
      i.estudiante_id,
      i.seccion_id,
      c.nombre AS curso_nombre
    FROM Pago p
    INNER JOIN Usuario u ON p.registrado_por = u.usuario_id
    INNER JOIN Inscripcion i ON p.inscripcion_id = i.inscripcion_id
    INNER JOIN Seccion s ON i.seccion_id = s.seccion_id
    INNER JOIN Curso c ON s.curso_id = c.curso_id
  `);
  return rows;
};

/**
 * Obtener pago por ID
 */
export const obtenerPorId = async (id) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      p.*, 
      u.nombre AS registrado_por_nombre,
      i.estudiante_id,
      i.seccion_id,
      c.nombre AS curso_nombre
    FROM Pago p
    INNER JOIN Usuario u ON p.registrado_por = u.usuario_id
    INNER JOIN Inscripcion i ON p.inscripcion_id = i.inscripcion_id
    INNER JOIN Seccion s ON i.seccion_id = s.seccion_id
    INNER JOIN Curso c ON s.curso_id = c.curso_id
    WHERE p.pago_id = ?`,
    [id]
  );
  return rows[0];
};

/**
 * Obtener pagos por estudiante
 */
export const obtenerPorEstudiante = async (estudiante_id) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      p.*, 
      c.nombre AS curso_nombre
    FROM Pago p
    INNER JOIN Inscripcion i ON p.inscripcion_id = i.inscripcion_id
    INNER JOIN Seccion s ON i.seccion_id = s.seccion_id
    INNER JOIN Curso c ON s.curso_id = c.curso_id
    WHERE i.estudiante_id = ?
    ORDER BY p.fecha_pago DESC
  `,
    [estudiante_id]
  );
  return rows;
};

/**
 * Actualizar pago
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
    .query(`UPDATE Pago SET ${campos.join(", ")} WHERE pago_id = ?`, valores);
};

/**
 * Eliminar pago
 */
export const eliminar = async (id) => {
  await pool.promise().query("DELETE FROM Pago WHERE pago_id = ?", [id]);
};
