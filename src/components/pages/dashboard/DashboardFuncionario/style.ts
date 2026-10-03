import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const TopGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
  gap: 2,
  mb: 3.5,
};

export const AtalhoCard = (destaque: boolean): Sx => ({
  p: 2.5,
  borderRadius: 3,
  position: "relative",
  textDecoration: "none",
  color: "inherit",
  display: "block",
  bgcolor: destaque ? COLORS.gray[100] : COLORS.white,
  transition: "transform .15s, box-shadow .15s",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(17,24,39,0.08)" },
});

export const Columns: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
  gap: 3,
  alignItems: "start",
};

export const SectionHeader: Sx = { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 };

export const SectionTitle: Sx = { fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 500 };

export const AtividadeItem: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  mb: 1.5,
  borderRadius: 2,
};

export const AcessoCard: Sx = { p: 2, mb: 1.5, borderRadius: 2 };

export const CategoriaChip: Sx = {
  bgcolor: COLORS.gray[200],
  color: COLORS.gray[700],
  textTransform: "uppercase",
  fontSize: "0.625rem",
  height: 20,
  borderRadius: 999,
};

export const GuiaCard: Sx = {
  p: 2.5,
  borderRadius: 3,
  bgcolor: COLORS.primary[600],
  color: COLORS.white,
  boxShadow: "0 12px 28px rgba(11, 82, 74, 0.35)",
};

export const ResumoGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
  gap: 2,
  mt: 4,
  pt: 2,
  borderTop: `1px solid ${COLORS.gray[200]}`,
};
