import asistenciaService from "../services/asistencia.service.js";

const registrarAsistencia = async (req, res, next) => {
    try {
        const { inscripcion_id, seccion_id, fecha_clase, estado, comentario } = req.body;
        if (!inscripcion_id || !seccion_id || !fecha_clase || !estado) {
            return res.status(400).json({ success: false, message: "inscripcion_id, seccion_id, fecha_clase y estado son requeridos" });
        }
        const allowedEstados = ["Presente", "Ausente", "Justificado"];
        if (!allowedEstados.includes(estado)) {
            return res.status(400).json({ success: false, message: "estado inválido" });
        }
        const registradoPor = req.user?.usuario_id || null;
        const insertData = { inscripcion_id, seccion_id, fecha_clase, estado, comentario: comentario || null, registrada_por: registradoPor };
        const result = await asistenciaService.create(insertData);
        return res.status(201).json({ success: true, data: result, message: "Asistencia registrada" });
    } catch (err) { next(err); }
};

const listarAsistencias = async (req, res, next) => {
    try {
        const filters = {
            seccion_id: req.query.seccion_id,
            inscripcion_id: req.query.inscripcion_id,
            fecha_clase: req.query.fecha_clase,
        };
        const result = await asistenciaService.list(filters);
        return res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
};

const obtenerAsistencia = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const result = await asistenciaService.findById(id);
        if (!result) return res.status(404).json({ success: false, message: "Asistencia no encontrada" });
        return res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
};

const actualizarAsistencia = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const { fecha_clase, estado, comentario } = req.body;
        if (!fecha_clase && !estado && comentario === undefined) {
            return res.status(400).json({ success: false, message: "Nada para actualizar" });
        }
        const updateData = { fecha_clase, estado, comentario };
        const result = await asistenciaService.update(id, updateData);
        return res.status(200).json({ success: true, data: result, message: "Asistencia actualizada" });
    } catch (err) { next(err); }
};

const eliminarAsistencia = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const result = await asistenciaService.remove(id);
        return res.status(200).json({ success: true, data: result, message: "Asistencia eliminada" });
    } catch (err) { next(err); }
};

export default { registrarAsistencia, listarAsistencias, obtenerAsistencia, actualizarAsistencia, eliminarAsistencia };
