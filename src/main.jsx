// import './reset.css'
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./components/contexts/Contexts";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import App from "./App.jsx";
import { lightTheme } from "../themes";

let theme = createTheme();
theme = responsiveFontSizes(lightTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <ContextProvider>
            <CssBaseline />
            <App />
          </ContextProvider>
        </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
