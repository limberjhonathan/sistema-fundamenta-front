import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const ResumoGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
  gap: 2,
  mb: 3,
};

export const ResumoCard: Sx = { p: 2.5, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" };

export const ResumoValor: Sx = { fontFamily: "var(--font-jakarta)", fontSize: "1.5rem", fontWeight: 500 };

export const FiltersBar: Sx = {
  p: 1.5,
  borderRadius: 2,
  mb: 3,
  display: "flex",
  gap: 1.5,
  alignItems: "center",
  flexWrap: { xs: "wrap", md: "nowrap" },
};

export const FilterSelect: Sx = { minWidth: 170, "& .MuiSelect-select": { fontSize: "0.875rem" } };

export const TableCard: Sx = { borderRadius: 2, overflow: "hidden" };

export const Codigo: Sx = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.8125rem", color: COLORS.gray[600] };

export const VersaoChip: Sx = {
  height: 20,
  fontSize: "0.6875rem",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  bgcolor: COLORS.gray[100],
  color: COLORS.gray[700],
};

export const PaginatorBar: Sx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
  py: 1.5,
  borderTop: `1px solid ${COLORS.gray[200]}`,
  gap: 2,
  flexWrap: "wrap",
};

export const Dica: Sx = {
  mt: 4,
  p: 2.5,
  borderRadius: 2,
  bgcolor: COLORS.accent.cyanLight,
  border: `1px solid ${COLORS.primary[100]}`,
  display: "flex",
  gap: 2,
};

export const Footer: Sx = {
  mt: 4,
  pt: 2.5,
  borderTop: `1px solid ${COLORS.gray[200]}`,
  textAlign: "center",
  fontSize: "0.75rem",
  color: COLORS.gray[600],
};
