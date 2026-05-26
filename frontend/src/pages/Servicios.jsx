import { useEffect, useState } from "react";
import api from "../services/api";
import {  Container, Grid, Card, CardContent, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function Servicios(){

const [servicios,setServicios] = useState([]);
useEffect(()=>{
cargar();
},[]);

// estado
const [servicioSeleccionado, setServicioSeleccionado] = useState("");

const cargar = async ()=>{
const res = await api.get("/servicios");
setServicios(res.data.filter(s => s.activo));
};

//funciones 
const irAServicio = (id) => {
  setServicioSeleccionado(id);

  const elemento = document.getElementById(`servicio-${id}`);

  if (elemento) {
    elemento.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};

return(

<Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>

<Typography 
  variant="h4"
  sx={{
    color: "#056f72",
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
  background: "#0c1112",
  margin: "0 auto 20px auto",
  borderRadius: "2px"
}} />


<Typography
  sx={{
    color: "#7a8a90",
    textAlign: "center",
    mb: 5,
    maxWidth: "700px",
    mx: "auto"
  }}
>
  Los precios mostrados son referenciales. El costo final será determinado luego de la evaluación profesional.
</Typography>

<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 5
  }}
>
  <FormControl sx={{ minWidth: 320 }}>
    <InputLabel>Tratamientos</InputLabel>

    <Select
      value={servicioSeleccionado}
      label="Tratamientos"
      onChange={(e) => irAServicio(e.target.value)}
      sx={{
        borderRadius: "14px",
        backgroundColor: "#fff"
      }}
    >
      {servicios.map((s) => (
        <MenuItem key={s._id} value={s._id}>
          {s.nombre}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

<Grid container spacing={4}>
  {servicios.map((s) => (
  <Grid item xs={12} md={6} key={s._id} id={`servicio-${s._id}`}>
      
      <Card
        sx={{
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: 3,
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 8
          }
        }}
      >

        {/* IMAGEN */}
        {s.imagen && (
          <Box
            component="img"
            src={s.imagen}
            alt={s.nombre}
            sx={{
              width: "100%",
              height: 240,
              objectFit: "cover"
            }}
          />
        )}

        {/* CONTENIDO */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3
          }}
        >

          {/* TITULO */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#04364A",
              mb: 1
            }}
          >
            {s.nombre}
          </Typography>

          {/* PRECIO */}
          <Typography
            sx={{
              color: "#1f978d",
              fontWeight: 700,
              fontSize: "20px",
              mb: 2
            }}
          >
            Desde{" "}
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0
            }).format(s.precioReferencial)}
          </Typography>

          {/* DESCRIPCION */}
          <Typography
            sx={{
              color: "#555",
              mb: 3,
              lineHeight: 1.7,
              flexGrow: 1
            }}
          >
            {s.descripcion}
          </Typography>

          {/* FOOTER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto"
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#888"
              }}
            >
              ⏱ {s.duracion} min
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/reservar"
              state={{ servicio: s }}
              sx={{
                borderRadius: "12px",
                backgroundColor: "#5ebecb",
                px: 3,
                "&:hover": {
                  backgroundColor: "#1f978d"
                }
              }}
            >
              Reservar
</Button>
</Box>
</CardContent>
</Card>
</Grid>
))}
</Grid>
</Container>
);
}