import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../services/api";

export default function Login(){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// 🔐 función login
const handleLogin = async () => {
  try {

    const res = await api.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    

    // redirigir
    window.location.href = "/admin/calendario";

  } catch (error) {
    alert("Error al iniciar sesión");
  }
};

return(

<Box sx={{maxWidth:400, margin:"auto", mt:5}}>

<Typography variant="h5" mb={2}>
Iniciar Sesión
</Typography>

<TextField
label="Email"
fullWidth
margin="normal"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<TextField
label="Contraseña"
type="password"
fullWidth
margin="normal"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<Button
variant="contained"
fullWidth
sx={{mt:2}}
onClick={handleLogin}
>
Ingresar
</Button>

</Box>

);
}