import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

function generarMatricula() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export const crearUsuario = async ({
  nombre,
  apellido,
  email,
  password,
  rol,
  telefono,
  especialidad,
  titulo_academico,
  matricula,
}) => {
  // 1️⃣ Verificar si el correo ya existe
  const [existe] = await pool
    .promise()
    .query(`SELECT usuario_id FROM Usuario WHERE email = ?`, [email]);

  if (existe.length > 0) {
    throw new Error("El correo electrónico ya está registrado");
  }

  // 2️⃣ Validaciones por rol
  if (rol === "DOCENTE") {
    if (!especialidad || !titulo_academico) {
      throw new Error(
        "La especialidad y título académico son requeridos para docentes"
      );
    }
  }

  if (rol === "ESTUDIANTE") {
    // Generar matrícula si no se envía
    if (!matricula || matricula.trim() === "") {
      matricula = generarMatricula();
    }

    // Validar si matrícula ya existe
    const [matExistente] = await pool
      .promise()
      .query(`SELECT usuario_id FROM Usuario WHERE matricula = ?`, [matricula]);

    if (matExistente.length > 0) {
      throw new Error("La matrícula ya está registrada, intenta otra");
    }
  }

  // 3️⃣ Encriptar contraseña
  const hash = await bcrypt.hash(password, 10);

  // 4️⃣ Insertar usuario según el rol
  const [result] = await pool.promise().query(
    `INSERT INTO Usuario 
      (nombre, apellido, email, password_hash, rol, telefono, especialidad, titulo_academico, matricula)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      apellido,
      email,
      hash,
      rol,
      telefono || null,
      rol === "DOCENTE" ? especialidad : null,
      rol === "DOCENTE" ? titulo_academico : null,
      rol === "ESTUDIANTE" ? matricula : null,
    ]
  );

  return {
    usuario_id: result.insertId,
    nombre,
    apellido,
    email,
    rol,
    matricula: rol === "ESTUDIANTE" ? matricula : undefined,
    especialidad: rol === "DOCENTE" ? especialidad : undefined,
    titulo_academico: rol === "DOCENTE" ? titulo_academico : undefined,
  };
};

export const login = async ({ email, password }) => {
  const [rows] = await pool
    .promise()
    .query(`SELECT * FROM Usuario WHERE email = ?`, [email]);
  if (rows.length === 0) throw new Error("Correo no registrado");

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Contraseña incorrecta");

  // ✅ En lugar de JWT, devolvemos los datos del usuario y su rol
  return {
    usuario_id: user.usuario_id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
  };
};

export const obtenerTodos = async () => {
  const [rows] = await pool.promise().query(
    `SELECT 
        usuario_id,
        nombre,
        apellido,
        email,
        rol,
        estado,
        telefono,
        -- Campos para estudiantes
        matricula,
        curso_actual_id,
        -- Campos para docentes
        especialidad,
        titulo_academico
     FROM Usuario`
  );

  return rows;
};

export const obtenerPorId = async (id) => {
  const [rows] = await pool
    .promise()
    .query(`SELECT * FROM Usuario WHERE usuario_id = ?`, [id]);
  return rows[0];
};
export const obtenerUsuariosPorRol = async (rol) => {
  const [rows] = await pool
    .promise()
    .query(`SELECT * FROM Usuario WHERE rol = ?`, [rol]);
  return rows; // devuelve todos los usuarios del rol
};

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
    .query(
      `UPDATE Usuario SET ${campos.join(", ")} WHERE usuario_id = ?`,
      valores
    );
};

export const eliminar = async (id) => {
  await pool.promise().query(`DELETE FROM Usuario WHERE usuario_id = ?`, [id]);
};
