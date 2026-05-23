import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#0c6445",
      color: "white",
      padding: "20px"
    }}>
      <h2>Consultorio</h2>

<nav style={{display:"flex", flexDirection:"column", gap:"15px", marginTop:"30px"}}>

<Link to="/calendario" style={{color:"white"}}>Calendario</Link>
<Link to="/pacientes" style={{color:"white"}}>Pacientes</Link>
<Link to="/servicios" style={{color:"white"}}>Servicios</Link>
<Link to="/odontologos" style={{color:"white"}}>Odontólogos</Link>
<Link to="/" style={{color:"white"}}>Dashboard</Link>
</nav>
</div>
  );
}