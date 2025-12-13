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

  if (!nombre || !apellido || !email || !password || !rol) {
    throw new Error("Todos los campos obligatorios deben ser completados");
  }

  const [existe] = await pool
    .promise()
    .query("SELECT usuario_id FROM Usuario WHERE email = ?", [email]);

  if (existe.length > 0) {
    throw new Error("El correo electrónico ya está registrado");
  }

  if (rol === "DOCENTE" && (!especialidad || !titulo_academico)) {
    throw new Error(
      "La especialidad y el título académico son requeridos para docentes"
    );
  }

  if (rol === "ESTUDIANTE") {
    if (!matricula) matricula = generarMatricula();

    const [matExistente] = await pool
      .promise()
      .query("SELECT usuario_id FROM Usuario WHERE matricula = ?", [matricula]);

    if (matExistente.length > 0) {
      throw new Error("La matrícula ya está registrada");
    }
  }

  const password_hash = await bcrypt.hash(password, 10);

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

  return { usuario_id: result.insertId, nombre, apellido, email, rol };
};

export const login = async ({ email, password }) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Usuario WHERE email = ?", [email]);

  if (!rows.length) throw new Error("Correo no registrado");

  const valido = await bcrypt.compare(password, rows[0].password_hash);
  if (!valido) throw new Error("Contraseña incorrecta");

  return rows[0];
};

export const obtenerTodos = async () => {
  const [rows] = await pool.promise().query("SELECT * FROM Usuario");
  return rows;
};

export const obtenerPorId = async (id) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Usuario WHERE usuario_id = ?", [id]);
  return rows[0];
};

export const obtenerUsuariosPorRol = async (rol) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * FROM Usuario WHERE rol = ?", [rol]);
  return rows;
};

export const actualizar = async (id, datos) => {
  const campos = Object.keys(datos).map((k) => `${k} = ?`);
  const valores = Object.values(datos);

  await pool
    .promise()
    .query(`UPDATE Usuario SET ${campos.join(", ")} WHERE usuario_id = ?`, [
      ...valores,
      id,
    ]);
};

export const eliminar = async (id) => {
  await pool.promise().query("DELETE FROM Usuario WHERE usuario_id = ?", [id]);
};
