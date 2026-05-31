import { useEffect, useState } from "react";
import api from "../../services/api";
import {  Container, Typography, Paper,  Box, TextField, Button, MenuItem, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow} from "@mui/material";

export default function Odontologos(){

// Estado

const [odontologos, setOdontologos] = useState([]);
const [especialidades, setEspecialidades] = useState([]);

const [form, setForm] = useState({
nombre: "",
documento: "",
especialidad: ""
});
const [editando, setEditando] = useState(null);
const [mostrarFormulario, setMostrarFormulario] = useState(false);

//Cargar datos

useEffect(() => {
  obtenerOdontologos();
  cargarEspecialidades();
}, []);

const obtenerOdontologos = async () => {
  const res = await api.get("/odontologos");
  setOdontologos(res.data);
};
const cargarEspecialidades = async () => {
  const res = await api.get("/especialidades");
  setEspecialidades(res.data);
};

// Crear editar

const guardarOdontologo = async () => {

  const data = {
    nombre: form.nombre,
    documento: form.documento,
    especialidades: [form.especialidad]
  };

  if (editando) {
    await api.put(`/odontologos/${editando}`, data);
  } else {
    await api.post("/odontologos", data);
  }

  setForm({
    nombre: "",
    documento: "",
    especialidad: ""
  });

  setEditando(null);
  obtenerOdontologos();
};

// Cargar Datos

const editar = (o) => {
  setForm({
    nombre: o.nombre,
    documento: o.documento,
    especialidad: o.especialidades?.[0]?._id || ""
  });

  setEditando(o._id);
  setMostrarFormulario(true);
};

// Eliminar 

const eliminar = async (id, nombre) => {

  const confirmar = window.confirm(
    `¿Desea eliminar al odontólogo ${nombre}?`
  );

  if (!confirmar) return;

  await api.delete(`/odontologos/${id}`);

  obtenerOdontologos();
};

  return(

<div>

<Typography
  variant="h4"
  sx={{
    fontWeight: 700,
    color: "#04364A",
    mb: 3
  }}
>
  Gestión de Odontólogos
</Typography>

<Box sx={{ mb: 3 }}>
  <Button
    variant="contained"
    onClick={() => {
      setMostrarFormulario(true);
      setEditando(null);

      setForm({
        nombre: "",
        documento: "",
        especialidad: ""
      });
    }}
    sx={{
      backgroundColor: "#0f9d9a",
      "&:hover": {
        backgroundColor: "#0b7f7c"
      }
    }}
  >
    Crear odontólogo
  </Button>
 </Box>

<table border="1" cellPadding="10"></table>
  
{mostrarFormulario && (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      mb: 4,
      borderRadius: 3
    }}
  >
<TextField
  label="Nombre"
  value={form.nombre}
  onChange={(e) =>
    setForm({ ...form, nombre: e.target.value })
  }
/>

<TextField
  label="Documento"
  value={form.documento}
  onChange={(e) =>
    setForm({ ...form, documento: e.target.value })
  }
/>

<TextField
  select
  label="Especialidad"
  value={form.especialidad}
  onChange={(e) =>
    setForm({
      ...form,
      especialidad: e.target.value
    })
  }
>
  {especialidades.map((esp) => (
    <MenuItem
      key={esp._id}
      value={esp._id}
    >
      {esp.nombre}
    </MenuItem>
  ))}
</TextField>
<Box sx={{ mt: 2, display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        onClick={guardarOdontologo}
      >
        {editando ? "Actualizar" : "Guardar"}
      </Button>

      <Button
        color="inherit"
        onClick={() => {
          setMostrarFormulario(false);
          setEditando(null);
        }}
      >
        Cancelar
      </Button>
    </Box>
  </Paper>
)}
<Table>
<TableHead
  sx={{
    backgroundColor: "#0f9d9a"
  }}
></TableHead>
<TableCell sx={{ color: "white", fontWeight: 700 }}>
  Nombre
</TableCell>
</Table>

<TableContainer
  component={Paper}
  sx={{
    borderRadius: 3,
    overflow: "hidden"
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><b>Nombre</b></TableCell>
        <TableCell><b>Documento</b></TableCell>
        <TableCell><b>Especialidad</b></TableCell>
        <TableCell><b>Acciones</b></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {odontologos.map((o) => (
        <TableRow key={o._id}>
          <TableCell>{o.nombre}</TableCell>
          <TableCell>{o.documento}</TableCell>
          <TableCell>{o.especialidades?.[0]?.nombre || ""}</TableCell>

          <TableCell>
            <Button
              size="small"
              onClick={() => editar(o)}
            >
              Editar
            </Button>
<Button
  color="error"
  size="small"
  onClick={() => eliminar(o._id, o.nombre)}
>
  Eliminar
</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
 );
}