import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function Navbar(){

const location = useLocation();

//  detectar si hay login
const token = localStorage.getItem("token");


//  cerrar sesión
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
const navButtonStyle = (path) => ({
  color: "#fff",
  fontWeight: 700,
  borderRadius: "10px",
  px: 2,
  py: 1,
  position: "relative",
  textTransform: "none",
  transition: "all 0.3s ease",

  // LINEA ACTIVA
  "&::after": {
    content: '""',
    position: "absolute",
    left: "15%",
    bottom: 0,
    width: location.pathname === path ? "70%" : "0%",
    height: "3px",
    borderRadius: "10px",
    background: "#adb90a",
    transition: "0.3s ease"
  },

  // HOVER
  "&:hover": {
    background: "rgba(255,255,255,0.08)",

    "&::after": {
      width: "70%"
    }
  }
});
return(

<AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: "rgba(10, 67, 132, 0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    px: 2
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1
    }}
  >

    {/* LOGO */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2
      }}
    >
      <img
        src={Logo}
        alt="Consultorio Morales"
        style={{
          width: "70px",
          borderRadius: "12px"
        }}
      />

      <Typography
        component={NavLink}
        to="/"
        sx={{
          textDecoration: "none",
          color: "#fff",
          fontWeight: 800,
          fontSize: {
            xs: "14px",
            md: "22px"
          },
          letterSpacing: "1px"
        }}
      >
        CONSULTORIO ODONTOLÓGICO
      </Typography>
    </Box>

    {/* MENU */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1
      }}
    >

      {/* INICIO */}
      <Button
  component={NavLink}
  to="/"
  sx={navButtonStyle("/")}
>
  Inicio
</Button>

      {/* SERVICIOS */}
<Button
  component={NavLink}
  to="/servicios"
  sx={navButtonStyle("/servicios")}
>
  Servicios
</Button>

     {/* BOTON CITA */}
      <Button
        component={NavLink}
        to="/reservar"
        variant="contained"
        sx={{
          ml: 2,
          px: 3,
          py: 1,
          borderRadius: "14px",
          fontWeight: 800,
          textTransform: "none",
          background:
            "linear-gradient(135deg, #11c948, #0d9c38)",
          boxShadow:
            "0 8px 20px rgba(17,201,72,0.35)",

          "&:hover": {
            background:
              "linear-gradient(135deg, #0d9c38, #11c948)"
          }
        }}
      >
        Solicitar cita
      </Button>
      {/* MIS CITAS */}
<Button
  component={NavLink}
  to="/mis-citas"
  sx={navButtonStyle("/mis-citas")}
>
  Mis citas
</Button>
      {/* CONTACTO */}
<Button
  component={NavLink}
  to="/contacto"
  sx={navButtonStyle("/contacto")}
>
  Contacto
</Button>
    </Box>

  </Toolbar>
</AppBar>

);
}