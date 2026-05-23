import { useState,useEffect } from "react";
import api from "../services/api";

export default function FormularioCita(){

  const [pacientes,setPacientes] = useState([]);
  const [servicios,setServicios] = useState([]);
  const [odontologos,setOdontologos] = useState([]);

  const [form,setForm] = useState({
    paciente:"",
    servicio:"",
    odontologo:"",
    fecha:"",
    hora:""
  });

  useEffect(()=>{
    cargarDatos();
  },[]);

  const cargarDatos = async()=>{

    const p = await api.get("/pacientes");
    const s = await api.get("/servicios");
    const o = await api.get("/odontologos");

    setPacientes(p.data);
    setServicios(s.data);
    setOdontologos(o.data);

  };

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const crearCita = async(e)=>{

    e.preventDefault();

    await api.post("/citas",form);

    alert("Cita creada");

  };

  return(

    <form onSubmit={crearCita}>

      <h2>Nueva Cita</h2>

      <select name="paciente" onChange={handleChange}>
        <option>Paciente</option>
        {pacientes.map(p=>(
          <option key={p._id} value={p._id}>{p.nombre}</option>
        ))}
      </select>

      <select name="servicio" onChange={handleChange}>
        <option>Servicio</option>
        {servicios.map(s=>(
          <option key={s._id} value={s._id}>{s.nombre}</option>
        ))}
      </select>

      <select name="odontologo" onChange={handleChange}>
        <option>Odontólogo</option>
        {odontologos.map(o=>(
          <option key={o._id} value={o._id}>{o.nombre}</option>
        ))}
      </select>

      <input type="date" name="fecha" onChange={handleChange}/>

      <input type="time" name="hora" onChange={handleChange}/>

      <button type="submit">Crear cita</button>

    </form>

  );
}