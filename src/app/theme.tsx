"use client";
import { Work_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const resolvedTailwingConfig = resolveConfig(tailwindConfig);

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
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontWeight: resolvedTailwingConfig.theme.fontWeight.semibold,
          fontSize: resolvedTailwingConfig.theme.fontSize.xl[0],
          textTransform: "none",
          ...(ownerState.variant === "text" && {
            "&.MuiButton-root:hover": {
              backgroundColor: "transparent",
            },
          }),
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          color: resolvedTailwingConfig.theme.colors.slate[500],
          fontSize: resolvedTailwingConfig.theme.fontSize.xs[0],
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        className: "border  valid:text-white invalid:border-fuchsia-400",
      },
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

export default function GetCatsFastThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
