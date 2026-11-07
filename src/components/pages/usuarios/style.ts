import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";

export const FiltersBar: Sx = {
  p: 1.5,
  borderRadius: 2,
  mb: 3,
  display: "flex",
  gap: 1.5,
  alignItems: "center",
  flexWrap: { xs: "wrap", lg: "nowrap" },
};

export const FilterSelect: Sx = { minWidth: 160, flex: { xs: "1 1 140px", lg: "0 0 auto" }, "& .MuiSelect-select": { fontSize: "0.875rem" } };

export const TableCard: Sx = { borderRadius: 2, overflow: "hidden" };

export const BulkBar: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2,
  py: 1,
  bgcolor: BRAND.dark,
  color: COLORS.white,
  flexWrap: "wrap",
  "& .MuiButton-root": { color: COLORS.white },
};

export const Avatar = (ativo: boolean): Sx => ({
  width: 36,
  height: 36,
  fontSize: "0.8125rem",
  fontWeight: 700,
  bgcolor: ativo ? COLORS.primary[50] : COLORS.gray[100],
  color: ativo ? COLORS.primary[700] : COLORS.gray[500],
  border: `1px solid ${ativo ? COLORS.primary[100] : COLORS.gray[200]}`,
});

export const UsuarioNome: Sx = { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.3 };

export const UsuarioEmail: Sx = { fontSize: "0.75rem", color: "text.secondary" };

export const PerfilChip = (cor: { color: string; bg: string; border: string }): Sx => ({
  height: 24,
  fontSize: "0.75rem",
  fontWeight: 600,
  borderRadius: 1,
  color: cor.color,
  bgcolor: cor.bg,
  border: `1px solid ${cor.border}`,
});

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

export const LicencasCard: Sx = {
  mt: 3,
  p: 2.5,
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  gap: 3,
  flexWrap: { xs: "wrap", md: "nowrap" },
  bgcolor: COLORS.accent.cyanLight,
  border: `1px solid ${COLORS.primary[100]}`,
  boxShadow: "none",
};

export const FormGrid: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 };

export const PerfilOpcao = (selecionado: boolean): Sx => ({
  p: 1.5,
  borderRadius: 2,
  border: `1.5px solid ${selecionado ? COLORS.primary[600] : COLORS.gray[200]}`,
  bgcolor: selecionado ? COLORS.primary[50] : COLORS.white,
  cursor: "pointer",
  textAlign: "left",
  transition: "all .15s",
  "&:hover": { borderColor: selecionado ? COLORS.primary[600] : COLORS.gray[300] },
});
