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

---
# Casos de prubea realizados

## Caso 1: Login

POST http://localhost:5000/api/auth/login
{
  "email": "consultorioodontologicomorales@gmail.com",
  "password": "123456"
}
{"mensaje":"Login exitoso","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzJiMTg1MDhjOTIzNTZkODJhZGI5YyIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzgwNDkzNzUyLCJleHAiOjE3ODA0OTczNTJ9.OJ19dUm_lH1QHRdswgf5HA04RYNobXC52kmFNZN2Fjo","usuario":{"_id":"69c2b18508c92356d82adb9c","nombre":"Admin","email":"consultorioxxxxxxxxs@gmail.com","password":"xxxxxxxx","rol":"admin","__v":0}}

## Caso 2: Obtener Citas

 GET http://localhost:5000/api/citas

Resultado: 
{"_id":"6a1aaf57f03dc351ed30bc60","paciente":{"_id":"6a088d463a6f4ada80ab126a","nombre":"Edilson Gordillo","documento":"35748654","telefono":"3134652598","email":"edilson.g@gmail.com"},"servicio":{"_id":"69fcd591c7b2f88ba2f85b54","nombre":"Implante Dental","precioReferencial":2000000,"duracion":60},"odontologo":{"_id":"69fcdd5dc81235f8b80c00bf","nombre":"Dra. Sandra Patricia Morales"},"estado":"pendiente","fecha":"2026-06-18T00:00:00.000Z","hora":"14:00","__v":0},{"_id":"6a1b2009c0cc714efea7c443","paciente":{"_id":"69ff14381945fa4e12a8ff20","nombre":"Alejandro Diaz","documento":"25115687","telefono":"3252346587","email":"ale.diaz@gmail.com"},"servicio":{"_id":"69fcd591c7b2f88ba2f85b54","nombre":"Implante Dental","precioReferencial":2000000,"duracion":60},"odontologo":{"_id":"69fcdd5dc81235f8b80c00bf","nombre":"Dra. Sandra Patricia Morales"},"estado":"pendiente","fecha":"2026-06-26T00:00:00.000Z","hora":"11:30","__v":0}....

## Caso 3 Crear Admin

POST http://localhost:5000/api/auth/register-admin

{
  "nombre": "Nuevo Administrador",
  "email": "nuevoadministrador@gmail.com",
  "password": "589642"
}

{"mensaje":"Administrador creado correctamente"}

## Crear Paicente
POST http://localhost:5000/api/pacientes

{
  "nombre": "GERARDO AMAYA",
  "documento": "1101755869",
  "telefono": "3184545986",
  "email": "gerardoamaya.a@gmail.com",
  "fechaNacimiento": "1982-10-21T00:00:00.000Z"

}

## Obtener paciente

GET http://localhost:5000/api/pacientes/6a203bf175859a98e63efda0

Resultado: 

{"_id":"6a203bf175859a98e63efda0","nombre":"GERARDO AMAYA","documento":"1101755869","telefono":"3184545986","email":"gerardoamaya.a@gmail.com","fechaNacimiento":"1982-10-21T00:00:00.000Z","__v":0}

## Eliminar Paciente
DELETE http://localhost:5000/api/pacientes/6a203bf175859a98e63efda0

Resultado
{"mensaje":"Paciente eliminado"}

# Estado del proyecto

Proyecto en desarrollo, como solución para la gestión  y administración de citas del consultorio odontológico Morales.

# Licencia
Este proyecto está bajo la licencia MIT.
