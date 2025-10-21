import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

export const crearUsuario = async ({
  nombre,
  apellido,
  email,
  password,
  rol,
  telefono,
}) => {
  // 1️⃣ Verificar si el correo ya existe
  const [existe] = await pool
    .promise()
    .query(`SELECT usuario_id FROM Usuario WHERE email = ?`, [email]);

  if (existe.length > 0) {
    throw new Error("El correo electrónico ya está registrado");
  }

  // 2️⃣ Encriptar la contraseña
  const hash = await bcrypt.hash(password, 10);

  // 3️⃣ Insertar el nuevo usuario
  const [result] = await pool.promise().query(
    `INSERT INTO Usuario (nombre, apellido, email, password_hash, rol, telefono)
       VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, email, hash, rol, telefono]
  );

  return {
    usuario_id: result.insertId,
    nombre,
    apellido,
    email,
    rol,
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
  const [rows] = await pool
    .promise()
    .query(
      `SELECT usuario_id, nombre, apellido, email, rol, estado FROM Usuario`
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
