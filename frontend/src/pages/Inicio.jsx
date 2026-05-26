import {  Container,  Typography,  Button,  Box} from "@mui/material";
import { Link } from "react-router-dom";
import clinica from "../assets/clinica.png";

export default function Inicio() {
  return (
    <Box
      sx={{
        background: "#f7f9fc",
        minHeight: "100vh",
        py: 8
      }}
    >
      <Container maxWidth="lg">

        {/* HERO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexDirection: {
              xs: "column",
              md: "row"
            }
          }}
        >

          {/* TEXTO */}
          <Box flex={1}>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#021b4d",
                mb: 3,
                lineHeight: 1.2
              }}
            >
              TU SONRISA PERFECTA NOS IMPORTA
            </Typography>

            <Typography
              sx={{
                color: "#5b657a",
                fontSize: "18px",
                lineHeight: 1.8,
                mb: 4
              }}
            >
              En nuestro consultorio odontológico brindamos atención
              profesional, cálida y personalizada para cuidar tu salud oral
              y devolverte la confianza en tu sonrisa.
            </Typography>

            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/reservar"
              sx={{
                backgroundColor: "#1f978d",
                borderRadius: "14px",
                px: 5,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 700,
                boxShadow: 4,
                "&:hover": {
                  backgroundColor: "#146c65"
                }
              }}
            >
              Solicitar Cita
            </Button>
          </Box>

          {/* IMAGEN */}
          <Box flex={1}>
            <Box
              component="img"
              src={clinica}
              alt="Consultorio dental"
              sx={{
                width: "100%",
                borderRadius: "24px",
                boxShadow: 6
              }}
            />
          </Box>
        </Box>

        {/* SECCIÓN INFORMACIÓN */}
        <Box
          sx={{
            mt: 10,
            background: "#fff",
            borderRadius: "24px",
            p: {
              xs: 4,
              md: 6
            },
            boxShadow: 2
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#021b4d",
              mb: 3
            }}
          >
            Más de 20 años cuidando tu sonrisa
          </Typography>

          <Typography
            sx={{
              color: "#5b657a",
              lineHeight: 1.9,
              mb: 3
            }}
          >
            El Consultorio Odontológico Morales nace con la misión de brindar
            atención dental de calidad a toda la familia. Nuestro equipo de
            profesionales está comprometido con tu bienestar y confort.
          </Typography>

          <Typography
            sx={{
              color: "#5b657a",
              lineHeight: 1.9,
              mb: 4
            }}
          >
            Utilizamos las técnicas más avanzadas y materiales de primera
            calidad para garantizar resultados excepcionales en cada
            tratamiento.
          </Typography>

          {/* BENEFICIOS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >

            <Typography sx={{ color: "#021b4d" }}>
              ✅ Garantía en todos nuestros tratamientos
            </Typography>

            <Typography sx={{ color: "#021b4d" }}>
              ✅ Instalaciones modernas y confortables
            </Typography>

            <Typography sx={{ color: "#021b4d" }}>
              ✅ Protocolos de higiene y esterilización rigurosos
            </Typography>

            <Typography sx={{ color: "#021b4d" }}>
              ✅ Facilidades de pago
            </Typography>

          </Box>
        </Box>

      </Container>
    </Box>
  );
}

