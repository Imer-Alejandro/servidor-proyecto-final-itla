// 🔹 Verifica que el rol venga en el header
export const verificarRol = (req, res, next) => {
  const rol = req.headers["x-rol"];
  if (!rol) {
    return res.status(401).json({ message: "Rol no proporcionado" });
  }
  req.rol = rol;
  next();
};

// 🔹 Verifica que el rol esté permitido para acceder
export const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.rol)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: rol no autorizado" });
    }
    next();
  };
};
