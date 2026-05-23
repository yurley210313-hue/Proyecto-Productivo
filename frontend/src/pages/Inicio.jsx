import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import clinica from "../assets/clinica.png";
import { Box } from "@mui/material";
export default function Inicio(){

return(
<>

<Container sx={{textAlign:"center", mt:10}}>

<Typography 
  variant="h4"
  sx={{
    color: "#03065e",
    fontWeight: 800,
    textAlign: "center",
    mb: 4
  }}
>
    
TU SONRISA PERFECTA NOS IMPORTA
</Typography>



{/* 🖼️ IMAGEN IZQUIERDA */}
<img
src={clinica}
alt="Consultorio dental"
style={{
width:"100%",
maxWidth:"1000px",
borderRadius:"20px",
marginBottom:"30px"
}}
/>


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



</>
);
}

