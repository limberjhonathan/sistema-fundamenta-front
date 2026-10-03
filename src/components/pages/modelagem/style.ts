import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { HEADER_HEIGHT } from "@/components/shared/Header/style";
import { MOBILE_NAV_HEIGHT } from "@/components/shared/navigation/MobileBottomNav/style";

export const Page: Sx = {
  display: "flex",
  flexDirection: "column",
  height: {
    xs: `calc(100dvh - ${HEADER_HEIGHT + MOBILE_NAV_HEIGHT}px)`,
    md: `calc(100dvh - ${HEADER_HEIGHT}px)`,
  },
};

export const Toolbar: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2.5,
  py: 1,
  bgcolor: COLORS.white,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  flexWrap: "wrap",
};

export const ViewToggle: Sx = {
  bgcolor: COLORS.gray[100],
  p: 0.5,
  borderRadius: 2,
  "& .MuiToggleButton-root": { border: "none", px: 1.5, py: 0.5, fontSize: "0.8125rem", textTransform: "none", borderRadius: "6px !important" },
  "& .Mui-selected": { bgcolor: `${COLORS.primary[600]} !important`, color: `${COLORS.white} !important` },
};

export const Body: Sx = {
  flex: 1,
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 300px" },
};

export const Canvas: Sx = {
  position: "relative",
  overflow: "hidden",
  minHeight: 0,
  bgcolor: COLORS.gray[50],
  backgroundImage: `radial-gradient(${COLORS.gray[300]} 1px, transparent 1px)`,
  backgroundSize: "20px 20px",
};

/** Container onde o bpmn-js desenha; as variáveis aplicam as cores do tema no editor. */
export const BpmnContainer: Sx = {
  position: "absolute",
  inset: 0,
  "--palette-background-color": COLORS.white,
  "--palette-border-color": COLORS.gray[200],
  "--palette-entry-color": COLORS.gray[700],
  "--palette-entry-hover-color": COLORS.primary[500],
  "--palette-entry-selected-color": COLORS.primary[600],
  "--palette-separator-color": COLORS.gray[200],
  "--element-selected-outline-stroke-color": COLORS.primary[500],
  "--element-selected-outline-secondary-stroke-color": COLORS.primary[100],
  "--context-pad-entry-hover-background-color": COLORS.primary[50],
  "& .djs-palette": {
    top: 16,
    left: 16,
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(17,24,39,0.06)",
    overflow: "hidden",
  },
  "& .djs-context-pad .entry": { borderRadius: "6px" },
  // Marca d'água do bpmn.io: exigida pela licença, fica discreta no canto
  "& .bjs-powered-by": { bottom: "12px !important", right: "12px !important", opacity: 0.6 },
};

export const Zoom: Sx = {
  position: "absolute",
  bottom: 16,
  left: 16,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  px: 1,
  py: 0.5,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
};

export const SugestaoFlutuante: Sx = {
  position: "absolute",
  bottom: 16,
  left: { xs: 16, sm: 230 },
  right: { xs: 16, sm: "auto" },
  zIndex: 2,
  display: { xs: "none", sm: "flex" },
  alignItems: "center",
  gap: 1.5,
  px: 1.5,
  py: 1,
  maxWidth: 320,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 6px 16px rgba(17,24,39,0.1)",
};

export const Painel: Sx = {
  display: { xs: "none", md: "flex" },
  flexDirection: "column",
  bgcolor: COLORS.white,
  borderLeft: `1px solid ${COLORS.gray[200]}`,
  overflowY: "auto",
};

export const PainelSecao: Sx = { px: 2, py: 2, borderBottom: `1px solid ${COLORS.gray[200]}` };

export const Label: Sx = { fontSize: "0.8125rem", color: COLORS.gray[600], mb: 0.75 };

export const Atalho: Sx = {
  display: "inline-block",
  px: 0.75,
  borderRadius: 0.75,
  border: `1px solid ${COLORS.gray[300]}`,
  bgcolor: COLORS.gray[50],
  fontSize: "0.6875rem",
  fontFamily: "ui-monospace, monospace",
};

export const StatusBar: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2,
  py: 0.75,
  fontSize: "0.75rem",
  color: COLORS.gray[600],
  bgcolor: COLORS.white,
  borderTop: `1px solid ${COLORS.gray[200]}`,
};
