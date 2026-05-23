import {  Drawer,  Typography,  Box,  Divider,  Button
} from "@mui/material";

export default function AppointmentDrawer({
  cita,  onClose,  onEdit,  onDelete
}) {

  return (
    <Drawer
      anchor="right"
      open={!!cita}
      onClose={onClose}
    >

      <Box sx={{ width: 380, p: 3 }}>

        <Typography variant="h5">
          {cita?.paciente?.nombre}
        </Typography>

        <Typography>
          {cita?.servicio?.nombre}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography>
          Odontólogo:
          {cita?.odontologo?.nombre}
        </Typography>

        <Typography>
          Hora:
          {cita?.hora}
        </Typography>

        <Typography>
          Teléfono:
          {cita?.paciente?.telefono}
        </Typography>

        <Typography>
          Email:
          {cita?.paciente?.email}
        </Typography>

        <Box sx={{ mt: 3 }}>

          <Button
            variant="contained"
            fullWidth
            onClick={() => onEdit(cita)}
          >
            Editar
          </Button>

          <Button
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => onDelete(cita._id)}
          >
            Eliminar
          </Button>

        </Box>

      </Box>

    </Drawer>
  );
}