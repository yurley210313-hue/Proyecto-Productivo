# Consultorio Odontológico Morales

Aplicación web desarrollada para la gestión integral de un consultorio odontológico. El sistema permite administrar pacientes, odontólogos, servicios, especialidades y citas, facilitando la organización de horarios y el control administrativo del consultorio.

Este proyecto fue desarrollado como solución tecnológica para optimizar los procesos de atención y programación de citas odontológicas.


## Tecnologías utilizadas

### Frontend
- React
- Vite
- Material UI
- Axios
- React Router DOM
- chart.js
- dayjs
- recharts
- sweetalert2

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cors 
- dotenv
- express-validator
- multer
- nodemailer

# Arquitectura del sistema

El proyecto está dividido en dos capas principales:

## Frontend
Aplicación SPA desarrollada con React y Vite.

Responsabilidades:
- Interfaz de usuario.
- Gestión de formularios.
- Consumo de API REST.
- Visualización de citas y reportes.

## Backend
API REST desarrollada con Node.js y Express.

Responsabilidades:
- Autenticación y autorización.
- Gestión de pacientes.
- Gestión de citas.
- Gestión de odontólogos.
- Gestión de servicios.
- Persistencia en MongoDB.

# Estructura de Proyecto

 ## Backend

    ├── config/db.js
    ├── controllers/
         - authController.js
         - citaController.js
         - contactoController.js
         - dashboardController.js
         - especialidadController.js
         - odontologoController.js
         - pacienteController.js
         - servicioController.js
    ├── middlewares/
         - authAdmin.js
         - authMiddleware.js
         - upload.js
    ├── models/
         - Cita.js
         - Contacto.js
         - Especialidad.js
         - Odontologo.js
         - Paciente.js
         - Servicio.js
         - Usuario.js
    ├── routes/ 
         - authRoutes.js
         - citaRoutes.js
         - dashboardRoutes.js
         - disponibilidad.js
         - especialidadRoutes.js
         - odontologoRoutes.js
         - pacienteRoutes.js
         - servicioRoutes.js
    ├── services/emailService.js
    ├── utils/
         - calcularBloques.js
         - generarToken.js
         - horarios.js
         - obtenerOdontologos.js
    ├── package-lock.json
    ├── package.json
    └── server.js


 ## Frontend 
  
    ├── public
       - img
       - favicon.svg
       - icons.svg

    ├── src
        ├── assets
        ├── components/
            - calendar
                 - AppointmentDrawer.jsx
                 - AppointmentModal.jsx
                 - Calendario.css
                 -CalendarView.jsx
                 - CitasTabla.jsx
                 -FiltersSidebar.jsx
            - AdminNavbar.jsx
            - Footer.jsx
            - FormularioCita.jsx
            - Header.jsx
            - Layout.jsx
            - Navbar.jsx
            - ProtecteRoute.jsx
            - Sidebar.jsx
        ├── pages/
            - admin
                 - Calendario
                 - Dashboard.jsx
                 - Disponibilidad.jsx
                 - Mensajes.jsx
                 - Odontologos.jsx
                 - Pacientes.jsx
                 - Servicios.jsx
            - Contacto.jsx
            - Inicio.jsx
            - Login.jsx
            - MisCitas.jsx
            - ReservarCita.jsx
            - Servicios.jsx
        ├── services/api.js
        ├── App.jsx
        ├── main.jsx
    ├── package-lock.json
    ├── package.json
    └── vite.config.js

# Scripts disponibles

## Backend

```bash
npm run dev
npm start
```

## Frontend

```bash
npm run dev
npm run build
```
---

# Instalación del proyecto

## 1. Repositorio

```bash
git clone https://github.com/yurley210313-hue/Proyecto-Productivo.git
```

---

# Configuración Backend

## Entrar a backend

```bash
cd backend
```

## Instalar dependencias

```bash
npm install
```

## Crear archivo .env

Crear un archivo llamado:

```bash
.env:  
```
Con las siguientes variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://consultoriooxxxxxx_db_user:xxxxxxP@cluster0.xxxxx.mongodb.net/Consultorioxxxxx?retryWrites=true&w=majority
JWT_SECRET=xxxxxxxxx
```

## Ejecutar backend

```bash
npm run dev
```

---
# Configuración Frontend

## Entrar a frontend

```bash
cd frontend
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar frontend

```bash
npm run dev
```

---

# Funcionalidades principales

- Autenticación con JWT
- Login de usuarios
- Gestión de pacientes
- Gestión de odontólogos
- Gestión de servicios
- Gestión de especialidades
- Gestión de citas
- Dashboard administrativo
- Disponibilidad de horarios
- Calendario de citas


---

# Roles del sistema

## Administrador

Puede realizar:

- Gestión de pacientes.
- Gestión de odontólogos.
- Gestión de servicios.
- Gestión de especialidades.
- Gestión de citas.
- Acceso al dashboard administrativo.
- Administración de horarios.

## Paciente

Puede realizar:

- Solicitud de citas.
- Consulta de citas programadas.
- Visualización de servicios disponibles.

# Endpoints principales

## Autenticación

|    Método     |    Ruta                  |
|---------------|--------------------------|
|    POST       | /api/auth/login          |
|    POST       | /api/auth/register-admin |


## Pacientes

| Método   | Ruta                |
|----------|---------------      |
| GET      | /api/pacientes/:id  |
| POST     | /api/pacientes      |
| DELETE   | /api/pacientes/:id |

## Citas

|    Método     |    Ruta        |
|---------------|----------------|
| GET           | /api/citas     |
| POST          | /api/citas     |



---
# Casos de prubea realizados

## Caso 1: Login
Solicitud: 
POST /api/auth/login

Resultado esperado:
- Login exitoso.
- Generación de JWT.
- Retorno de información del usuario.

## Caso 2: Crear Admin
Solicitud
POST /api/auth/register-admin

Resultado esperado:
Administrador creado correctamente.

## Caso 3: Crear Cita
Solicitud:
 POST /api/citas

Resultado esperado:
- Cita creada correctamenta.

## Caso 4: Obtener Citas
Solicitud:
 GET /api/citas

Resultado esperado:
- Retorno de información completa de las citas.

## Caso 5: Crear paciente
Solicitud:
POST /api/pacientes

Resultado esperado:
- Paciente registrado correctamente.

---

## Caso 6: Obtener paciente
Solicitud:
GET /api/pacientes/:id

Resultado esperado:
- Retorno de información completa del paciente.

## Caso 7: Eliminar Paciente
Solicitud:
DELETE api/pacientes/id:

Resultado esperado:
- Paciente eliminado

# Estado del proyecto

Proyecto en desarrollo, como solución para la gestión  y administración de citas del consultorio odontológico Morales.

# Licencia
Este proyecto está bajo la licencia MIT.
