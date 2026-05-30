import { useEffect,useState } from "react"; 
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import AppointmentModal from "../../components/calendar/AppointmentModal";
import CalendarView from "../../components/calendar/CalendarView";
import FiltersSidebar from "../../components/calendar/FiltersSidebar";
import CitasTable from "../../components/calendar/CitasTable";
import AppointmentDrawer from "../../components/calendar/AppointmentDrawer";
import "../../components/calendar/calendario.css";
import { Container,   Box,    Tabs,  Tab, Button } from "@mui/material";
import api from "../../services/api";

export default function Calendario(){

const [servicios, setServicios] = useState([]);
const [citas, setCitas] = useState([]);
const [odontologos, setOdontologos] = useState([]);


const [form, setForm] = useState({
  paciente: "",
  esNuevoPaciente: false,
  nombre: "",
  documento: "",
  telefono: "",
  email: "",
  fechaNacimiento: "",
  fecha: "",
  hora: "",
  servicio: "",
  odontologo: "",
  mensaje: ""
});

const [editando, setEditando] = useState(null);
const [seleccionManual, setSeleccionManual] = useState(false);
const [todosHorarios, setTodosHorarios] = useState([]);
const [tabCitas, setTabCitas] = useState(0);
const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
const [busquedaCitas, setBusquedaCitas] = useState("");
const [pacientes, setPacientes] = useState([]);
const [openModal, setOpenModal] = useState(false);
const [citaSeleccionada, setCitaSeleccionada] = useState(null);
const [vista, setVista] = useState("calendar");
const [odontologoFiltro, setOdontologoFiltro] = useState("");
const [odontologoSugerido, setOdontologoSugerido] = useState(null);
const [consultorioFiltro, setConsultorioFiltro] = useState("");
const [filtroEstado, setFiltroEstado] = useState("");

useEffect(() => {

  const iniciar = async () => {
    try {

      await cargarTodo();
      await obtenerOdontologos();

    } catch (error) {

      console.error(error);

      toast.error("Sesión expirada");
    }
  };

  iniciar();

}, []);
  
  const obtenerOdontologos = async () => {
  const res = await api.get("/odontologos");
    setOdontologos(res.data);
  };
  
  // Filtro por especialidad
  const servicioSeleccionado = servicios.find(
    s => s._id === form.servicio
  );
  const odontologosFiltrados = servicioSeleccionado?.especialidad
    ? odontologos.filter(o => {
  
        const especialidadServicio = String(
          typeof servicioSeleccionado.especialidad === "object"
            ? servicioSeleccionado.especialidad._id
            : servicioSeleccionado.especialidad
        );
  
        return o.especialidades?.some(e =>
          String(typeof e === "object" ? e._id : e)
            === especialidadServicio
        );
      })
    : odontologos;
  
  const cargarTodo = async () => {
  const [resPacientes, resServicios, resCitas] = await Promise.all([
  api.get("/pacientes"),
  api.get("/servicios"),
  api.get("/citas")
  ]);
  
  setPacientes(resPacientes.data);
  setServicios(resServicios.data);
  setCitas(resCitas.data);
    };
  
  
  useEffect(() => {
  
    // 🚫 si el usuario eligió manualmente, no sugerir
    if (seleccionManual) return;
  
    const sugerir = async () => {
  
      if (!form.fecha || !form.hora || !form.servicio) return;
  
      try {
  
  const res = await api.get("/citas/sugerir-odontologo", {
          params: {
            fecha: form.fecha,
            hora: form.hora,
            servicio: form.servicio
          }
        });
  
        setForm(prev => ({
          ...prev,
          odontologo: res.data?._id || ""
        }));
        setOdontologoSugerido(res.data || null);
  
      } catch (error) {
        console.log(error);
      }
    };
  
    sugerir();
  
  }, [
    form.fecha,
    form.hora,
    form.servicio,
    seleccionManual
  ]);
  
  useEffect(() => {
  
  const cargarHorarios = async () => {
  
      if (!form.fecha || !form.servicio) {
        setTodosHorarios([]);
        return;
      }
  
      try {
  
        const res = await api.get(
          `/citas/disponibilidad?fecha=${form.fecha}&servicio=${form.servicio}`
        );
  
        setTodosHorarios(res.data.todos || []);
  
      } catch (error) {
        console.log(error);
      }
    };
  
    cargarHorarios();
  
  }, [form.fecha, form.servicio]);

  const handleDateSelect = (info) => {

  setForm(prev => ({
    ...prev,
    fecha: info.startStr.split("T")[0],
    hora: info.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }));

  setOpenModal(true);
};
  

  // 🔹 manejar formulario
  
const handleChange = (e) => {
  const { name, value } = e.target;

  // ✅ paciente
  if (name === "paciente") {

    if (value === "nuevo") {
      setForm(prev => ({
        ...prev,
        paciente: "nuevo",
        esNuevoPaciente: true
      }));
    } else {
      setForm(prev => ({
        ...prev,
        paciente: value,
        esNuevoPaciente: false
      }));
    }

    return;
  }

  // ✅ fecha u hora
  if (name === "fecha" || name === "hora") {

    setSeleccionManual(false);

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    return;
  }

  // ✅ servicio
  if (name === "servicio") {

    setForm(prev => ({
      ...prev,
      servicio: value
    }));

    return;
  }

  // ✅ cualquier otro campo
  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};

     // CITAS

//Guardar cita

const guardarCita = async (e) => {
  e.preventDefault();

  try {

    const data = {
      servicio: form.servicio,
      fecha: form.fecha,
      hora: form.hora,
      mensaje: form.mensaje,
     odontologo: seleccionManual ? form.odontologo: undefined
    };

    // ✅ paciente existente
    if (!form.esNuevoPaciente) {
      data.paciente = form.paciente;
    }

    // ✅ paciente nuevo
    if (form.esNuevoPaciente) {
      data.nombre = form.nombre;
      data.documento = form.documento;
      data.telefono = form.telefono;
      data.email = form.email;
      data.fechaNacimiento = form.fechaNacimiento;
    }

    if (editando) {
      await api.put(`/citas/${editando}`, data);
      alert("Cita actualizada");
    } else {
      await api.post("/citas", data);
      toast.success("Cita creada");
    }

    limpiarFormulario();
    await cargarTodo();
    setOpenModal(false);

  } catch (err) {
    console.error(err);
    toast.error("Error al guardar"
    );
  }
};

// Limpiar formulario de citas

const limpiarFormulario = () => {
  setForm({
    paciente: "",
    esNuevoPaciente: false,
    nombre: "",
    documento: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    fecha: "",
    hora: "",
    servicio: "",
    odontologo: "",
    mensaje: ""
  });
setEditando(null);
setOpenModal(false);
};

  // 🔹 eliminar cita

  const eliminarCita = async (id) => {
    if (!window.confirm("¿Eliminar cita?")) return;

    await api.delete(`/citas/${id}`);
    cargarTodo();
  };

  // 🔹 editar cita

  const editarCita = (c) => {

    setForm({
    paciente: c.paciente?._id || "",
    esNuevoPaciente: false,
    nombre: c.paciente?.nombre || "",
    documento: c.paciente?.documento || "",
    telefono: c.paciente?.telefono || "",
    email: c.paciente?.email || "",
    fechaNacimiento: "",
    servicio: c.servicio?._id || "",
    fecha: c.fecha
      ? new Date(c.fecha).toISOString().split("T")[0]
      : "",
    hora: c.hora || "",
    odontologo: c.odontologo?._id || "",
    mensaje: c.mensaje || ""
    });

    setEditando(c._id);
    setOpenModal(true);
};
const handleEventClick = (info) => {

  const cita = citas.find(
    c => c._id === info.event.id
  );

  setCitaSeleccionada(cita);
};
const handleEventDrop = async(info) => {

  try {

    const event = info.event;

    await api.put(`/citas/${event.id}`, {
      fecha: event.startStr.split("T")[0],
      hora: event.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    toast.success("Cita movida");

    cargarTodo();

  } catch (err) {

    info.revert();

    toast.error("Error al mover cita");
  }
};
const handleEventResize = async(info) => {

  try {

    await api.put(`/citas/${info.event.id}`, {
      horaFin: info.event.end
    });

    toast.success("Duración actualizada");

  } catch (err) {

    info.revert();

    toast.error("Error");
  }
};
 
// FUNCIONES

const citasFiltradas = citas
  .filter(c => {
  
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
const fechaCita = new Date(c.fecha);
fechaCita.setHours(0, 0, 0, 0);

    // 🔎 búsqueda
const coincideBusqueda =
      c.paciente?.nombre
        ?.toLowerCase()
        .includes(busquedaCitas.toLowerCase()) ||

      String(c.paciente?.documento || "")
        .includes(busquedaCitas);

    if (!coincideBusqueda) return false;

    // filtro odontólogo
    if (
      odontologoFiltro &&
      c.odontologo?._id !== odontologoFiltro
    ) {
      return false;
    }

    // filtro fecha seleccionada

if (fechaSeleccionada) {
const fechaFiltro =    fechaSeleccionada.format("YYYY-MM-DD");
const fechaCitaString = new Date(c.fecha).toISOString().split("T")[0];
if (fechaCitaString !== fechaFiltro) {
        return false;
  }
}
// tabs

if (tabCitas === 0) {
return fechaCita.getTime() === hoy.getTime();
    }
if (tabCitas === 1) {
return fechaCita > hoy;
    }
if (tabCitas === 2) {
return fechaCita < hoy;
    }
if (tabCitas === 3) return true;
return false;
})

  .sort((a, b) => {

const fechaHoraA = new Date(a.fecha);
const fechaHoraB = new Date(b.fecha);
const [horaA, minutoA] = a.hora.split(":");
const [horaB, minutoB] = b.hora.split(":");

fechaHoraA.setHours(horaA, minutoA, 0, 0);
fechaHoraB.setHours(horaB, minutoB, 0, 0);
 return fechaHoraA - fechaHoraB;
  });
const citasCalendarioFiltradas = citas.filter(c => {
if (
    odontologoFiltro &&
    c.odontologo?._id !== odontologoFiltro
  ) {
    return false;
  }

if (fechaSeleccionada) {

const fechaFiltro =
fechaSeleccionada.format("YYYY-MM-DD");
const fechaCita =
dayjs(c.fecha).format("YYYY-MM-DD");

if (fechaFiltro !== fechaCita) {
      return false;
    }
  }

  return true;
});

const cambiarEstado = async (
  id,
  nuevoEstado
) => {

  try {

    await api.put(`/citas/${id}`, {
      estado: nuevoEstado
    });

    await cargarTodo();

    toast.success("Estado actualizado");

  } catch (error) {

    console.error(error);

    toast.error("Error al actualizar estado");
  }
};

return (

  <Container maxWidth="xl">

    <Toaster position="top-right" />

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        minHeight: "100vh",
        background: "#f5f7fb"
      }}
    >

<FiltersSidebar
odontologos={odontologos}
odontologoFiltro={odontologoFiltro}
setOdontologoFiltro={setOdontologoFiltro}
fechaSeleccionada={fechaSeleccionada}
setFechaSeleccionada={setFechaSeleccionada}
      />

      <Box sx={{ p: 2 }}>

        <h1>Calendario de Citas</h1>

        <Button
          variant="contained"
          onClick={() => {
            limpiarFormulario();
            setOpenModal(true);
          }}
          sx={{ mb: 2 }}
        >
          Nueva cita
        </Button>

        <Tabs
          value={vista}
          onChange={(e, v) => setVista(v)}
          sx={{ mb: 2 }}
        >
          <Tab
            label="Calendario"
            value="calendar"
          />

          <Tab
            label="Tabla"
            value="table"
          />
        </Tabs>

        {vista === "calendar" && (
          <CalendarView
          key={
  fechaSeleccionada
    ? fechaSeleccionada.format("YYYY-MM-DD")
    : "week"
}
            citas={citasCalendarioFiltradas}
            odontologos={odontologos}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onDateSelect={handleDateSelect}
            fechaSeleccionada={fechaSeleccionada}
          />
        )}

        {vista === "table" && (
          <CitasTable
            citasFiltradas={citasFiltradas}
            tabCitas={tabCitas}
            setTabCitas={setTabCitas}
            busquedaCitas={busquedaCitas}
            setBusquedaCitas={setBusquedaCitas}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            cambiarEstado={cambiarEstado}
            editarCita={editarCita}
            eliminarCita={eliminarCita}
            
          />
        )}

      </Box>

    </Box>

    <AppointmentModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      editando={editando}
      guardarCita={guardarCita}
      form={form}
      handleChange={handleChange}
      pacientes={pacientes}
      servicios={servicios}
      todosHorarios={todosHorarios}
      odontologosFiltrados={odontologosFiltrados}
      setSeleccionManual={setSeleccionManual}
      odontologoSugerido={odontologoSugerido}
      setForm={setForm}
    />

  </Container>
); 
} 