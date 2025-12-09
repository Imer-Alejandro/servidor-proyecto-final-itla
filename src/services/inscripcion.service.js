import { pool } from "../config/db.js";

/**
 * Obtener todas las inscripciones
 */
export const crearInscripcion = async (nuevaInscripcion) => {
  const { estudiante_id, seccion_id } = nuevaInscripcion;

  // 1️⃣ Verificar si el estudiante YA está inscrito en esa sección
  const [inscrito] = await pool.promise().query(
    `SELECT 1 FROM Inscripcion 
     WHERE estudiante_id = ? AND seccion_id = ?`,
    [estudiante_id, seccion_id]
  );
  if (inscrito.length > 0) {
    throw new Error("El estudiante ya está inscrito en esta sección.");
  }

  // 2️⃣ Validar estado de la sección
  const [seccion] = await pool.promise().query(
    `SELECT estado, capacidad_maxima 
     FROM Seccion 
     WHERE seccion_id = ?`,
    [seccion_id]
  );

  if (seccion.length === 0) {
    throw new Error("La sección no existe.");
  }

  if (seccion[0].estado !== "abierta") {
    throw new Error("La sección no está abierta para inscripción.");
  }

  // 3️⃣ Verificar cupo disponible
  const [inscritos] = await pool.promise().query(
    `SELECT COUNT(*) AS total 
     FROM Inscripcion 
     WHERE seccion_id = ? AND estado = 'activa'`,
    [seccion_id]
  );

  if (
    seccion[0].capacidad_maxima !== null &&
    inscritos[0].total >= seccion[0].capacidad_maxima
  ) {
    throw new Error("La sección ha alcanzado su capacidad máxima.");
  }

  // 4️⃣ Crear la inscripción
  await pool.promise().query(
    `INSERT INTO Inscripcion (estudiante_id, seccion_id, estado)
     VALUES (?, ?, 'activa')`,
    [estudiante_id, seccion_id]
  );

  // 5️⃣ Actualizar el curso_actual_id del estudiante
  await pool.promise().query(
    `UPDATE Usuario 
     SET curso_actual_id = (
        SELECT curso_id FROM Seccion WHERE seccion_id = ?
     )
     WHERE usuario_id = ?`,
    [seccion_id, estudiante_id]
  );
};
