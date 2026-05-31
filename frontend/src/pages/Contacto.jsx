import {  Container,  Grid,  Typography,  Card,  CardContent,  TextField,  Button,  Box,  CardMedia} from "@mui/material";
import { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MenuItem } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Contacto() {

// ESTADOS

const [formulario, setFormulario] = useState({
tipo: "",
nombre: "",
documento: "",
telefono: "",
email: "",
mensaje: "",
fechaIncidente: "",
descripcionIncidente: "",
archivo: null,
});

// FUNCIONES

//Actualizar Campos
const handleChange = (e) => {
  setFormulario({
    ...formulario,
    [e.target.name]: e.target.value,
  });
};

//Enviar

const handleSubmit = async () => {

  if (!formulario.nombre) {
  alert("Nombre obligatorio");
  return;
}

if (!formulario.email) {
  alert("Email obligatorio");
  return;
}

if (!formulario.tipo) {
  alert("Seleccione tipo");
  return;
}

  try {

    const formData = new FormData();

    Object.keys(formulario).forEach((key) => {

      formData.append(
        key,
        formulario[key]
      );

    });

    const response = await fetch(
      "http://localhost:5000/api/contacto",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    alert(data.message);

    setFormulario({
      tipo: "",
      nombre: "",
      documento: "",
      telefono: "",
      email: "",
      mensaje: "",
      fechaIncidente: "",
      descripcionIncidente: "",
      archivo: null,
    });

  } catch (error) {

    console.log(error);

  }

};

  return (

    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        mt: 6,
        mb: 8,
        py: 4,
        borderRadius: 4
      }}
    >
   
<Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 2,
          color: "#1e293b",
        }}
      >
        Contacto
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mb: 6,
          color: "text.secondary",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Será atendido lo antes posible.
      </Typography>

      <Grid container spacing={4}>

        {/* Información */}

        <Grid item size={{ xs: 12, md: 4 }}>

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              height: "100%",
              transition: "0.3s",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
              },
            }}
          >

            <CardContent sx={{ p: 4 }}>

              <Typography variant="h6" sx={{ mb: 3 }}>
                Información de contacto
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <PhoneIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography>
                  +57 3005523178
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography>
                  consultoriomorales@gmail.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography>
                  Carrera 10 N.12-13
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                <AccessTimeIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography fontWeight="bold">
                  Horario
                </Typography>
              </Box>

              <Typography sx={{ mt: 1 }}>
                Lunes - Viernes: 8:00 - 12:00 / 2:00 - 5:00
              </Typography>

              <Typography>
                Sábado y Domingo: 8:00 - 12:00
              </Typography>

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{
                  mt: 4,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1.2,
                }}
              >
                En caso de urgencia llamar
              </Button>

            </CardContent>

          </Card>

        </Grid>

        {/* Formulario */}

        <Grid item size={{ xs: 12, md: 8 }}>

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >

            <CardContent sx={{ p: 4 }}>

              <Typography variant="h6" gutterBottom>
                Envíanos un mensaje
              </Typography>

              <Grid container spacing={2}>

<Grid item xs={12} md={6}>

<TextField
  select
  fullWidth
  label="Tipo de solicitud"
  name="tipo"
  value={formulario.tipo}
  onChange={handleChange}
  variant="outlined"
  sx={{
    minWidth: 220,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#ccf7f0",
    },
  }}
>
  <MenuItem value="">
    Seleccione
  </MenuItem>

<MenuItem value="Consulta"> Consulta </MenuItem>
<MenuItem value="Sugerencia"> Sugerencia </MenuItem>
<MenuItem value="Queja"> Queja </MenuItem>
<MenuItem value="Reclamo"> Reclamo </MenuItem>
</TextField>
  
  </Grid>

<Grid item xs={12} md={6}>

  <TextField
    fullWidth
    name="nombre"
    value={formulario.nombre}
    onChange={handleChange}
    label="Nombre"
    variant="outlined"
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        backgroundColor: "#ccf7f0",
      },
    }}
  />

</Grid>

<Grid item xs={12} md={6}>
<TextField
fullWidth
name="documento"                   
value={formulario.documento}
onChange={handleChange}
label="Documento"
variant="outlined"
sx={{
"& .MuiOutlinedInput-root": {
borderRadius: 3,
backgroundColor: "#ccf7f0",
},
}}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
fullWidth
name="telefono"
value={formulario.telefono}
onChange={handleChange}
label="Telefono"
variant="outlined"
sx={{
"& .MuiOutlinedInput-root": {
borderRadius: 3,
backgroundColor: "#ccf7f0",
},
}}
/>
</Grid>

<Grid item xs={12} md={6}>
<TextField
fullWidth
name="email"
value={formulario.email}
onChange={handleChange}
label="Email"
variant="outlined"
sx={{
"& .MuiOutlinedInput-root": {
borderRadius: 3,
backgroundColor: "#ccf7f0",
},
}}
/>
</Grid>

<Grid  item xs={12} md={6}>
<TextField
fullWidth
multiline
rows={4}
name="mensaje"
value={formulario.mensaje}
onChange={handleChange}
label="Mensaje"
variant="outlined"
sx={{
"& .MuiOutlinedInput-root": {
borderRadius: 3,
backgroundColor: "#ccf7f0",
},
}}
/>
</Grid>
{formulario.tipo === "Reclamo" && (
<>

<Grid item xs={12} md={6}>
   
<TextField
  fullWidth
  type="date"
  label="Fecha incidente"
  name="fechaIncidente"
  value={formulario.fechaIncidente}
  onChange={handleChange}
  InputLabelProps={{
    shrink: true,
  }}
/>
</Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Descripción del incidente"
        name="descripcionIncidente"
        value={formulario.descripcionIncidente}
        onChange={handleChange}
      />

    </Grid>

  </>

)}
<Grid item xs={12}>

<Button
  variant="outlined"
  component="label"
  sx={{ borderRadius: 3 }}
>
  Seleccionar archivo

  <input
    hidden
    type="file"
    onChange={(e) =>
      setFormulario({
        ...formulario,
        archivo: e.target.files[0],
      })
    }
  />
</Button>

</Grid> 

<Grid item xs={12} md={4}>
<Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "none",
                    }}
                  >
                    Enviar mensaje
                  </Button>

                </Grid>
</Grid>
              </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Container>

  );

}