import {  Box,  Button,  Chip,  Dialog,  DialogContent,  DialogTitle,  TextField,  Typography,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function Mensajes() {

  const [mensajes, setMensajes] = useState([]);

  const [open, setOpen] = useState(false);

  const [mensajeSeleccionado, setMensajeSeleccionado] =
    useState(null);

  const [respuesta, setRespuesta] = useState("");

  const obtenerMensajes = async () => {

    try {

const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5000/api/contacto",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      const data = await response.json();

      setMensajes(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    obtenerMensajes();

  }, []);

  const abrirDetalle = (mensaje) => {

    setMensajeSeleccionado(mensaje);

    setOpen(true);

  };

  const responderMensaje = async () => {

    try {

const token = localStorage.getItem("token");

await fetch(
  `http://localhost:5000/api/contacto/responder/${mensajeSeleccionado._id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      respuesta,
    }),
  }
);

      alert("Respuesta enviada");

      setOpen(false);

      obtenerMensajes();

    } catch (error) {

      console.log(error);

    }

  };

  const columnas = [
    {
      field: "tipo",
      headerName: "Tipo",
      width: 140,
    },

    {
      field: "nombre",
      headerName: "Nombre",
      width: 180,
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 160,

renderCell: (params) => {

  let color = "default";

  switch (params.value) {

    case "Pendiente":
      color = "warning";
      break;

    case "Respondido":
      color = "info";
      break;

    case "Cerrado":
      color = "success";
      break;

    default:
      color = "default";
  }

  return (
    <Chip
      label={params.value}
      color={color}
    />
  );
}
    },

    {
      field: "acciones",
      headerName: "Acciones",
      width: 180,

      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => abrirDetalle(params.row)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (

    <Box sx={{ height: 600, width: "100%" }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Mensajes PQRS
      </Typography>

      <DataGrid
        rows={mensajes}
        columns={columnas}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 20]}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Detalle del mensaje
        </DialogTitle>

        <DialogContent>

          {mensajeSeleccionado && (

            <>

              <Typography>
                <strong>Nombre:</strong>
                {mensajeSeleccionado.nombre}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Mensaje:</strong>
                {mensajeSeleccionado.mensaje}
              </Typography>

              {mensajeSeleccionado.archivo && (

                <Button
                  sx={{ mt: 2 }}
                  href={`http://localhost:5000/uploads/${mensajeSeleccionado.archivo}`}
                  target="_blank"
                >
                  Ver archivo
                </Button>

              )}

              <TextField
                fullWidth
                multiline
                rows={5}
                label="Respuesta"
                value={respuesta}
                onChange={(e) =>
                  setRespuesta(e.target.value)
                }
                sx={{ mt: 3 }}
              />

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={responderMensaje}
              >
                Enviar respuesta
              </Button>

            </>

          )}

        </DialogContent>

      </Dialog>

    </Box>

  );

}
