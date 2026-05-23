import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AdminNavbar(){

const linkStyle = ({ isActive }) => ({
  color: "white",
  borderBottom: isActive ? "2px solid white" : "none"
});

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

return(

<AppBar position="static" sx={{ background: "#089792" }}>

<Toolbar>

<Box sx={{ flexGrow: 1 }} />

<Button component={NavLink} to="/admin/calendario" style={linkStyle}>
Calendario
</Button>
<Button component={NavLink} to="/admin/dashboard" style={linkStyle}>
Dashboard
</Button>
<Button component={NavLink} to="/admin/pacientes" style={linkStyle}>
Pacientes
</Button>
<Button component={NavLink} to="/admin/servicios" style={linkStyle}>
Servicios
</Button>
<Button component={NavLink} to="/admin/odontologos" style={linkStyle}>
Odontólogos
</Button>
<Button component={NavLink} to="/admin/mensajes" style={linkStyle}>
Mensajes
</Button>


<Button color="inherit" onClick={logout}>
Cerrar sesión
</Button>

</Toolbar>

</AppBar>

);
}