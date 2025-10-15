import { pool } from "../config/db.js";

const create = async (data) => {
    const sql = `INSERT INTO Calificacion (evaluacion_id, inscripcion_id, nota_obtenida, comentario_docente, registrada_por) VALUES (?, ?, ?, ?, ?)`;
    const params = [
        data.evaluacion_id,
        data.inscripcion_id,
        data.nota_obtenida,
        data.comentario_docente,
        data.registrada_por,
    ];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { insertId: result.insertId, affectedRows: result.affectedRows };
};

const list = async (filters) => {
    let sql = `SELECT * FROM Calificacion WHERE 1=1`;
    const params = [];
    if (filters.evaluacion_id) {
        sql += ` AND evaluacion_id = ?`;
        params.push(filters.evaluacion_id);
    }
    if (filters.inscripcion_id) {
        sql += ` AND inscripcion_id = ?`;
        params.push(filters.inscripcion_id);
    }
    const promisePool = pool.promise();
    const [rows] = await promisePool.execute(sql, params);
    return rows;
};

const findById = async (id) => {
    const sql = `SELECT * FROM Calificacion WHERE calificacion_id = ?`;
    const params = [id];
    const promisePool = pool.promise();
    const [rows] = await promisePool.execute(sql, params);
    return rows[0] || null;
};

const update = async (id, data) => {
    const sql = `UPDATE Calificacion SET nota_obtenida = ?, comentario_docente = ? WHERE calificacion_id = ?`;
    const params = [data.nota_obtenida, data.comentario_docente, id];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { affectedRows: result.affectedRows };
};

const remove = async (id) => {
    const sql = `DELETE FROM Calificacion WHERE calificacion_id = ?`;
    const params = [id];
    const promisePool = pool.promise();
    const [result] = await promisePool.execute(sql, params);
    return { affectedRows: result.affectedRows };
};

export default { create, list, findById, update, remove };
