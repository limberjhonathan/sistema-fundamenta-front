import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Kpis: Sx = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 1.25,
  my: 2.5,
};

export const KpiCard: Sx = { p: 1.5, borderRadius: 2 };

export const VariacaoChip: Sx = { height: 18, fontSize: "0.625rem", bgcolor: COLORS.gray[100], color: COLORS.gray[700] };

export const Banner: Sx = {
  p: 2,
  borderRadius: 2,
  bgcolor: COLORS.primary[600],
  color: COLORS.white,
  position: "relative",
  overflow: "hidden",
  mb: 3,
};

export const SectionTitle: Sx = { fontFamily: "var(--font-jakarta)", fontWeight: 600, fontSize: "1rem", mb: 1.5 };

export const ListCard: Sx = { borderRadius: 2, mb: 3, overflow: "hidden" };

export const ListItem: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  p: 1.5,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  "&:last-of-type": { borderBottom: "none" },
};

export const Cota: Sx = {
  p: 1.5,
  borderRadius: 2,
  border: `1px dashed ${COLORS.gray[300]}`,
  bgcolor: COLORS.gray[100],
};
