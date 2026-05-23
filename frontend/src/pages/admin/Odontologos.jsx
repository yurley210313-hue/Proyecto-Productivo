import { useEffect, useState } from "react";
import api from "../../services/api";
import { TextField, Button, MenuItem } from "@mui/material";

export default function Odontologos(){

// Estado

const [odontologos, setOdontologos] = useState([]);
const [form, setForm] = useState({
  nombre: "",
  documento: "",
  especialidad: "General"
});
const [editando, setEditando] = useState(null);

//Cargar datos

useEffect(() => {
  obtenerOdontologos();
}, []);

const obtenerOdontologos = async () => {
  const res = await api.get("/odontologos");
  setOdontologos(res.data);
};

// Crear editar

const guardarOdontologo = async () => {
  if (editando) {
    await api.put(`/odontologos/${editando}`, form);
  } else {
    await api.post("/odontologos", form);
  }

  setForm({ nombre: "", documento: "", especialidad: "General" });
  setEditando(null);
  obtenerOdontologos();
};

// Cargar Datos

const editar = (o) => {
  setForm({
    nombre: o.nombre,
    documento: o.documento,
    especialidad: o.especialidad
  });
  setEditando(o._id);
};

// Eliminar 

const eliminar = async (id) => {
  await api.delete(`/odontologos/${id}`);
  obtenerOdontologos();
};

  return(

<div>

<h1>Odontólogos</h1>

<table border="1" cellPadding="10"></table>

       <TextField
  label="Nombre"
  value={form.nombre}
  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
/>

<TextField
  label="Documento"
  value={form.documento}
  onChange={(e) => setForm({ ...form, documento: e.target.value })}
/>

<TextField
  select
  label="Especialidad"
  value={form.especialidad}
  onChange={(e) => setForm({ ...form, especialidad: e.target.value })}
>
  <MenuItem value="General">General</MenuItem>
  <MenuItem value="Endodoncia">Endodoncia</MenuItem>
  <MenuItem value="Ortodoncia">Ortodoncia</MenuItem>
  <MenuItem value="Rehabilitación">Rehabilitación</MenuItem>
</TextField>

<Button onClick={guardarOdontologo}>
  {editando ? "Actualizar" : "Guardar"}
</Button>
 {odontologos.map(o => (
  <div key={o._id}>
  {o.nombre} - {o.especialidad} - {o.documento}

    <Button onClick={() => editar(o)}>Editar</Button>
    <Button onClick={() => eliminar(o._id)}>Eliminar</Button>
  </div>
))}

 </div>
 );
}