import { Paper, Typography, MenuItem, TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function FiltersSidebar({
  odontologos,
  odontologoFiltro,
  setOdontologoFiltro,
  fechaSeleccionada,
setFechaSeleccionada
}) {
  return (
    <Paper
      elevation={0}
sx={{
  borderRight: "1px solid #f7fbfb",
  p: 1.5,
  height: "100vh",
  overflow: "hidden",
  minWidth: "250px",
  maxWidth: "250px",
   borderRadius: 0
      }}
    >
      <Typography variant="h6" mb={2}>
        Agenda
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
 
<DateCalendar
  value={fechaSeleccionada}
  onChange={(newValue) => {

    if (!newValue) return;

    setFechaSeleccionada(newValue);
  }}

  sx={{
      
    backgroundColor: "#a2ecfa", //  color mini calendario
    borderRadius: "10px",
    p: 1,
    "& .MuiPickersCalendarHeader-root": {
      backgroundColor: "#eaedee",
      borderRadius: "8px"
    },

    width: "100%",

    "& .MuiPickersCalendarHeader-root": {
      minHeight: "32px",
      maxHeight: "32px"
    },

    "& .MuiDayCalendar-header": {
      justifyContent: "space-around"
    },

    "& .MuiPickersDay-root": {
      width: 30,
      height: 30,
      fontSize: "0.8rem",
      margin: "1px"
    },

    "& .MuiDayCalendar-weekDayLabel": {
      fontSize: "0.75rem"
    },

    "& .MuiPickersCalendarHeader-label": {
      fontSize: "0.9rem"
    }

  }}
/>
      </LocalizationProvider>

      <TextField
        select
        fullWidth
        label="Odontólogo"
        value={odontologoFiltro}
        onChange={(e) => setOdontologoFiltro(e.target.value)}
        sx={{
    mt: 1.5,
    backgroundColor: "#a5f5c1", 
    borderRadius: "8px"
      }}
>

        <MenuItem value="">
          Todos
        </MenuItem>

        {(odontologos || []).map((o) => (
          <MenuItem key={o._id} value={o._id}>
            {o.nombre}
          </MenuItem>
        ))}
      </TextField>
      <Button
  variant="outlined"
  fullWidth
 sx={{
  mt: 1.5,
  py: 0.7,
  fontSize: "0.8rem",
  backgroundColor: "#e4dae3"
}}
  onClick={() => setFechaSeleccionada(null)}
>
  Ver semana completa
</Button>
    </Paper>
  );
}