# Sistema de Gestión de Citas para el Consultorio Odontológico Morales

Aplicación web desarrollada para la gestión integral de un consultorio odontológico. El sistema permite administrar pacientes, odontólogos, servicios, especialidades y citas, facilitando la organización de horarios y el control administrativo del consultorio.

Este proyecto fue desarrollado como solución tecnológica para optimizar los procesos de atención y programación de citas odontológicas.


# Tecnologías utilizadas

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

# Requisitos Previos

Antes de instalar el proyecto, asegúrese de contar con las siguientes herramientas instaladas:

* Node.js v18 o superior
* npm v9 o superior
* MongoDB Atlas o una instancia local de MongoDB
* Git
* Visual Studio Code (opcional)

Verificar instalación:

```bash
node -v
npm -v
git --version
```

# Instalación y Ejecución del Proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/yurley210313-hue/Proyecto-Productivo.git
```

```bash
cd Proyecto-Productivo
```

## 2. Instalación del Backend

Ingresar a la carpeta backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` en la raíz del backend.

Variables requeridas:

```env
PORT=5000
MONGO_URI= cadena-de-conexion-mongodb
JWT_SECRET= clave-secreta
EMAIL_USER=correo@gmail.com
EMAIL_PASS=contraseña-de-aplicacion
```

Ejecutar servidor en modo desarrollo:

```bash
npm run dev
```
Ejecutar servidor en producción:

```bash
npm start
```

Servidor disponible en:

```text
http://localhost:5000
```

## 3. Instalación del Frontend

Abrir una nueva terminal e ingresar a la carpeta frontend:

```bash
cd frontend
```
Instalar dependencias:

```bash
npm install
```
Ejecutar aplicación:

```bash
npm run dev
```

Generar versión de producción:

```bash
npm run build
```

Aplicación disponible en:

```text
http://localhost:5173
```

# Acceso al Sistema

Una vez iniciado el frontend y backend, acceder desde el navegador:

```text
http://localhost:5173
```

Dependiendo de la configuración de la base de datos, existen dos opciones:

## Opción 1: Crear administrador desde la API

Endpoint:

```http
POST /api/auth/register-admin
```

Ejemplo:

```json
{
  "nombre": "Administrador",
  "email": "admin@consultorio.com",
  "password": "Admin123*"
}
```

Posteriormente iniciar sesión con:

```text
Correo: admin@consultorio.com
Contraseña: Admin123*
```

## Opción 2: Utilizar usuario existente

Si la base de datos ya contiene usuarios registrados, utilizar las credenciales previamente almacenadas.

# Variables de Entorno

## Backend (.env)

| Variable   | Descripción                          |
| ---------- | ------------------------------------ |
| PORT       | Puerto del servidor                  |
| MONGO_URI  | Cadena de conexión MongoDB           |
| JWT_SECRET | Clave para generación de tokens      |
| EMAIL_USER | Correo utilizado para notificaciones |
| EMAIL_PASS | Contraseña o App Password del correo |

## Frontend

Actualmente el frontend no requiere variables de entorno adicionales.

# Estructura General del Proyecto

El sistema está organizado bajo una arquitectura cliente-servidor.


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

# Flujo de Ejecución

1. Iniciar MongoDB Atlas o verificar conexión.
2. Ejecutar backend mediante `npm run dev`.
3. Ejecutar frontend mediante `npm run dev`.
4. Acceder desde el navegador a `http://localhost:5173`.
5. Iniciar sesión y utilizar las funcionalidades del sistema.


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
# Casos de Prueba Realizados

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

## Caso 3: Crear Servicios
Solicitud:
 POST /api/servicios

Resultado esperado:
- Servicio creado correctamente.

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
DELETE /api/pacientes/:id

Resultado esperado:
- Paciente eliminado

# Capturas principales del sistema

## Página de Inicio
![Inicio](screenshots/Paginas/Inicio.png)

## Inicio de sesión
![Login](screenshots\Paginas\Login.png) 

## Dashboard administrativo
![Dashboard](screenshots\Paginas\Dashboard.png)

## Gestión de Pacientes
Permite registrar, consultar, editar y eliminar pacientes.
![Pacientes](screenshots/Paginas/Gestion-pacientes.png)

## Gestión de Servicios
![Servicios](screenshots/Paginas/gestion-servicios.png)

## Gestión de Citas
![Citas](screenshots/Paginas/Gestion-citas.png)

## Calendario de citas
![Calendario](screenshots\Paginas\Calendario.png)

## Reserva de Citas
![Reserva](screenshots/Paginas/Reservar-cita.png)

## Contacto
![Contacto](screenshots\Paginas\Contacto.png)

# Casos de prueba

## Evidencias de pruebas realizadas

### Login exitoso
Prueba de autenticación mediante JWT.
![Login API](screenshots/Casos-prueba/login.png)

### Crear Administrador
Solo disponible para usuarios con rol administrador.
![Crear Admin](screenshots/Casos-prueba/Crear-admin.png)

### Crear servicios
![Crear Servicios](screenshots/Casos-prueba/Crear-servicios.png)

### Obtener Citas
![Obtener Citas](screenshots/Casos-prueba/Obtener-citas.png)

