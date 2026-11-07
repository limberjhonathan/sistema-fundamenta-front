import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";

export const Layout: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "320px 1fr" },
  gap: 3,
  alignItems: "start",
};

export const PerfisColuna: Sx = { display: "flex", flexDirection: "column", gap: 1.5, position: { lg: "sticky" }, top: { lg: 88 } };

export const PerfilCard = (ativo: boolean): Sx => ({
  p: 2,
  borderRadius: 2,
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 1,
  width: "100%",
  bgcolor: ativo ? BRAND.dark : COLORS.white,
  color: ativo ? COLORS.white : "inherit",
  border: `1px solid ${ativo ? BRAND.dark : COLORS.gray[200]}`,
  boxShadow: ativo ? "0 10px 24px rgba(20,35,31,0.18)" : "0 1px 3px rgba(17,24,39,0.05)",
  transition: "all .15s",
  "&:hover": { borderColor: ativo ? BRAND.dark : COLORS.primary[100] },
});

export const NovoPerfil: Sx = {
  p: 2,
  borderRadius: 2,
  border: `1.5px dashed ${COLORS.gray[300]}`,
  color: COLORS.gray[600],
  gap: 1,
  fontSize: "0.875rem",
  fontWeight: 600,
  "&:hover": { borderColor: COLORS.primary[600], color: COLORS.primary[600] },
};

export const EditorCard: Sx = { borderRadius: 2, overflow: "hidden" };

export const EditorHeader: Sx = {
  p: 2.5,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 2,
  flexWrap: "wrap",
  borderBottom: `1px solid ${COLORS.gray[200]}`,
};

export const ModuloNome: Sx = { fontSize: "0.875rem", fontWeight: 600 };

export const ModuloDescricao: Sx = { fontSize: "0.75rem", color: "text.secondary" };

export const SalvarBar: Sx = {
  position: "sticky",
  bottom: { xs: 72, md: 16 },
  mt: 3,
  px: 2.5,
  py: 1.5,
  borderRadius: 2,
  bgcolor: BRAND.dark,
  color: COLORS.white,
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
  boxShadow: "0 16px 40px rgba(20,35,31,0.28)",
  zIndex: 2,
};

export const CompararCelula = (pct: number): Sx => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 56,
  height: 26,
  px: 1,
  borderRadius: 1,
  fontSize: "0.75rem",
  fontWeight: 700,
  bgcolor: pct === 0 ? COLORS.gray[100] : pct === 1 ? BRAND.dark : pct >= 0.5 ? COLORS.primary[100] : COLORS.primary[50],
  color: pct === 0 ? COLORS.gray[400] : pct === 1 ? BRAND.lime : COLORS.primary[700],
});
