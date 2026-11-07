import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";

export const Toolbar: Sx = {
  p: 1.5,
  borderRadius: 2,
  mb: 3,
  display: "flex",
  gap: 1.5,
  alignItems: "center",
  flexWrap: { xs: "wrap", md: "nowrap" },
};

export const CardsGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" },
  gap: 2.5,
};

export const DepCard = (inativo: boolean): Sx => ({
  p: 2.5,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  cursor: "pointer",
  transition: "border-color .15s, box-shadow .15s, transform .15s",
  opacity: inativo ? 0.7 : 1,
  bgcolor: inativo ? COLORS.gray[50] : COLORS.white,
  "&:hover": { borderColor: COLORS.primary[100], boxShadow: "0 8px 24px rgba(20,35,31,0.08)", transform: "translateY(-2px)" },
});

export const Sigla = (inativo: boolean): Sx => ({
  width: 44,
  height: 44,
  borderRadius: 2,
  display: "grid",
  placeItems: "center",
  fontFamily: "var(--font-space-grotesk)",
  fontWeight: 700,
  fontSize: "0.875rem",
  letterSpacing: "0.02em",
  bgcolor: inativo ? COLORS.gray[200] : BRAND.dark,
  color: inativo ? COLORS.gray[600] : BRAND.lime,
  flexShrink: 0,
});

export const DepNome: Sx = { fontFamily: "var(--font-space-grotesk)", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.2 };

export const DepDescricao: Sx = {
  fontSize: "0.8125rem",
  color: COLORS.gray[600],
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  minHeight: 40,
};

export const Metricas: Sx = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  borderTop: `1px solid ${COLORS.gray[200]}`,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  py: 1.5,
  "& > *:not(:last-child)": { borderRight: `1px solid ${COLORS.gray[200]}` },
};

export const MetricaValor: Sx = { fontFamily: "var(--font-space-grotesk)", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.2 };

export const MetricaLabel: Sx = { fontSize: "0.6875rem", color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: "0.04em" };

export const GestorAvatar: Sx = {
  width: 28,
  height: 28,
  fontSize: "0.6875rem",
  fontWeight: 700,
  bgcolor: COLORS.primary[50],
  color: COLORS.primary[700],
};

export const NovoCard: Sx = {
  borderRadius: 2,
  border: `1.5px dashed ${COLORS.gray[300]}`,
  minHeight: 260,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  color: COLORS.gray[600],
  transition: "all .15s",
  "&:hover": { borderColor: COLORS.primary[600], color: COLORS.primary[600], bgcolor: COLORS.primary[50] },
};

export const Drawer: Sx = { width: { xs: "100vw", sm: 440 }, display: "flex", flexDirection: "column", height: "100%" };

export const DrawerHeader: Sx = {
  p: 3,
  bgcolor: BRAND.dark,
  color: COLORS.white,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const DrawerSection: Sx = { px: 3, py: 2.5, borderBottom: `1px solid ${COLORS.gray[200]}` };

export const DrawerSectionTitle: Sx = {
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: COLORS.gray[500],
  mb: 1.5,
};

export const InfoGrid: Sx = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 };

export const FormGrid: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" }, gap: 2 };
