import { Box } from "@mui/material";
import AdminNavbar from "./AdminNavbar";

export default function Layout({ children }){

return(

<Box
sx={{
display: "flex",
flexDirection: "column",
minHeight: "100vh"
}}
>

<AdminNavbar/>

<Box sx={{ flexGrow: 1, p: 4 }}>
{children}
</Box>

</Box>

);
}