### Crear Paciente
![Crear Paciente](screenshots/Casos-prueba/Crear-paciente.png)

### Obtener Paciente
![Obtener Paciente](screenshots/Casos-prueba/Obtener-paciente.png)

### Eliminar Paciente
![Eliminar Paciente](screenshots/Casos-prueba/Eliminar-paciente.png)

# Evidenacia test realizados

## Test
![Test](screenshots/test/test.png)

# Versión

Versión actual: 1.0.0

Última actualización: Junio 2026

# Observaciones y ajustes realizados

Durante el proceso de revisión y retroalimentación del proyecto se identificaron varios aspectos técnicos y funcionales que fueron corregidos con el fin de mejorar la estabilidad, seguridad y mantenibilidad de la aplicación.

## 1. Organización y estructura del proyecto

Se verificó la correcta separación entre frontend y backend, manteniendo una arquitectura organizada basada en componentes, controladores, modelos, rutas y servicios.

Además:

- Se eliminaron archivos sensibles del repositorio.
- Se verificó que la carpeta `node_modules` no se encuentre versionada.
- Se revisaron las dependencias del proyecto.
- Se actualizaron los archivos de configuración necesarios para la ejecución del sistema.

---

## 2. Instalación y ejecución

Se realizaron pruebas de instalación en un entorno limpio para verificar:

- Instalación correcta de dependencias del backend.
- Instalación correcta de dependencias del frontend.
- Ejecución del servidor Express.
- Compilación y ejecución de la aplicación React mediante Vite.

También se actualizaron las instrucciones de instalación y configuración dentro del archivo README.

---

## 3. Corrección de la gestión de citas

Se revisó el módulo de citas, realizando pruebas sobre las operaciones principales:

- Crear cita.
- Consultar cita.
- Actualizar cita.
- Reprogramar cita.
- Gestionar estados de cita.

Se corrigieron inconsistencias detectadas durante las pruebas de funcionamiento para garantizar la correcta administración de las citas odontológicas.

---

## 4. Seguridad y control de acceso

Se fortaleció el sistema de autenticación y autorización mediante JWT.

Cambios realizados:

- Se restringió la creación de usuarios administradores.
- Se implementó una ruta protegida para el registro de administradores.
- Se aplicó control de acceso basado en roles.
- Se verificó la protección de rutas administrativas mediante middleware de autenticación.

Esto evita que usuarios no autorizados puedan asignarse privilegios administrativos.

---

## 5. Unificación de nombres de campos

Se revisó la consistencia entre frontend y backend para garantizar que los modelos, controladores y vistas utilicen los mismos nombres de propiedades.

Especialmente se verificaron campos relacionados con:

- Servicios.
- Citas.
- Pacientes.
- Odontólogos.

Con ello se evita la pérdida de información o errores de visualización.

---

## 6. Gestión de disponibilidad

Durante el desarrollo inicial existía un componente denominado `Disponibilidad.jsx`.

Tras la revisión funcional del sistema se determinó que la gestión de disponibilidad ya se encontraba integrada dentro de los módulos de:

- Calendario.
- Gestión de citas.
- Asignación de horarios.

Por esta razón el archivo `Disponibilidad.jsx` fue eliminado para evitar duplicidad de funcionalidades y simplificar la arquitectura del frontend.

La disponibilidad de horarios continúa funcionando como parte del flujo de gestión de citas y calendario administrativo.

---

## 7. Documentación del proyecto

Se amplió la documentación técnica mediante:

- Instrucciones de instalación.
- Configuración de variables de entorno.
- Descripción de funcionalidades.
- Casos de prueba realizados.
- Evidencias de funcionamiento de la API.

Esto permite que cualquier usuario pueda instalar y ejecutar el proyecto siguiendo las instrucciones proporcionadas.

---

## 8. Pruebas realizadas

Se realizaron pruebas funcionales mediante Postman sobre los principales módulos del sistema:

- Autenticación.
- Gestión de pacientes.
- Gestión de servicios.
- Gestión de citas.
- Gestión de usuarios administradores.

Las evidencias de dichas pruebas junto con las capturas de pantalla del sistema, se encuentran documentadas en este repositorio.

# Estado del proyecto

Versión académica funcional.

Módulos implementados:
- Autenticación.
- Gestión de pacientes.
- Gestión de odontólogos.
- Gestión de servicios.
- Gestión de especialidades.
- Gestión de citas.
- Dashboard administrativo.
- Calendario de disponibilidad.

Pendientes:
- Mejoras visuales.
- Optimización de rendimiento.
- Nuevas funcionalidades futuras.

## Nota sobre la evolución del proyecto

El proyecto fue desarrollado de forma incremental, incorporando mejoras y correcciones a partir de las observaciones recibidas durante el proceso de seguimiento y evaluación. Las modificaciones realizadas permitieron fortalecer la seguridad, mejorar la organización del código y optimizar la experiencia de uso del sistema.


# Autor

Nancy Yurley Gordillo Morales

Proyecto desarrollado para el Servicio Nacional de Aprendizaje (SENA) como evidencia del proceso formativo en  Desarrollo y Programacion de Software.

# Licencia
Este proyecto está bajo la licencia MIT.
