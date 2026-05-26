import { useState, useEffect} from "react";
import api from "../services/api";
import {Dialog, DialogTitle, DialogContent, DialogActions,  Container,  TextField,  Button,  Typography, MenuItem, Card,  CardContent,  Box } from "@mui/material";

export default function MisCitas() {

const [documento, setDocumento] = useState("");
const [citas, setCitas] = useState([]);
const [open, setOpen] = useState(false);
const [citaSeleccionada, setCitaSeleccionada] = useState(null);
const [fecha, setFecha] = useState("");
const [hora, setHora] = useState("");
const [loading, setLoading] = useState(false);
const [horariosDisponibles, setHorariosDisponibles] = useState([]);
const [todosHorarios, setTodosHorarios] = useState([]);

useEffect(() => {
  const cargarHorarios = async () => {
    if (!fecha || !citaSeleccionada?.servicio?._id) return;

    try {
      const res = await api.get(
        `/citas/disponibilidad?fecha=${fecha}&servicio=${citaSeleccionada.servicio._id}`
      );

      setHorariosDisponibles(res.data.disponibles || []);
      setTodosHorarios(res.data.todos || []);

    } catch (error) {
      console.log(error);
    }
  };

  cargarHorarios();
}, [fecha, citaSeleccionada]);

const buscar = async () => {

    try {

      const res = await api.get(
        `/citas/buscar?documento=${documento}`
      );

      setCitas(res.data);

    } catch (error) {

      alert("No se encontraron citas");

    }
  };

  const cancelar = async (id) => {

    const confirmar = window.confirm(
      "¿Deseas cancelar esta cita?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/citas/${id}`);

      setCitas(citas.filter(c => c._id !== id));

      alert("Cita cancelada");

    } catch (error) {

      alert("Error al cancelar");

    }
  };

  const abrirModal = (cita) => {

  setCitaSeleccionada(cita);
  setFecha(cita.fecha?.split("T")[0] || "");
  setHora(cita.hora || "");
  setHorariosDisponibles([]);
  setTodosHorarios([]);
  setOpen(true);
};

const reprogramar = async () => {

  if (!fecha || !hora) {
    alert("Completa todos los campos");
    return;
  }

  try {
    setLoading(true);

    const res = await api.put(`/citas/${citaSeleccionada._id}`, {
      fecha,
      hora
    });

    // actualizar UI sin recargar
    setCitas((prev) =>
      prev.map((c) =>
        c._id === citaSeleccionada._id ? res.data : c
      )
    );

    setOpen(false);
    alert("Cita reprogramada correctamente");

  } catch (error) {
    alert(error.response?.data?.message || "Error al reprogramar");
  } finally {
    setLoading(false);
  }
};

  return (

    <Container maxWidth="md" sx={{ py: 6 }}>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center"
        }}
      >
        Consultar mis citas
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4
        }}
      >

        <TextField
          fullWidth
          label="Documento"
          value={documento}
          onChange={(e) =>
            setDocumento(e.target.value)
          }
        />

        <Button
          variant="contained"
          onClick={buscar}
        >
          Buscar
        </Button>

      </Box>

      {citas.map((cita) => (

        <Card
          key={cita._id}
          sx={{
            mb: 3,
            borderRadius: "16px",
            boxShadow: 4
          }}
        >

          <CardContent>

            <Typography>
              <strong>Fecha:</strong>{" "}
              {new Date(cita.fecha)
                .toLocaleDateString()}
            </Typography>

            <Typography>
              <strong>Hora:</strong> {cita.hora}
            </Typography>

            <Typography>
              <strong>Servicio:</strong>{" "}
              {cita.servicio?.nombre}
            </Typography>

            <Typography>
              <strong>Odontólogo:</strong>{" "}
              {cita.odontologo?.nombre}
            </Typography>

            <Button
              color="error"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => cancelar(cita._id)}
            >
              Cancelar cita
            </Button>
<Button
  variant="contained"
  color="warning"
  sx={{ mt: 2, ml: 2 }}
  onClick={() => abrirModal(cita)}
>
  Reprogramar
</Button>
          </CardContent>

        </Card>

      ))}
<Dialog open={open} onClose={() => setOpen(false)}>

  <DialogTitle>
    Reprogramar cita
  </DialogTitle>

  <DialogContent>

    <TextField
      fullWidth
      margin="normal"
      type="date"
      label="Nueva fecha"
      InputLabelProps={{ shrink: true }}
      value={fecha}
      inputProps={{
        min: new Date().toISOString().split("T")[0]
      }}
      onChange={(e) => setFecha(e.target.value)}
    />
<TextField
  select
  fullWidth
  label="Hora"
  value={hora}
  onChange={(e) => setHora(e.target.value)}
  disabled={!fecha}
>
  <MenuItem value="">
    Selecciona una hora
  </MenuItem>

  {todosHorarios.length === 0 && fecha && (
    <MenuItem disabled>
      No hay horarios disponibles
    </MenuItem>
  )}

  {todosHorarios.map((h) => {
    const disponible = horariosDisponibles.includes(h);

    return (
      <MenuItem
        key={h}
        value={h}
        disabled={!disponible}
      >
        {h} {!disponible && " - Ocupado"}
      </MenuItem>
    );
  })}
</TextField>

  </DialogContent>

  <DialogActions>

    <Button onClick={() => setOpen(false)}>
      Cancelar
    </Button>

    <Button
      variant="contained"
      disabled={loading}
      onClick={reprogramar}
    >
      {loading ? "Guardando..." : "Guardar"}
    </Button>

  </DialogActions>

</Dialog>
    </Container>
  );
}