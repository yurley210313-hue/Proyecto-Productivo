import { useState, useEffect } from "react";
import api from "../../services/api";
import { Container,  Table,  TableHead,  TableRow,  TableCell,  TableBody,  TextField,  MenuItem
} from "@mui/material";

const Disponibilidad = () => {

  const [fecha, setFecha] = useState("");
  const [servicio, setServicio] = useState("");
  const [servicios, setServicios] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState([]);

  useEffect(() => {

    const cargarServicios = async () => {
      const res = await api.get("/servicios");
      setServicios(res.data);
    };

    cargarServicios();

  }, []);

  useEffect(() => {

    const cargar = async () => {

      if (!fecha || !servicio) return;

      const res = await api.get("/disponibilidad-odontologos", {
        params: { fecha, servicio }
      });

      setDisponibilidad(res.data);
    };

    cargar();

  }, [fecha, servicio]);

  return (
    <Container>

      <TextField
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <TextField
        select
        label="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
      >
        {servicios.map(s => (
          <MenuItem key={s._id} value={s._id}>
            {s.nombre}
          </MenuItem>
        ))}
      </TextField>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Odontólogo</TableCell>

            {disponibilidad[0]?.horarios.map(h => (
              <TableCell key={h.hora}>
                {h.hora}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>

          {disponibilidad.map(o => (
            <TableRow key={o.odontologo._id}>

              <TableCell>
                {o.odontologo.nombre}
              </TableCell>

              {o.horarios.map(h => (
                <TableCell
                  key={h.hora}
                  style={{
                    background: h.disponible
                      ? "#a5d6a7"
                      : "#ef9a9a"
                  }}
                >
                  {h.disponible ? "✔" : "✖"}
                </TableCell>
              ))}

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </Container>
  );
};

export default Disponibilidad;