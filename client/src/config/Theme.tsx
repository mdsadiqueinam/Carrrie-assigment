import { PropsWithChildren } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const borderRadius = "10px";

let theme = createTheme({
  typography: {
    fontFamily: "Lexend Deca",
    body1: {
      fontSize: "16px",
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#20DF7F",
    },
    background: {
      default: "#224957",
      paper: "#224957",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h2: {
      fontWeight: "normal",
      lineHeight: "80px",
      fontSize: "64px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius,
          boxShadow: "0 8px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
        },
      },
    },
  },
});

export default function CustomTheme(props: PropsWithChildren<any>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
