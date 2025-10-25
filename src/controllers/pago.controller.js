import * as pagoService from "../services/pago.service.js";

/**
 * Registrar un nuevo pago
 */
export const registrarPago = async (req, res) => {
  try {
    const nuevoPago = await pagoService.crearPago(req.body);
    res
      .status(201)
      .json({ message: "Pago registrado correctamente", data: nuevoPago });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar el pago",
      error: error.message,
    });
  }
};

/**
 * Obtener todos los pagos
 */
export const obtenerPagos = async (_, res) => {
  try {
    const pagos = await pagoService.obtenerTodos();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener pagos",
      error: error.message,
    });
  }
};

/**
 * Obtener pago por ID
 */
export const obtenerPagoPorId = async (req, res) => {
  try {
    const pago = await pagoService.obtenerPorId(req.params.id);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });
    res.json(pago);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener pago",
      error: error.message,
    });
  }
};

/**
 * Obtener pagos por estudiante
 */
export const obtenerPagosPorEstudiante = async (req, res) => {
  try {
    const pagos = await pagoService.obtenerPorEstudiante(
      req.params.idEstudiante
    );
    res.json({
      message: `Pagos realizados por el estudiante ${req.params.idEstudiante}`,
      data: pagos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener pagos por estudiante",
      error: error.message,
    });
  }
};

/**
 * Actualizar pago
 */
export const actualizarPago = async (req, res) => {
  try {
    await pagoService.actualizar(req.params.id, req.body);
    res.json({ message: "Pago actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar pago",
      error: error.message,
    });
  }
};

/**
 * Eliminar pago
 */
export const eliminarPago = async (req, res) => {
  try {
    await pagoService.eliminar(req.params.id);
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar pago",
      error: error.message,
    });
  }
};
