import { createTheme } from "@mui/material/styles";



export const lightTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          // fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          // fontFamily: `"Itim", "Annie Use Your Telescope", "Mali", "Grandstander", handwriting`,
          // fontWeightLight: 300,
          // fontWeightRegular: 400,
          // fontWeightMedium: 500,
          // color: "#118ab2",
          // fontSize: "large",
        },
        // h6: { color: "#118ab2" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: "10px",
          // fontFamily: `"Grandstander", handwriting`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: "10px",
          // backgroundColor: "#f0ece2",
        },
      },
    },
  },
});
