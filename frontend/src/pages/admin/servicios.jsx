import { useEffect, useState } from "react";
import api from "../../services/api";

import {   Container,   Typography,   Table,   TableBody,   TableCell,   TableHead,   TableRow,   Button,
  Dialog,   DialogTitle,   DialogContent,   DialogActions,   TextField,   MenuItem,   Switch } from "@mui/material";

export default function Servicios(){

  const [servicios,setServicios] = useState([]);
  const [open,setOpen] = useState(false);
  const [editando,setEditando] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);

  const [form,setForm] = useState({
    nombre:"",
    precioReferencial:"",
    descripcion:"",
    duracion:"",
    especialidad:"",
    activo:true,
    imagen:""
  });

  const [idEdit,setIdEdit] = useState(null);

  // 🔄 CARGAR SERVICIOS
  useEffect(()=>{
    cargarServicios();
    cargarEspecialidades();
  },[]);

  const cargarServicios = async ()=>{
    try{
      const res = await api.get("/servicios");
      setServicios(res.data);
    }catch(error){
      console.error("Error cargando servicios", error);
    }
  };

  // ✏️ MANEJO INPUTS
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔘 SWITCH
  const handleSwitch = (e)=>{
    setForm({
      ...form,
      activo: e.target.checked
    });
  };

  // ➕ CREAR
  const abrirCrear = ()=>{
    setEditando(false);
    setForm({
      nombre:"",
      precioReferencial:"",
      descripcion:"",
      duracion:"",
      especialidad:"",
      activo:true
    });
    setOpen(true);
  };

  // ✏️ EDITAR 
  const abrirEditar = (s)=>{
    setEditando(true);
    setIdEdit(s._id);

    setForm({
      nombre: s.nombre || "",
      precioReferencial: s.precioReferencial || "",
      descripcion: s.descripcion || "",
      duracion: s.duracion || "",
     especialidad: s.especialidad?._id || "",
      activo: s.activo ?? true,
      imagen: s.imagen || ""
    });

    setOpen(true);
  };

  // 💾 GUARDAR
  const guardar = async ()=>{
    try{

      const data = {
        nombre: form.nombre,
        precioReferencial: Number(form.precioReferencial),
        descripcion: form.descripcion,
        duracion: form.duracion,
        especialidad: form.especialidad,
        activo: form.activo,
        imagen: form.imagen
      };

      if(editando){
        await api.put(`/servicios/${idEdit}`, data);
      }else{
        await api.post("/servicios", data);
      }

      setOpen(false);
      await cargarServicios();

    }catch(error){
      console.error("Error guardando servicio", error);
    }
  };

  // 🗑 ELIMINAR
  const eliminar = async (id)=>{
    if(window.confirm("¿Eliminar servicio?")){
      try{
        await api.delete(`/servicios/${id}`);
        cargarServicios();
      }catch(error){
        console.error("Error eliminando", error);
      }
    }
  };
const cargarEspecialidades = async () => {
  try {

    const res = await api.get("/especialidades");

    setEspecialidades(res.data);

  } catch (error) {

    console.error(error);

  }
};
  return(

    <Container sx={{mt:5}}>

      <Typography variant="h4" gutterBottom>
        Gestión de Servicios
      </Typography>

      <Button
        variant="contained"
        sx={{mb:2}}
        onClick={abrirCrear}
      >
        + Nuevo Servicio
      </Button>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio Referencial</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {servicios.map(s=>(
            <TableRow key={s._id}>

              <TableCell>{s.nombre}</TableCell>
              <TableCell> <strong>
    Desde {new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(s.precioReferencial)}
  </strong></TableCell>
              <TableCell>{s.especialidad?.nombre}</TableCell>
              <TableCell>{s.activo ? "Sí" : "No"}</TableCell>

              <TableCell>

                <Button onClick={()=>abrirEditar(s)}>
                  Editar
                </Button>

                <Button color="error" onClick={()=>eliminar(s._id)}>
                  Eliminar
                </Button>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

      {/* MODAL */}

      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth>

        <DialogTitle>
          {editando ? "Editar servicio" : "Nuevo servicio"}
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            sx={{mb:2}}
          />

          <TextField
            fullWidth
            label="Precio Referencial"
            name="precioReferencial"
            type="number"
            value={form.precioReferencial}
            onChange={handleChange}
            sx={{mb:2}}
          />

          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            sx={{mb:2}}
          />

          <TextField
            fullWidth
            label="Duración (min)"
            name="duracion"
            type="number"
            value={form.duracion}
            onChange={handleChange}
            sx={{mb:2}}
          />
          <TextField
  fullWidth
  label="URL de imagen"
  name="imagen"
  value={form.imagen}
  onChange={handleChange}
  sx={{mb:2}}
/>

<TextField
  select
  fullWidth
  label="Especialidad"
  name="especialidad"
  value={form.especialidad}
  onChange={handleChange}
  sx={{ mb: 2 }}
>

  {especialidades.map((e) => (

    <MenuItem
      key={e._id}
      value={e._id}
    >
      {e.nombre}
    </MenuItem>

  ))}

</TextField>

          <div style={{marginTop:"10px"}}>
            Activo:
            <Switch
              checked={form.activo}
              onChange={handleSwitch}
            />
          </div>

        </DialogContent>

        <DialogActions>

          <Button onClick={()=>setOpen(false)}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={guardar}>
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

    </Container>

  );
}