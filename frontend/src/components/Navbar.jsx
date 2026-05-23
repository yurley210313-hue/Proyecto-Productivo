import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function Navbar(){

//  detectar si hay login
const token = localStorage.getItem("token");

//  estilo links activos
const linkStyle = ({ isActive }) => ({
  color: "white",
  borderBottom: isActive ? "2px solid green" : "none",
  borderRadius: 0
});

//  cerrar sesión
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

return(

<AppBar position="static" sx={{background:"#98f6ee"}}>
<Toolbar>
{/* Logo + nombre */}
<Box sx={{display:"flex", alignItems:"center"}}>
<img
src={Logo}
alt="Consultorio Morales"
style={{width:"120px", marginRight:"10px"}}
/>

<Typography
variant="h9"
  sx={{fontWeight: 800,}}
component={NavLink}
to="/"
style={{color:"#1a0771", textDecoration:"none"}}
>
CONSULTORIO ODONTOLOGICO
</Typography>
</Box>

<Box sx={{ flexGrow: 1 }} />

{/* MENÚ */}
<Box>

{/* 👤 PÚBLICO */}
<Button variant="h4"
  sx={{fontWeight: 800,}}
component={NavLink} to="/" style={{color:"#0a6ea8"}}>
Inicio
</Button>

<Button variant="h4"
  sx={{fontWeight: 800,}}
  component={NavLink} to="/servicios" style={{color:"#0a6ea8"}}>
Servicios y precios
</Button>

<Button variant="h4"
  sx={{fontWeight: 800,}}
 component={NavLink} to="/contacto" style={{color:"#0a6ea8"}}>

Contacto
</Button>

<Button
variant="contained"
sx={{ ml:2, background:"#05609c", color:"#f8fafc" }}
component={NavLink}
to="/reservar"
>
Solicitar Cita
</Button>
</Box>
</Toolbar>
</AppBar>
);
}