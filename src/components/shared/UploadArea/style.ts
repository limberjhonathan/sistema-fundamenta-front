import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

const base = (arrastando: boolean, desabilitado: boolean): Sx => ({
  position: "relative",
  border: "1.5px dashed",
  borderColor: arrastando ? COLORS.primary[500] : COLORS.gray[300],
  borderRadius: 3,
  bgcolor: arrastando ? COLORS.primary[50] : COLORS.white,
  cursor: desabilitado ? "not-allowed" : "pointer",
  opacity: desabilitado ? 0.55 : 1,
  outline: "none",
  transition: "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
  boxShadow: arrastando ? `0 0 0 4px ${COLORS.primary[50]}` : "none",
  "&:hover": desabilitado ? {} : { borderColor: COLORS.primary[500], bgcolor: arrastando ? COLORS.primary[50] : COLORS.gray[50] },
  "&:focus-visible": { borderColor: COLORS.primary[500], boxShadow: `0 0 0 3px ${COLORS.primary[100]}` },
});

export const Area = (arrastando: boolean, desabilitado: boolean): Sx => ({
  ...base(arrastando, desabilitado),
  px: { xs: 2.5, sm: 4 },
  py: { xs: 3.5, sm: 4.5 },
  textAlign: "center",
});

export const AreaCompacta = (arrastando: boolean, desabilitado: boolean): Sx => ({
  ...base(arrastando, desabilitado),
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2,
  py: 1.25,
});

export const Link: Sx = {
  color: COLORS.primary[600],
  fontWeight: 600,
  textDecoration: "underline",
  textDecorationColor: COLORS.primary[100],
  textUnderlineOffset: 3,
};

export const Formatos: Sx = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  columnGap: 2.5,
  rowGap: 1,
  mt: 3,
  pt: 2.5,
  borderTop: `1px solid ${COLORS.gray[100]}`,
};

export const Formato: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  fontSize: "0.75rem",
  fontWeight: 500,
  color: COLORS.gray[600],
  "& svg": { fontSize: 16 },
};

export const Kbd: Sx = {
  px: 0.5,
  py: "1px",
  borderRadius: 0.75,
  border: `1px solid ${COLORS.gray[300]}`,
  bgcolor: COLORS.gray[50],
  fontSize: "0.6875rem",
  fontFamily: "inherit",
  fontWeight: 600,
  color: COLORS.gray[700],
};

export const Erros: Sx = {
  mt: 1.5,
  display: "flex",
  gap: 1.25,
  alignItems: "flex-start",
  p: 1.5,
  borderRadius: 2,
  border: `1px solid #FDE68A`,
  bgcolor: "#FFFBEB",
  color: COLORS.accent.orangeDark,
};
