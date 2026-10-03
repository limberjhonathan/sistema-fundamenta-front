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
  bgcolor: COLORS.gray[50],
  backgroundImage: `radial-gradient(${COLORS.gray[300]} 1px, transparent 1px)`,
  backgroundSize: "20px 20px",
};

export const Tools: Sx = {
  position: "absolute",
  top: 24,
  left: 16,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  p: 0.75,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 2px 8px rgba(17,24,39,0.06)",
};

export const Tarefa = (selecionada: boolean): Sx => ({
  position: "absolute",
  width: 136,
  height: 72,
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  px: 1.5,
  fontSize: "0.8125rem",
  borderRadius: 1.5,
  bgcolor: COLORS.white,
  cursor: "pointer",
  border: `${selecionada ? 2 : 1}px solid ${selecionada ? COLORS.primary[500] : COLORS.gray[300]}`,
  boxShadow: "0 2px 6px rgba(17,24,39,0.08)",
});

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
  left: { xs: 16, sm: 200 },
  right: { xs: 16, sm: "auto" },
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 1.5,
  py: 1,
  maxWidth: 300,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 6px 16px rgba(17,24,39,0.1)",
};

export const Minimap: Sx = {
  position: "absolute",
  bottom: 16,
  right: 16,
  width: 136,
  height: 92,
  borderRadius: 2,
  bgcolor: COLORS.gray[200],
  display: { xs: "none", sm: "grid" },
  placeItems: "center",
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
