/**
 * Identidade visual Fundamenta (Figma "FUNDAMENTA", node 288:390).
 * Paleta oficial: #14231F (verde-escuro), #16A878 (verde), #B8F36B (lima), #F3F7F4 (gelo).
 */
export const BRAND = {
  dark: "#14231F",
  green: "#16A878",
  lime: "#B8F36B",
  light: "#F3F7F4",
} as const;

export const COLORS = {
  primary: {
    950: "#0C1613",
    900: BRAND.dark,
    800: "#1B3A30",
    700: "#0D6E50",
    // Tom um pouco mais escuro que o verde da marca para manter contraste de texto branco/sobre branco
    600: "#0F8A62",
    500: BRAND.green,
    100: "#D3F1E3",
    50: "#EAF7F0",
  },
  accent: {
    green: BRAND.green,
    greenDark: "#0B7552",
    greenLight: "#DDF5E9",
    lime: BRAND.lime,
    limeDark: "#7DB632",
    orange: "#F59E0B",
    orangeDark: "#B45309",
    orangeLight: "#FEF3C7",
    red: "#EF4444",
    redDark: "#B91C1C",
    redLight: "#FEE2E2",
    cyanLight: "#ECF8F2",
    gold: "#FBBF24",
  },
  gray: {
    900: "#14231F",
    700: "#33423D",
    600: "#4A5853",
    500: "#66736E",
    400: "#9AA5A0",
    300: "#CFD8D3",
    200: "#E1E8E4",
    100: "#EDF2EF",
    50: BRAND.light,
  },
  white: "#FFFFFF",
} as const;
