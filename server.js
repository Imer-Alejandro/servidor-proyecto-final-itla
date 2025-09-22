import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { router as apiRoutes } from "./src/routes/index.js";
import { pool } from "./src/config/db.js";

dotenv.config();

// ===== Middlewares globales =====

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); // Seguridad por cabeceras
app.use(cors()); // CORS para frontend
app.use(express.json()); // Parseo JSON (reemplaza body-parser)
app.use(express.urlencoded({ extended: true }));

// ===== Rutas =====
app.use("/api", apiRoutes);

// ===== Verificar conexión a la DB al iniciar =====
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión MySQL:", err.message);
  } else {
    console.log("Conexión MySQL establecida");
    connection.release();
  }
});

// ===== Arranque del servidor =====
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
