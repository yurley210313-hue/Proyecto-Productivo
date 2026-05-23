import { useEffect, useState } from "react";
import api from "../services/api";
import { Container, Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Servicios(){

const [servicios,setServicios] = useState([]);

useEffect(()=>{
cargar();
},[]);

const cargar = async ()=>{
const res = await api.get("/servicios");
setServicios(res.data.filter(s => s.activo));
};

return(

<Container sx={{mt:5}}>

<Typography 
  variant="h4"
  sx={{
    color: "#11c948",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    textAlign: "center",
    mb: 1
  }}
>
  Servicios y precios
</Typography>

<div style={{
  width: "80px",
  height: "4px",
  background: "#124321",
  margin: "0 auto 20px auto",
  borderRadius: "2px"
}} />


<Typography sx={{color: "#a44343", mb:3}}>
"Los precios mostrados son referenciales. El costo final será determinado luego de la evaluación profesional."
</Typography>

<Grid container spacing={3}>

{servicios.map(s=>(
<Grid item xs={12} md={4} key={s._id}>

  <Card
  sx={{
    display: "flex",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: 3,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 6
    }
  }}
>

  {/* 🖼️ IMAGEN IZQUIERDA */}
  {s.imagen && (
    <img
      src={s.imagen}
      alt={s.nombre}
      style={{
        width: "250px",
        height: "100%",
        objectFit: "cover"
      }}
    />
  )}

  {/* 📄 CONTENIDO DERECHA */}
  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

    {/* 🦷 NOMBRE */}
    <Typography variant="h5" sx={{ color: "#1d0587",fontWeight: 800 }}>
      {s.nombre}
    </Typography>

    {/* 💰 PRECIO */}
    <Typography sx={{ color: "#2e7d32", fontWeight: 500, mb: 1 }}>
      Desde {new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      }).format(s.precioReferencial)}
    </Typography>

    {/* 📝 DESCRIPCIÓN */}
    <Typography
      sx={{
        fontSize: "14px",
        color: "#090101",
        mb: 2
      }}
    >
      {s.descripcion}
    </Typography>

    {/* ⏱ DURACIÓN */}
    <Typography
      sx={{
        fontSize: "13px",
        color: "#888"
      }}
    >
      ⏱ {s.duracion} minutos
    </Typography>
<Button
  variant="contained"
  size="small"
  component={Link}
  to="/reservar"
  state={{ servicio: s }}
  sx={{
    mt: 2,
    alignSelf: "flex-start",
    backgroundColor: "#11c948",
    "&:hover": {
      backgroundColor: "#0da83a"
    }
  }}
>
  Solicitar Cita
</Button>
  </CardContent>
</Card>
</Grid>
))}

</Grid>

<Box sx={{ textAlign: "center", mt: 5 }}>
  <Button
    variant="contained"
    size="large"
    component={Link}
    to="/reservar"
  >
    Solicitar Cita
  </Button>
</Box>

</Container>


);
}