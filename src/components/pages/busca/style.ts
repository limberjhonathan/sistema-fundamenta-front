import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Page: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 280px" },
  minHeight: "100%",
};

export const Main: Sx = { minWidth: 0 };

export const SearchArea: Sx = {
  px: { xs: 2, md: 3 },
  pt: 3,
  pb: 1.5,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
};

export const SearchBox: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  p: 1,
  pl: 2,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 1px 3px rgba(17,24,39,0.05)",
};

export const ResumoIa: Sx = {
  p: 2.5,
  borderRadius: 2,
  mb: 3,
  position: "relative",
  overflow: "hidden",
};

export const ResultadoCard = (destaque: string): Sx => ({
  p: 2.5,
  mb: 2,
  borderRadius: 2,
  borderLeft: `4px solid ${destaque}`,
});

export const TipoTag = (escuro: boolean): Sx => ({
  height: 18,
  fontSize: "0.5625rem",
  fontWeight: 700,
  borderRadius: 999,
  bgcolor: escuro ? COLORS.primary[600] : COLORS.gray[100],
  color: escuro ? COLORS.white : COLORS.gray[700],
  "& .MuiChip-icon": { fontSize: 11, color: "inherit" },
});

export const HashTag: Sx = {
  height: 22,
  fontSize: "0.6875rem",
  fontWeight: 500,
  bgcolor: COLORS.primary[50],
  color: COLORS.primary[600],
};

export const Meta: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: "0.75rem",
  color: COLORS.gray[600],
  "& svg": { fontSize: 14 },
};

export const Filtros: Sx = {
  display: { xs: "none", lg: "block" },
  borderLeft: `1px solid ${COLORS.gray[200]}`,
  bgcolor: COLORS.gray[50],
  p: 2.5,
};

export const FiltroSecao: Sx = { pb: 2, mb: 2, borderBottom: `1px solid ${COLORS.gray[200]}` };

export const FiltroTitulo: Sx = { fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", color: COLORS.gray[700], mb: 1 };

export const Contador: Sx = {
  ml: "auto",
  fontSize: "0.6875rem",
  px: 0.75,
  borderRadius: 1,
  bgcolor: COLORS.gray[100],
  color: COLORS.gray[600],
};
