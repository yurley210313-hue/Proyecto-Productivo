import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Calendario from "./pages/admin/Calendario";
import ServiciosAdmin from "./pages/admin/servicios";
import Pacientes from "./pages/admin/Pacientes";
import Odontologos from "./pages/admin/Odontologos";
import Mensajes from "./pages/admin/Mensajes";
import Dashboard from "./pages/admin/Dashboard";

import MisCitas from "./pages/MisCitas";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import ReservarCita from "./pages/ReservarCita";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";

export default function App(){

return(

<BrowserRouter>

<Box
sx={{
display: "flex",
flexDirection: "column",
minHeight: "100vh"
}}
>

{/* 👤 NAVBAR CLIENTE */}
<Navbar/>

<Box sx={{ flexGrow: 1 }}>

<Routes>

{/* 🌐 PÚBLICO */}
<Route path="/" element={<Inicio/>}/>
<Route path="/servicios" element={<Servicios/>}/>
<Route path="/contacto" element={<Contacto/>}/>
<Route path="/reservar" element={<ReservarCita/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/mis-citas" element={<MisCitas />} />

{/* 🔐 ADMIN */}
<Route path="/admin/dashboard" element={ <ProtectedRoute> <Layout><Dashboard/></Layout> </ProtectedRoute>}/>
<Route path="/admin/pacientes" element={ <ProtectedRoute> <Layout><Pacientes/></Layout> </ProtectedRoute>}/>
<Route path="/admin/servicios" element={ <ProtectedRoute> <Layout><ServiciosAdmin/></Layout> </ProtectedRoute>}/>
<Route path="/admin/calendario" element={ <ProtectedRoute> <Layout><Calendario/></Layout> </ProtectedRoute>}/>
<Route path="/admin/odontologos" element={ <ProtectedRoute> <Layout><Odontologos /></Layout> </ProtectedRoute>}/>
<Route path="/admin/mensajes" element={  <ProtectedRoute>  <Layout> <Mensajes /> </Layout> </ProtectedRoute>}/>
</Routes>

</Box>

{/* 👣 FOOTER SOLO CLIENTE */}
<Footer/>

</Box>

</BrowserRouter>

);
}