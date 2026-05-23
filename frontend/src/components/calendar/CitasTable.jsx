import {  Paper,  Typography,  Tabs,  Tab,  TextField,  Table,  TableHead,  TableRow,  TableCell,  TableBody,  Button
} from "@mui/material";

export default function CitasTable({
  citasFiltradas,   tabCitas,  setTabCitas,  busquedaCitas,  setBusquedaCitas,  editarCita,  eliminarCita

}) {

  return (

    <Paper sx={{ p: 2 }}>

      <Typography variant="h4" gutterBottom>
        Citas
      </Typography>

      <Tabs
        value={tabCitas}
        onChange={(e, newValue) =>
          setTabCitas(newValue)
        }
        sx={{ mb: 2 }}
      >

        <Tab
          label="Todas"
          sx={{
            color: "#147e87",
            fontWeight: 700
          }}
        />

        <Tab
          label="Hoy"
          sx={{
            color: "#1f44d7",
            fontWeight: 700
          }}
        />

        <Tab
          label="Próximas"
          sx={{
            color: "#2e7d32",
            fontWeight: 700
          }}
        />

        <Tab
          label="Pasadas"
          sx={{
            color: "#d32f2f",
            fontWeight: 700
          }}
        />

      </Tabs>

      <TextField
        label="Buscar cita (paciente o documento)"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={busquedaCitas}
        onChange={(e) =>
          setBusquedaCitas(e.target.value)
        }
      />

      <Paper elevation={3} sx={{ p: 2 }}>

        <Table size="small">

          <TableHead>

            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Odontólogo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>

          </TableHead>

<TableBody>

{citasFiltradas.map(c => (

<TableRow key={c._id}>
<TableCell>{c.paciente?.nombre}</TableCell>
<TableCell>{c.servicio?.nombre}</TableCell>
<TableCell>{new Date(c.fecha).toLocaleDateString()}</TableCell>
<TableCell>{c.hora}</TableCell>
<TableCell>{c.odontologo?.nombre}</TableCell>
<TableCell>

<Button
variant="outlined"
size="small"
onClick={() => editarCita(c)}
 >
 Editar
</Button>

<Button
color="error"
onClick={() =>
eliminarCita(c._id)
}
>
Eliminar
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</Paper>
</Paper>
);
}