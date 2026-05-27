import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

export default function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {
    cargarDatos();

    const interval = setInterval(() => {
      cargarDatos();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cargarDatos = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Error cargando dashboard", error);
    }
  };

  const chartData = [
  { name: "Pacientes", value: data.totalPacientes || 0 },
  { name: "Citas", value: data.totalCitas || 0 },
  { name: "Servicios", value: data.totalServicios || 0 }
];

const colors = ["#1976d2", "#2e7d32", "#ebeb0d"]; // azul, verde, amarillo

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

  return (
    <div>

      <Typography variant="h5" gutterBottom>
        Dashboard Clínica Dental
      </Typography>

      {/* 🔹 TARJETAS PRINCIPALES */}
<Grid container spacing={3}>
<Grid item xs={12} md={4}>
<Card>
<CardContent>
<Typography color="textSecondary">
Pacientes registrados
</Typography>
<Typography variant="h4">
{data.totalPacientes || 0}
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} md={4}>
<Card>
<CardContent>
<Typography color="textSecondary">
Citas registradas
</Typography>
<Typography variant="h4">
{data.totalCitas || 0}
</Typography>
</CardContent>
</Card>
</Grid>

<Grid item xs={12} md={4}>
<Card>
<CardContent>
<Typography color="textSecondary">
Servicios
</Typography>
<Typography variant="h4">
{data.totalServicios || 0}
</Typography>
</CardContent>
</Card>
</Grid>
</Grid>

      {/* 🔹 GRÁFICA */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Estadísticas
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
       <BarChart data={chartData}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value">
    {chartData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={colors[index]} />
    ))}
  </Bar>
</BarChart>
      </ResponsiveContainer>

      {/* 🔹 CITAS */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Próximas Citas
      </Typography>

      <Grid container spacing={2}>
        {(data.proximas || []).map((cita, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card>
              <CardContent>
                <Typography>
                  {cita.paciente?.nombre || "Paciente no registrado"}
                </Typography>
                <Typography color="textSecondary">
                  Hora: {cita.hora}
                </Typography>
                 <Typography color="textSecondary">
  Fecha: {formatearFecha(cita.fecha)}
</Typography>
                <Typography color="textSecondary">
                  Tel: {cita.paciente?.telefono || "N/A"}
                </Typography>
                 
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔹 PACIENTES */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Pacientes Recientes
      </Typography>

      {(data.pacientesRecientes || []).map((p, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{p.nombre}</Typography>
            <Typography color="textSecondary">{p.email}</Typography>
            <Typography color="textSecondary">{p.telefono}</Typography>
          </CardContent>
        </Card>
      ))}

    </div>
  );
}