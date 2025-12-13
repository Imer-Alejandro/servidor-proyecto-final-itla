import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

function generarMatricula() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export const crearUsuario = async (data) => {
  let {
    nombre,
    apellido,
    email,
    password,
    rol,
    telefono,
    especialidad,
    titulo_academico,
    matricula,
  } = data;

  // 🔴 Validaciones básicas
  if (!nombre || !apellido || !email || !password || !rol) {
    throw new Error("Todos los campos obligatorios deben ser completados");
  }

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
        "La especialidad y el título académico son requeridos para docentes"
      );
    }
  }

  if (rol === "ESTUDIANTE") {
    if (!matricula || matricula.trim() === "") {
      matricula = generarMatricula();
    }

    const [matExistente] = await pool
      .promise()
      .query(`SELECT usuario_id FROM Usuario WHERE matricula = ?`, [matricula]);

    if (matExistente.length > 0) {
      throw new Error("La matrícula ya está registrada, intenta otra");
    }
  }

  // 3️⃣ Encriptar contraseña
  const password_hash = await bcrypt.hash(password, 10);

  // 4️⃣ Insertar usuario
  const [result] = await pool.promise().query(
    `INSERT INTO Usuario 
    (nombre, apellido, email, password_hash, rol, telefono, especialidad, titulo_academico, matricula)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      apellido,
      email,
      password_hash,
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
    telefono,
    matricula: rol === "ESTUDIANTE" ? matricula : null,
    especialidad: rol === "DOCENTE" ? especialidad : null,
    titulo_academico: rol === "DOCENTE" ? titulo_academico : null,
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Correo y contraseña son obligatorios");
  }

  const [rows] = await pool
    .promise()
    .query(`SELECT * FROM Usuario WHERE email = ?`, [email]);

  if (rows.length === 0) {
    throw new Error("Correo no registrado");
  }

  const user = rows[0];
  const valido = await bcrypt.compare(password, user.password_hash);

  if (!valido) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    usuario_id: user.usuario_id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
  };
};

export const obtenerTodos = async () => {
  const [rows] = await pool.promise().query(`
    SELECT 
      usuario_id,
      nombre,
      apellido,
      email,
      rol,
      estado,
      telefono,
      matricula,
      curso_actual_id,
      especialidad,
      titulo_academico
    FROM Usuario
  `);
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
  return rows;
};

export const actualizar = async (id, datos) => {
  const campos = [];
  const valores = [];

  for (const key in datos) {
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
