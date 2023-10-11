import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          // fontFamily: `"Itim", "Annie Use Your Telescope", "Mali", "Grandstander", handwriting`,
          // fontWeightLight: 300,
          // fontWeightRegular: 400,
          // fontWeightMedium: 500,
          // color: "#118ab2",
        },
        // h6: { color: "#118ab2" },
      },
    },
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
