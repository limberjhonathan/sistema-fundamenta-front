import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";

export const Grid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
  gap: 2.5,
  mb: 2.5,
};

export const Card: Sx = { p: 2.5, borderRadius: 2, display: "flex", flexDirection: "column", minWidth: 0 };

export const CardHeader: Sx = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2, flexWrap: "wrap" };

export const CardTitle: Sx = { fontSize: "1.125rem" };

export const CardSubtitle: Sx = { fontSize: "0.8125rem", color: "text.secondary", mt: 0.25 };

export const PlanoBanner: Sx = {
  p: { xs: 2.5, md: 3 },
  borderRadius: 3,
  mb: 2.5,
  bgcolor: BRAND.dark,
  backgroundImage: "linear-gradient(rgba(28,36,17,0.55), rgba(28,36,17,0.55)), url(/brand/fundo-textura.png)",
  backgroundSize: "cover",
  color: COLORS.white,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
  gap: 3,
  alignItems: "center",
};

export const PlanoValor: Sx = { fontFamily: "var(--font-space-grotesk)", fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 600, lineHeight: 1 };

export const PlanoBarra: Sx = {
  height: 10,
  borderRadius: 999,
  bgcolor: "rgba(255,255,255,0.12)",
  "& .MuiLinearProgress-bar": { bgcolor: BRAND.lime, borderRadius: 999 },
};

export const PlanoInfo: Sx = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 1.5,
  "& > div": { p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" },
};

export const RecursoLinha: Sx = { display: "grid", gridTemplateColumns: "10px 1fr auto", alignItems: "center", gap: 1.25, py: 1 };

export const ConsumidorLinha: Sx = { display: "flex", alignItems: "center", gap: 1.5, py: 1.25 };

export const Posicao = (primeiro: boolean): Sx => ({
  width: 22,
  fontFamily: "var(--font-space-grotesk)",
  fontWeight: 700,
  fontSize: "0.875rem",
  color: primeiro ? COLORS.primary[600] : COLORS.gray[400],
});

export const ConfigLinha: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  py: 1.5,
  "&:not(:last-child)": { borderBottom: `1px solid ${COLORS.gray[200]}` },
};

export const ConfigGrid: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, columnGap: 4 };
