import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: { main: "#6655d9" },
    secondary: { main: "#ec6393" },
  },
  shape: { borderRadius: 14 },
  components: { MuiCard: { styleOverrides: { root: { borderRadius: 18 } } }, MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 700 } } } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
