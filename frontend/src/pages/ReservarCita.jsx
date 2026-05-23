import { useState, useEffect } from "react";
import api from "../services/api";
import { useLocation } from "react-router-dom";
import {   Container,   Grid,   TextField,   Button,   Typography,   Card,   CardContent,   MenuItem,   Box,   CircularProgress
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function ReservarCita() {
const location = useLocation();
const servicioSeleccionado = location.state?.servicio;
const [servicios, setServicios] = useState([]);
const [loading, setLoading] = useState(false);
const [horariosDisponibles, setHorariosDisponibles] = useState([]);
const [todosHorarios, setTodosHorarios] = useState([]);

  const [form, setForm] = useState({
    nombre: "", 
    documento: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    servicio: "",
    fecha: "",
    hora: "",
    mensaje: "",
    
  });

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await api.get("/servicios");
        setServicios(res.data);
      } catch (error) {
        console.log(error);
        
      }
    };
    cargarServicios();
  }, []);

  useEffect(() => {
    if (servicioSeleccionado) {
      setForm((prev) => ({
        ...prev,
        servicio: servicioSeleccionado._id
      }));
    }
  }, [servicioSeleccionado]);


useEffect(() => {
  const cargarHorarios = async () => {
    if (!form.fecha || !form.servicio) return;

    try {
     const res = await api.get(
  `/citas/disponibilidad?fecha=${form.fecha}&servicio=${form.servicio}`
);
setHorariosDisponibles(res.data.disponibles || []);
setTodosHorarios(res.data.todos || []);
    } catch (error) {
      console.log(error);
    }
  };

  cargarHorarios();
  
}, [form.fecha, form.servicio]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "fecha" ? { hora: "" } : {})
  }));
};

  const reservar = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.servicio || !form.fecha || !form.hora ) {
  alert("Completa los campos obligatorios");
  return;
}

setLoading(true);

    try {
   await api.post("/citas", {
  nombre: form.nombre,
  documento: form.documento,
  telefono: form.telefono,
  email: form.email,
  fechaNacimiento: form.fechaNacimiento,
  servicio: form.servicio,
  fecha: form.fecha,
  hora: form.hora,
  mensaje: form.mensaje,
});

      alert("Cita solicitada correctamente");

// reset opcional

setForm({
  nombre: "",
  documento: "",
  telefono: "",
  email: "",
  fechaNacimiento: "",
  servicio: "",
  fecha: "",
  hora: "",
  mensaje: "",
  
});

    } catch (error) {
      alert("Error al reservar cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>

      {servicioSeleccionado && (
        <Box
          sx={{
            backgroundColor: "#e8f5e9",
            borderLeft: "5px solid #11c948",
            p: 2,
            mb: 3,
            borderRadius: "8px"
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            Servicio seleccionado: {servicioSeleccionado.nombre}
          </Typography>
        </Box>
      )}

      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, color: "#11c948", mb: 1 }}
      >
        Solicitar Cita
      </Typography>

      <Box
        sx={{
          width: "60px",
          height: "4px",
          backgroundColor: "#124321",
          mx: "auto",
          mb: 4,
          borderRadius: "2px"
        }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        {/* INFO */}
        <Box sx={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <Card sx={{ borderRadius: "16px", boxShadow: 5, p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Información de contacto
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ mr: 1 }} /> +57 3005523178
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1 }} /> consultoriomorales@gmail.com
              </Typography>

              <Typography sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                <ScheduleIcon sx={{ mr: 1 }} /> Horario:
              </Typography>

              <Typography>
                Lunes - Viernes 8:00 - 12:00 / 14:00 - 17:00
              </Typography>

              <Typography>
                Sábado y Domingo 8:00 - 12:00
              </Typography>
             
            </CardContent>
          </Card>
        </Box>

        {/* FORMULARIO DE CITA */}

<Box sx={{ flex: "2 1 800px" }}>
<Card sx={{ borderRadius: "20px", boxShadow: 7 }}>
<CardContent sx={{ p: 6 }}>
<form onSubmit={reservar}>
<Grid container spacing={5}>

<Grid item xs={12} md={6}>
<TextField fullWidth label="Nombre Completo" name="nombre" value={form.nombre} onChange={handleChange}/>
</Grid>
<Grid item xs={12} md={6}>
<TextField
    fullWidth
    label="Documento"
    name="documento"
    value={form.documento}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} md={6}>
<TextField fullWidth label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange}/>
</Grid>

<Grid item xs={12}>
<TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange}/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
  type="date"
  fullWidth
  label="Fecha de nacimiento"
  name="fechaNacimiento"
  value={form.fechaNacimiento}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
  inputProps={{
    max: new Date().toISOString().split("T")[0]
  }}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField select fullWidth label="Servicio" name="servicio" value={form.servicio} onChange={handleChange}>
<MenuItem value="">Selecciona</MenuItem>
{servicios.map((s) => (
<MenuItem key={s._id} value={s._id}>
{s.nombre}
</MenuItem>
))}
</TextField>
</Grid>

<Grid item xs={12} md={3}>
<TextField 
                    
  type="date" 
  fullWidth
  label="Fecha de la Cita"
  InputLabelProps={{ shrink: true }}
  name="fecha"
  value={form.fecha}
  onChange={handleChange}
  inputProps={{
    min: new Date().toISOString().split("T")[0]}}
  
/>
 </Grid>


 <Grid item xs={12} md={3}>
  <TextField
    key={form.fecha}
    select
    fullWidth
    label="Hora"
    name="hora"
    value={form.hora}
    onChange={handleChange}
    disabled={!form.fecha}
  >
  <MenuItem value="">
    Selecciona una hora
  </MenuItem>

 {horariosDisponibles.length === 0 && form.fecha && (
    <MenuItem disabled>
      No hay horarios disponibles
    </MenuItem>
  )}

  {todosHorarios.map((hora) => {

  const disponible =
    horariosDisponibles.includes(hora);

  return (
    <MenuItem
      key={hora}
      value={hora}
      disabled={!disponible}
      sx={{
  minWidth: 220,
  color: !disponible ? "#d32f2f" : "#2e7d32",
  fontWeight: !disponible ? 600 : 400,
  opacity: !disponible ? 0.7 : 1
}}
    >
      {hora}
      {!disponible && " - No disponible"}
    </MenuItem>
  );
})}
  </TextField>
</Grid>

<Grid item xs={12}>
<TextField fullWidth multiline rows={3} label="Mensaje" name="mensaje" value={form.mensaje} onChange={handleChange}/>
</Grid>

<Grid item xs={12}>
 <Button type="submit" fullWidth variant="contained" disabled={loading}>
 {loading ? <CircularProgress size={24}/> : "Reservar"}
</Button>
</Grid>

</Grid>
</form>
</CardContent>
</Card>
</Box>

</Box>
</Container>
  );
}