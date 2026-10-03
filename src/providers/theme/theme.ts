"use client";

import { createTheme } from "@mui/material/styles";
import { COLORS } from "@/styles/colors";

const headingFont = "var(--font-jakarta), var(--font-inter), sans-serif";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primary[600],
      dark: COLORS.primary[800],
      light: COLORS.primary[500],
      contrastText: COLORS.white,
    },
    secondary: { main: COLORS.primary[500] },
    success: { main: COLORS.accent.green, light: COLORS.accent.greenLight },
    warning: { main: COLORS.accent.orange, light: COLORS.accent.orangeLight },
    error: { main: COLORS.accent.red, light: COLORS.accent.redLight },
    background: { default: COLORS.gray[50], paper: COLORS.white },
    text: { primary: COLORS.gray[900], secondary: COLORS.gray[500] },
    divider: COLORS.gray[200],
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: { fontFamily: headingFont, fontWeight: 600, fontSize: "2rem", letterSpacing: "-0.02em" },
    h2: { fontFamily: headingFont, fontWeight: 600, fontSize: "1.75rem", letterSpacing: "-0.02em" },
    h3: { fontFamily: headingFont, fontWeight: 600, fontSize: "1.375rem", letterSpacing: "-0.01em" },
    h4: { fontFamily: headingFont, fontWeight: 600, fontSize: "1.125rem" },
    h5: { fontFamily: headingFont, fontWeight: 600, fontSize: "1rem" },
    h6: { fontFamily: headingFont, fontWeight: 600, fontSize: "0.875rem" },
    overline: { fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.06em", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
        outlined: {
          borderColor: COLORS.gray[200],
          color: COLORS.gray[900],
          backgroundColor: COLORS.white,
          "&:hover": { borderColor: COLORS.gray[300], backgroundColor: COLORS.gray[50] },
        },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${COLORS.gray[200]}`,
          boxShadow: "0 1px 3px rgba(17, 24, 39, 0.05)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.gray[200] },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.gray[300] },
        },
        input: { fontSize: "0.875rem" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 6 },
        sizeSmall: { fontSize: "0.6875rem", height: 22 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "uppercase", fontWeight: 600, fontSize: "0.8125rem", minHeight: 44 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: COLORS.gray[200], fontSize: "0.875rem" },
        head: { color: COLORS.gray[600], fontWeight: 600, backgroundColor: COLORS.gray[50] },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 8, borderRadius: 8, backgroundColor: COLORS.gray[200] },
        bar: { borderRadius: 8 },
      },
    },
  },
});
