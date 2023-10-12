import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: ["Poppins"]
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 50,
          minWidth: 50,
          p: 1,
        },
      },
    },
  },
});
