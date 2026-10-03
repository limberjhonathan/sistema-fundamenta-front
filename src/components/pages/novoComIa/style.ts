import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Columns: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 260px" },
  gap: 3,
  alignItems: "start",
};

export const FormCard: Sx = { borderRadius: 2, overflow: "hidden" };

export const FormCardHeader: Sx = { px: 2.5, py: 2, bgcolor: COLORS.gray[50], borderBottom: `1px solid ${COLORS.gray[200]}` };

export const Label: Sx = { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: COLORS.gray[700], mb: 0.75 };

export const FieldsGrid: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 };

export const Stepper: Sx = {
  my: 4,
  "& .MuiStepLabel-label": { fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", mt: "8px !important" },
  "& .MuiStepConnector-line": { borderColor: COLORS.gray[200] },
};

export const ContextoCard: Sx = {
  p: 2.5,
  borderRadius: 2,
  bgcolor: COLORS.primary[900],
  color: COLORS.white,
  boxShadow: "0 12px 28px rgba(2, 43, 38, 0.35)",
};

export const ImagemPlaceholder: Sx = {
  height: 170,
  borderRadius: 2,
  background: `radial-gradient(circle at 30% 70%, ${COLORS.primary[500]} 0%, #1E2A33 45%, #0F172A 100%)`,
};

/* IA gerando */
export const Gerando: Sx = {
  position: "relative",
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-40px 0 auto 0",
    height: 520,
    background: `radial-gradient(circle, ${COLORS.primary[50]} 0%, transparent 65%)`,
    zIndex: -1,
  },
};

export const GerandoImagem: Sx = {
  width: 250,
  height: 250,
  mx: "auto",
  mb: 3,
  borderRadius: 3,
  position: "relative",
  background: `linear-gradient(145deg, ${COLORS.gray[100]} 0%, ${COLORS.gray[300]} 100%)`,
  boxShadow: "0 20px 40px rgba(17,24,39,0.15)",
  display: "grid",
  placeItems: "center",
};

export const ProgressCard: Sx = { p: 3, borderRadius: 2, maxWidth: 600, mx: "auto", textAlign: "left" };

export const EtapaItem = (ativa: boolean): Sx => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  p: 1.25,
  borderRadius: 1.5,
  bgcolor: ativa ? COLORS.primary[50] : "transparent",
  border: `1px solid ${ativa ? COLORS.primary[100] : "transparent"}`,
  color: ativa ? COLORS.primary[600] : COLORS.gray[600],
  fontSize: "0.875rem",
});
