import { useEffect, useState } from "react";
import { Container, Typography, Box, TablePagination } from "@mui/material";
import api from "../../services/api";
import {   TextField,  Button,   Table,   TableHead,   TableRow,   TableCell,   TableBody,   Paper,  } from "@mui/material";

export default function Pacientes() {
    
const [pacientes, setPacientes] = useState([]);
const [busquedaPacientes, setBusquedaPacientes] = useState("");
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

const [form, setForm] = useState({
  nombre: "",
  documento: "",
  telefono: "",
  email: "",
  fechaNacimiento: ""
});

const [editandoPaciente, setEditandoPaciente] = useState(null);

const handleChangePage = (event, newPage) => {   setPage(newPage);};
const handleChangeRowsPerPage = (event) => {   setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0); // volver a la primera página 
};

const handleChange = (e) => {
  const { name, value } = e.target;

  // funciones

  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};
useEffect(() => {
  cargarPacientes();
}, []);

const cargarPacientes = async () => {
  try {
    const res = await api.get("/pacientes");
    setPacientes(res.data);
  } catch (error) {
    console.log(error);
  }
};

const limpiarFormulario = () => {
  setForm({
    nombre: "",
    documento: "",
    telefono: "",
    email: "",
    fechaNacimiento: ""
  });
};
  // PACIENTES

  //Eliminar paciente
  const eliminarPaciente = async (id) => {
  if (!window.confirm("¿Eliminar paciente?")) return;

  await api.delete(`/pacientes/${id}`);
  cargarPacientes();
};

// Editar paciente

const editarPaciente = (p) => {
  setForm({
    nombre: p.nombre || "",
    documento: p.documento || "",
    telefono: p.telefono || "",
    email: p.email || "",
    fechaNacimiento: p.fechaNacimiento
      ? new Date(p.fechaNacimiento).toISOString().split("T")[0]
      : ""
  });

  setEditandoPaciente(p._id);
};

// Guardar paciente

const guardarPaciente = async (e) => {
  e.preventDefault();

  try {

    const data = {
      nombre: form.nombre,
      documento: form.documento,
      telefono: form.telefono,
      email: form.email,
      fechaNacimiento: form.fechaNacimiento
    };

    await api.put(`/pacientes/${editandoPaciente}`, data);

    alert("Paciente actualizado");

    limpiarFormulario();

    setEditandoPaciente(null);

    cargarPacientes();

  } catch (error) {
    console.error(error);
    alert("Error al actualizar paciente");
  }
};

const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return "";

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
};
const formatearFecha = (fecha) => {
  if (!fecha) return "";

  return new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

 return (
  <Container maxWidth="lg">

    {editandoPaciente && (

      <Box
        component="form"
        onSubmit={guardarPaciente}
        sx={{
          display: "grid",
          gap: 2,
          mb: 4
        }}
      >

        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <TextField
          label="Documento"
          name="documento"
          value={form.documento}
          onChange={handleChange}
        />

        <TextField
          type="date"
          label="Fecha nacimiento"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Teléfono"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
        >
          Actualizar paciente
        </Button>

      </Box>

    )}
{/* TABLA PACIENTES */}
<Typography variant="h4" gutterBottom>
    Pacientes
</Typography>
<TextField
 
label="Buscar paciente (nombre o documento)"
variant="outlined"
size="small"
fullWidth
sx={{ mb: 2 }}
value={busquedaPacientes}
onChange={(e) => setBusquedaPacientes(e.target.value)}
/>


<Paper elevation={3} sx={{ p: 2, mb: 4 }}>
<TablePagination
  component="div"
  count={
    pacientes.filter(p =>
      String(p.documento || "").includes(busquedaPacientes) ||
      String(p.nombre || "")
        .toLowerCase()
        .includes(busquedaPacientes.toLowerCase())
    ).length
  }
page={page}
onPageChange={handleChangePage}
rowsPerPage={rowsPerPage}
onRowsPerPageChange={handleChangeRowsPerPage}
rowsPerPageOptions={[5, 10, 20]}
/>

<Table size="small">
         
<TableHead>
<TableRow>
<TableCell>Nombre</TableCell>
<TableCell>Documento</TableCell>
<TableCell>Teléfono</TableCell>
<TableCell>Fecha Nacimiento</TableCell>
<TableCell>Email</TableCell>
<TableCell>Acciones</TableCell>
</TableRow>
</TableHead>

<TableBody>
{pacientes
  .filter(p =>
    String(p.documento || "").includes(busquedaPacientes) ||
    String(p.nombre || "")
      .toLowerCase()
      .includes(busquedaPacientes.toLowerCase())
  )
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map(p => (
              
<TableRow key={p._id}>
<TableCell>{p.nombre}</TableCell>
<TableCell>{p.documento}</TableCell>
<TableCell>{p.telefono}</TableCell>
<TableCell>
  <Box>
    <Typography variant="body2">
      {formatearFecha(p.fechaNacimiento)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {calcularEdad(p.fechaNacimiento)} años
    </Typography>
  </Box>
</TableCell>
<TableCell>{p.email}</TableCell>
<TableCell>
  
<Button onClick={() => editarPaciente(p)}>Editar</Button>
<Button color="error" onClick={() => eliminarPaciente(p._id)}> Eliminar</Button>
</TableCell>
</TableRow>
))}
</TableBody>
          
</Table>
</Paper>   
</Container>
  );
}