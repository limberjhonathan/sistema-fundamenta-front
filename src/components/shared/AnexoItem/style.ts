import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Linha = (clicavel: boolean, aberto: boolean): Sx => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2,
  py: 1.5,
  width: "100%",
  textAlign: "left",
  border: 0,
  font: "inherit",
  bgcolor: aberto ? COLORS.gray[50] : "transparent",
  cursor: clicavel ? "pointer" : "default",
  transition: "background-color 120ms ease",
  "&:hover": clicavel ? { bgcolor: COLORS.gray[50] } : {},
  "&:focus-visible": { outline: `2px solid ${COLORS.primary[500]}`, outlineOffset: -2 },
  // Ações aparecem no hover/foco em telas com mouse; sempre visíveis no toque
  "& .acoes": { opacity: { xs: 1, md: 0 }, transition: "opacity 120ms ease" },
  "&:hover .acoes, &:focus-within .acoes": { opacity: 1 },
});

export const SoLeitor: Sx = {
  // "1px" explícito: no sx do MUI, width: 1 significa 100%
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

export const Miniatura: Sx = {
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: 2,
  objectFit: "cover",
  border: `1px solid ${COLORS.gray[200]}`,
};

export const Meta: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  fontSize: "0.75rem",
  color: COLORS.gray[500],
  minWidth: 0,
  "& .ponto": { width: 3, height: 3, borderRadius: "50%", bgcolor: COLORS.gray[300], flexShrink: 0 },
};

export const Barra: Sx = {
  height: 4,
  mt: 0.75,
  maxWidth: 260,
  bgcolor: COLORS.gray[100],
  "& .MuiLinearProgress-bar": { bgcolor: COLORS.primary[500] },
};

export const Resumo: Sx = {
  mx: 2,
  mb: 1.75,
  ml: { xs: 2, sm: 9 },
  p: 1.75,
  borderRadius: 2,
  bgcolor: COLORS.primary[50],
  border: `1px solid ${COLORS.primary[100]}`,
};

export const Destaque: Sx = {
  height: 24,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.primary[100]}`,
  color: COLORS.gray[700],
  fontWeight: 500,
  fontSize: "0.75rem",
  borderRadius: 999,
};
