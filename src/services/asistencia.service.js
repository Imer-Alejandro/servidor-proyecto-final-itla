import { pool } from "../config/db.js";

const create = async (data) => {
    const sql = `INSERT INTO Asistencia (inscripcion_id, seccion_id, fecha_clase, registrada_por, estado, comentario) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
        data.inscripcion_id,
        data.seccion_id,
        data.fecha_clase,
        data.registrada_por,
        data.estado,
        data.comentario,
    ];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { insertId: result.insertId, affectedRows: result.affectedRows };
};

const list = async (filters) => {
    let sql = `SELECT * FROM Asistencia WHERE 1=1`;
    const params = [];
    if (filters.seccion_id) {
        sql += ` AND seccion_id = ?`;
        params.push(filters.seccion_id);
    }
    if (filters.inscripcion_id) {
        sql += ` AND inscripcion_id = ?`;
        params.push(filters.inscripcion_id);
    }
    if (filters.fecha_clase) {
        sql += ` AND fecha_clase = ?`;
        params.push(filters.fecha_clase);
    }
    const promisePool = pool.promise();
    const [rows] = await promisePool.execute(sql, params);
    return rows;
};

const findById = async (id) => {
    const sql = `SELECT * FROM Asistencia WHERE asistencia_id = ?`;
    const params = [id];
    const promisePool = pool.promise();
    const [rows] = await promisePool.execute(sql, params);
    return rows[0] || null;
};

const update = async (id, data) => {
    const sql = `UPDATE Asistencia SET fecha_clase = ?, estado = ?, comentario = ? WHERE asistencia_id = ?`;
    const params = [data.fecha_clase, data.estado, data.comentario, id];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { affectedRows: result.affectedRows };
};

const remove = async (id) => {
    const sql = `DELETE FROM Asistencia WHERE asistencia_id = ?`;
    const params = [id];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { affectedRows: result.affectedRows };
};

export default { create, list, findById, update, remove };
