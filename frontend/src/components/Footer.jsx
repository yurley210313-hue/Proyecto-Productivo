import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { Phone, Email, LocationOn, AccessTime, Facebook, Instagram, WhatsApp } from "@mui/icons-material";

export default function Footer() {

return(

<footer style={{background:"#0f172a", color:"white", padding:"25px 0", marginTop:"40px"}}>

<Container>

<Grid container spacing={2}>

{/* Columna 1 */}
<Grid item xs={12} md={4}>

<Typography variant="h6" sx={{ mb: 1 }}>
🦷 Consultorio Morales
</Typography>

<Typography variant="body2" sx={{ lineHeight: 1.6, mb: 2 }}>
Tu salud dental es nuestra prioridad. Ofrecemos servicios odontológicos 
de calidad con tecnología de vanguardia.
</Typography>

{/* Redes sociales */}
<Box>

<IconButton sx={{ color: "white", "&:hover": { color: "#1e88e5" } }}>
<Facebook />
</IconButton>

<IconButton sx={{ color: "white", "&:hover": { color: "#E1306C" } }}>
<Instagram />
</IconButton>

<IconButton sx={{ color: "white", "&:hover": { color: "#25D366" } }}>
<WhatsApp />
</IconButton>

</Box>

</Grid>

{/* Columna 2 */}
<Grid item xs={12} md={4}>

<Typography variant="h6" sx={{ mb: 1 }}>
Contacto
</Typography>

<Typography sx={{
display:"flex",
alignItems:"center",
mb: 0.5,
cursor:"pointer",
"&:hover": { color:"#1e88e5" }
}}>
<Phone sx={{mr:1, fontSize:20}}/>
+57 3005523178
</Typography>

<Typography sx={{
display:"flex",
alignItems:"center",
mb: 0.5,
cursor:"pointer",
"&:hover": { color:"#1e88e5" }
}}>
<Email sx={{mr:1, fontSize:20}}/>
consultoriomorales@gmail.com
</Typography>

<Typography sx={{
display:"flex",
alignItems:"center",
cursor:"pointer",
"&:hover": { color:"#1e88e5" }
}}>
<LocationOn sx={{mr:1, fontSize:20}}/>
Carrera 10 N. 12-13, Lebrija, Santander
</Typography>

</Grid>

{/* Columna 3 */}
<Grid item xs={12} md={4}>

<Typography variant="h6" sx={{ mb: 1 }}>
Horario
</Typography>

<Typography sx={{ display:"flex", alignItems:"center", mb: 0.5 }}>
<AccessTime sx={{mr:1, fontSize:20}}/>
Lunes - Viernes: 8:00 am - 12:00 m / 2:00 pm - 5:00 pm
</Typography>

<Typography>
Sábados y Domingos: 8:00 - 12:00
</Typography>

</Grid>

</Grid>

<Typography
variant="body2"
sx={{
textAlign:"center",
mt:2,
pt:1,
borderTop:"1px solid #334155"
}}
>
© 2026 Consultorio Odontológico Morales. Todos los derechos reservados.
</Typography>

</Container>

</footer>

);
}