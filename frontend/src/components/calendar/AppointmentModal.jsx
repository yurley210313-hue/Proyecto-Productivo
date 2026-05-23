import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Box,  TextField,  MenuItem
} from "@mui/material";

export default function AppointmentModal({  open,  onClose,  editando,  guardarCita,  form,  handleChange,  pacientes,  servicios,
  todosHorarios,  odontologosFiltrados,  setSeleccionManual, odontologoSugerido, setForm
}) {

  return (
<Dialog
open={open}
onClose={onClose}
fullWidth
maxWidth="md"
    >

<DialogTitle>
{editando
? "Editar cita"
: "Nueva cita"}
</DialogTitle>

<DialogContent>

<Box
          component="form"
          onSubmit={guardarCita}
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr"
            },
            mt: 1
          }}
        >

      {/* PACIENTE */}
             
              <TextField
      select   
      label="Paciente"   
      name="paciente"
      margin="normal"   
      value={form.paciente}   
      onChange={handleChange}   
      required
      >
        <MenuItem value="nuevo">+ Nuevo paciente</MenuItem>
      {pacientes.map(p => (
      <MenuItem key={p._id} value={p._id}>
      {p.nombre}
      </MenuItem>
      ))}
      </TextField>
      {form.esNuevoPaciente && (
        <>
      
      <TextField
      label="Nombre"       
      name="nombre"
      margin="normal"       
      value={form.nombre}       
      onChange={handleChange}       
      required
          />
      
      <TextField       
      label="Documento"       
      name="documento"
      margin="normal"      
      value={form.documento}      
      onChange={handleChange}      
      required
          />
      
<TextField
type="date"
fullWidth
label="Fecha de nacimiento"
name="fechaNacimiento"
margin="normal"
value={form.fechaNacimiento}
onChange={handleChange}
InputLabelProps={{ shrink: true }}
inputProps={{
max: new Date().toISOString().split("T")[0]
        }}
      />
<TextField       
label="Teléfono"       
name="telefono"
margin="normal"      
value={form.telefono}      
onChange={handleChange}      
required
      />
      
      <TextField      
        label="Email"      
        name="email"
        margin="normal"      
        value={form.email}      
        onChange={handleChange}      
        required
      />
      
      </>
      )}
      
      
      {/* SERVICIO */}
      <TextField 
      select   
      label="Servicio"   
      name="servicio"
      margin="normal"  
      value={form.servicio}  
      onChange={handleChange}  
      required
      >
        {servicios.map(s => (
          <MenuItem key={s._id} value={s._id}>       
          {s.nombre}    </MenuItem>
        ))}
      </TextField>
      
      {/* odontologo*/}
      
      <TextField
      select   
      label="Odontólogo"   
      name="odontologo" 
      margin="normal"  
      value={form.odontologo || ""}   
      onChange={(e) => {
      
          const value = e.target.value;
      
          // primero bloquear autoasignación
          setSeleccionManual(true);
      
          // luego actualizar form correctamente
          setForm(prev => ({
            ...prev,
            odontologo: value
          }));
        }}
      >
          <MenuItem value="">
    {odontologoSugerido
      ? `Sugerido: ${odontologoSugerido.nombre}`
      : "Asignación automática"}
  </MenuItem>
        {odontologosFiltrados.map(o => ( 
          <MenuItem key={o._id} 
          value={o._id}>       
          {o.nombre} - {o.especialidades?.length} especialidades    
          </MenuItem>
        ))}
      </TextField>
      
              {/* FECHA */}
      <TextField
      type="date"   
      name="fecha" 
      margin="normal"  
      value={form.fecha}   
      onChange={handleChange}  
      required  
      inputProps={{     min: new Date().toISOString().split("T")[0]
      
        }}
      />
      
      {/* HORA */}
      <TextField
        select
        label="Hora"
        name="hora"
        margin="normal"
        value={form.hora}
        onChange={handleChange}
        required
      >
        {todosHorarios.map((hora) => (
          <MenuItem
            key={hora}
            value={hora}
            sx={{
              color: "#2e7d32",
              fontWeight: 600
            }}
          >
            {hora}
          </MenuItem>
        ))}
      </TextField>

<DialogActions sx={{ gridColumn: "1 / -1" }}>

      <Button onClick={onClose}>
        Cancelar
      </Button>

      <Button
        variant="contained"
        type="submit"
      >
        {editando ? "Actualizar" : "Crear"}
      </Button>

    </DialogActions>

  </Box>

</DialogContent>
</Dialog>
  );
}