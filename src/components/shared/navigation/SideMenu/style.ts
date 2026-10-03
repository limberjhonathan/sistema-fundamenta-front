import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const SIDE_MENU_WIDTH = 240;

export const Container: Sx = {
  width: SIDE_MENU_WIDTH,
  height: "100%",
  bgcolor: COLORS.primary[900],
  color: COLORS.white,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
};

export const LogoArea: Sx = { px: 2.5, pt: 2.5, pb: 3 };

export const SectionTitle: Sx = {
  px: 2.5,
  pt: 2,
  pb: 1,
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

export const Item = (active: boolean): Sx => ({
  mx: 1.5,
  px: 1.25,
  py: 0.85,
  borderRadius: 1.5,
  gap: 1.25,
  color: active ? COLORS.white : "rgba(255,255,255,0.85)",
  bgcolor: active ? "rgba(255,255,255,0.1)" : "transparent",
  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
  "& svg": { fontSize: 18 },
  "& .MuiListItemText-primary": { fontSize: "0.875rem", fontWeight: active ? 600 : 500 },
});

export const Footer: Sx = {
  mt: "auto",
  mx: 1.5,
  py: 2,
  borderTop: "1px solid rgba(255,255,255,0.15)",
  display: "flex",
  alignItems: "center",
  gap: 1.25,
  px: 1,
};

export const FooterAvatar: Sx = {
  width: 32,
  height: 32,
  fontSize: "0.75rem",
  fontWeight: 700,
  bgcolor: COLORS.gray[200],
  color: COLORS.gray[700],
};
