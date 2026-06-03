import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header(){

  return(

    <AppBar position="static">

      <Toolbar>

        <Box sx={{display:"flex",alignItems:"center",flexGrow:1}}>

          <img
            src={logo}
            alt="logo"
            style={{height:40, marginRight:10}}
          />

          <Typography variant="h6">
            Consultorio Dental
          </Typography>

        </Box>

        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>

        <Button color="inherit" component={Link} to="/servicios">
          Servicios
        </Button>

        <Button color="inherit" component={Link} to="/calendario">
          Citas
        </Button>

        <Button color="inherit" component={Link} to="/pacientes">
          Pacientes
        </Button>
        <Button color="inherit" component={Link} to="/odontologos">
          Odontologos
        </Button>

      </Toolbar>

    </AppBar>

  );
}