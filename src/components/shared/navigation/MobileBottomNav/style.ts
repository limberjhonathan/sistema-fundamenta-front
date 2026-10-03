import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const MOBILE_NAV_HEIGHT = 64;

export const Container: Sx = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: MOBILE_NAV_HEIGHT,
  zIndex: (theme) => theme.zIndex.appBar,
  bgcolor: COLORS.white,
  borderTop: `1px solid ${COLORS.gray[200]}`,
  display: { xs: "grid", md: "none" },
  gridTemplateColumns: "repeat(5, 1fr)",
  alignItems: "center",
};

export const Item = (active: boolean): Sx => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.25,
  fontSize: "0.6875rem",
  fontWeight: active ? 700 : 500,
  color: active ? COLORS.primary[600] : COLORS.gray[500],
  textDecoration: "none",
  "& svg": { fontSize: 20 },
});

export const Fab: Sx = {
  justifySelf: "center",
  mt: -3,
  width: 48,
  height: 48,
  borderRadius: "50%",
  bgcolor: COLORS.primary[600],
  color: COLORS.white,
  display: "grid",
  placeItems: "center",
  boxShadow: "0 6px 16px rgba(11, 82, 74, 0.35)",
  border: `3px solid ${COLORS.white}`,
};
