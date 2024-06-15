"use client";
import { Work_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const workSans = Work_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: workSans.style.fontFamily,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-notchedOutline": {
            top: 0,
            legend: {
              display: "none",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "none",
          left: "auto",
          top: "auto",
          position: "relative",
          marginBottom: "8px",
          ".MuiOutlinedInput-notchedOutline": {
            display: "none",
          },
        },
      },
      defaultProps: {
        shrink: true,
      },
    },
  },
});

export default function GetCatsFastThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
