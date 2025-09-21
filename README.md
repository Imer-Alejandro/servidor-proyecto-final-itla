# ERP Académico Minimal – API

API REST en **Node.js + Express + MySQL** para administrar estudiantes, docentes, cursos, secciones, inscripciones, asistencias, evaluaciones, calificaciones y pagos.  
Pensada para funcionar con una base de datos **MySQL remota (FreeDB u otro proveedor)**.

---

## 🚀 Descripción General

La plataforma gestiona tres roles principales:

- **Administrador**

  - Crea y edita **usuarios**, **cursos** y **secciones**.
  - Asigna docentes y registra pagos.
  - Puede registrar nuevos administradores.

- **Docente**

  - Registra **asistencia** y **calificaciones** en las secciones asignadas.

- **Estudiante**
  - Consulta cursos disponibles, **se inscribe** si cumple los requisitos  
    (sin pagos pendientes, no estar en otro curso activo, dentro de la fecha límite).
  - Visualiza **notas**, **historial** y realiza **pagos parciales**.

**Reglas clave**

- Para aprobar: nota final ≥ 70 %, ≤ 4 ausencias, costo total pagado.
- Al llegar la fecha de finalización de un curso, el sistema **cierra automáticamente** la sección, libera a docentes y estudiantes y guarda el historial.

---

## 🗂️ Estructura de Carpetas

erp-academico-api/
│
├─ .env # Variables de entorno (DB_HOST, DB_USER, DB_PASS, JWT_SECRET, PORT)
├─ server.js # Punto de entrada principal
├─ src/
│ ├─ config/ # Configuración (db.js con pool MySQL)
│ ├─ controllers/ # Lógica de cada recurso: recibe req/res y llama a servicios
│ ├─ routes/ # Endpoints REST: define las URL y qué controlador usar
│ ├─ services/ # Reglas de negocio y consultas SQL
│ ├─ middlewares/ # Autenticación JWT, manejo de roles, control de errores
│ ├─ models/ (opcional)# Mapas/consultas SQL reutilizables
│ └─ utils/ # Validaciones, cálculos de notas y pagos, utilidades de fechas
└─ tests/
├─ integration/ # Pruebas de flujo completo API
└─ unit/ # Pruebas unitarias de servicios y utilidades

### Flujo de una petición

1. **routes/**: Define la URL → llama al controlador.
2. **controllers/**: Valida datos y responde al cliente.
3. **services/**: Ejecuta lógica de negocio y consulta MySQL.
4. **config/db.js**: Mantiene la conexión a la base de datos.

---

## 🛠️ Requisitos Previos

- **Node.js** ≥ 18
- **MySQL** 8.x (remoto o local)
- **npm** (incluido con Node)

---

## 📦 Instalación

Clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/Imer-Alejandro/servidor-proyecto-final-itla.git
cd servidor-proyecto-final-itla

Instala las dependencias:

npm install


Dependencias principales:

express: servidor web.

mysql2: cliente MySQL con soporte para async/await.

dotenv: manejo de variables de entorno.

jsonwebtoken, bcryptjs: autenticación y cifrado de contraseñas


⚙️ Configuración

Crea un archivo .env en la raíz:

Inicializar el Servidor

npm start

Pruebas

Estructura básica para pruebas con Jest

npm test

📖 Uso Básico

POST /api/usuarios – Crear usuario (admin, docente o estudiante).

POST /api/cursos – Crear curso.

POST /api/secciones – Crear sección y asignar docente.

POST /api/inscripciones – Inscribir estudiante en una sección.

POST /api/pagos – Registrar pago parcial o total.

Cada endpoint requiere token JWT y permisos según el rol.
```
