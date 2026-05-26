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
<Container
  maxWidth="xl"
  sx={{
    py: 6,
    background:
      "linear-gradient(to bottom, #f5f7fa, #e8f5e9)",
    borderRadius: "20px"
  }}
>

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
        sx={{ fontWeight: 700, color: "#092d68", mb: 1 }}
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
<Box sx={{ flex: "1 1 320px", maxWidth: "400px" }}>

  {/* TARJETA INFO */}
  <Card
    sx={{
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      p: 2,
      background:
        "linear-gradient(180deg, #94dcec, #d5dfec)"
    }}
  >
    <CardContent>

      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "#124321"
        }}
      >
        Información de contacto
      </Typography>

      <Typography sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PhoneIcon sx={{ mr: 1, color: "#11c948" }} />
        +57 3005523178
      </Typography>

      <Typography sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <EmailIcon sx={{ mr: 1, color: "#11c948" }} />
        consultoriomorales@gmail.com
      </Typography>

      <Typography
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          fontWeight: 600
        }}
      >
        <ScheduleIcon sx={{ mr: 1, color: "#11c948" }} />
        Horario:
      </Typography>

      <Typography sx={{ mt: 1 }}>
        Lunes - Viernes
        <br />
        8:00 - 12:00 / 14:00 - 17:00
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Sábado y Domingo
        <br />
        8:00 - 12:00
      </Typography>

    </CardContent>
  </Card>

  {/* MAPA */}
  <Box
    sx={{
      mt: 3,
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
    }}
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.09771685424!2d-73.21851050000001!3d7.114673899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e683d854d1e08a3%3A0x5e832c3380b07a66!2sConsultorio%20Odontol%C3%B3gico%20Morales!5e0!3m2!1ses!2ses!4v1779618824591!5m2!1ses!2ses"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </Box>

</Box>

        {/* FORMULARIO DE CITA */}

<Box
  sx={{
    flex: "1 1 700px",
    maxWidth: "850px"
  }}
>
<Card
  sx={{
    borderRadius: "24px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
    background: "#e9fbf5"
  }}
>
<CardContent sx={{ p: { xs: 3, md: 6 } }}>
<form onSubmit={reservar}>
<Grid
  container
  spacing={4}
  alignItems="stretch"
>

<Grid item xs={12} md={6}>
<TextField
  fullWidth
  label="Nombre Completo"
  name="nombre"
  value={form.nombre}
  onChange={handleChange}
  sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
/>
</Grid>
<Grid item xs={12} md={6}>
<TextField
    fullWidth
    label="Documento"
    name="documento"
    value={form.documento}
    onChange={handleChange}
   sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
  />
</Grid>

<Grid item xs={12} md={6}>
<TextField fullWidth label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange}sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
  fullWidth
  label="Email"
  name="email"
  value={form.email}
  onChange={handleChange}
sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
  type="date"
  fullWidth
  label="Fecha de nacimiento"
  name="fechaNacimiento"
  value={form.fechaNacimiento}
  onChange={handleChange}
 sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
  InputLabelProps={{ shrink: true }}
  inputProps={{
    max: new Date().toISOString().split("T")[0]
  }}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
  select
  fullWidth
  label="Servicio"
  name="servicio"
  value={form.servicio}
  onChange={handleChange}
 sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
>
<MenuItem value="">Selecciona</MenuItem>
{servicios.map((s) => (
<MenuItem key={s._id} value={s._id}>
{s.nombre}
</MenuItem>
))}
</TextField>
</Grid>

<Grid item xs={12} md={6}>
<TextField 
                    
  type="date" 
  fullWidth
  label="Fecha de la Cita"
  InputLabelProps={{ shrink: true }}
  name="fecha"
  value={form.fecha}
  onChange={handleChange}
  sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
    minHeight: "56px"
  }
}}
  inputProps={{
    min: new Date().toISOString().split("T")[0]}}
  
/>
 </Grid>


<Grid item xs={12} md={6}>
  <TextField
    key={form.fecha}
    select
    fullWidth
    label="Hora"
    name="hora"
    value={form.hora}
    onChange={handleChange}
 sx={{
  minWidth: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#c6f8e7",
  }
}}
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
<Box sx={{ textAlign: "center", mt: 2 }}>
  <Button
    type="submit"
    variant="contained"
    disabled={loading}
    sx={{
      px: 5,
      py: 1.5,
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: 700,
      textTransform: "none",
      background: "linear-gradient(135deg, #300595, #f86ce8)",
      boxShadow: "0 8px 20px rgba(17,201,72,0.3)",
      "&:hover": {
        background: "linear-gradient(135deg, #cdc117, #be7911)"
      }
    }}
  >
    {loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      "Reservar cita"
    )}
  </Button>
</Box>

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