# Consultorio Odontológico Morales

Sistema web para la gestión y administración de citas odontológicas, pacientes, servicios y personal médico del Consultorio Odontológico Morales.

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
README.md

  

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
- Gestión de citas
- Dashboard administrativo
- Disponibilidad de horarios
- Calendario de citas


---

# Usuarios y roles
El sistema maneja autenticación mediante JWT y control de acceso por roles.

# Roles del sistema
- Administrador
  - Gestión completa del sistema

- Recepcionista
  - Gestión de citas y pacientes

---

# Estado del proyecto

Proyecto en desarrollo, como solución para la gestión  y administración de citas del consultorio odontológico Morales.

# Licencia
Este proyecto está bajo la licencia MIT.