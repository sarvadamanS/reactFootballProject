// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#804A00", // Change this to your desired primary color
    },
    secondary: {
      main: "#5085D0", // Change this to your desired secondary color
    },
    danger: {
      main: "#C11B17",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        backgroundColor: "red",
      },
    },
  },
});

export default theme;
