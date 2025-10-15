import calificacionService from "../services/calificacion.service.js";

const registrarCalificacion = async (req, res, next) => {
    try {
        const { evaluacion_id, inscripcion_id, nota_obtenida, comentario_docente } = req.body;
        if (!evaluacion_id || !inscripcion_id || nota_obtenida === undefined) {
            return res.status(400).json({ success: false, message: "evaluacion_id, inscripcion_id y nota_obtenida son requeridos" });
        }
        const registradaPor = req.user?.usuario_id || null;
        const insertData = { evaluacion_id, inscripcion_id, nota_obtenida, comentario_docente: comentario_docente || null, registrada_por: registradaPor };
        const result = await calificacionService.create(insertData);
        return res.status(201).json({ success: true, data: result, message: "Calificación registrada" });
    } catch (err) { next(err); }
};

const listarCalificaciones = async (req, res, next) => {
    try {
        const filters = {
            evaluacion_id: req.query.evaluacion_id,
            inscripcion_id: req.query.inscripcion_id,
        };
        const result = await calificacionService.list(filters);
        return res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
};

const obtenerCalificacion = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const result = await calificacionService.findById(id);
        if (!result) return res.status(404).json({ success: false, message: "Calificación no encontrada" });
        return res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
};

const actualizarCalificacion = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const { nota_obtenida, comentario_docente } = req.body;
        if (nota_obtenida === undefined && comentario_docente === undefined) {
            return res.status(400).json({ success: false, message: "Nada para actualizar" });
        }
        const updateData = { nota_obtenida, comentario_docente };
        const result = await calificacionService.update(id, updateData);
        return res.status(200).json({ success: true, data: result, message: "Calificación actualizada" });
    } catch (err) { next(err); }
};

const eliminarCalificacion = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "id inválido" });
        const result = await calificacionService.remove(id);
        return res.status(200).json({ success: true, data: result, message: "Calificación eliminada" });
    } catch (err) { next(err); }
};

export default { registrarCalificacion, listarCalificaciones, obtenerCalificacion, actualizarCalificacion, eliminarCalificacion };
