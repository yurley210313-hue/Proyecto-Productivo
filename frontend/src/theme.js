import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    primary: {
      main: "#1976d2"   // azul médico
    },

    secondary: {
      main: "#4fc3f7"
    },

    background: {
      default: "#f4f6f8"
    }

  },

  typography: {

    fontFamily: "Roboto, Arial",

    h5: {
      fontWeight: 600
    }

  }

});

export default theme;