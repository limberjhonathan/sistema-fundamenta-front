import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { mqShortDesktop, mqTablet } from "@/utils/mediaQuery";

export const Container: Sx = { width: "100%", maxWidth: 340 };

export const Label: Sx = {
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: COLORS.gray[700],
  mb: 0.75,
};

export const Input: Sx = {
  "& .MuiOutlinedInput-root": { bgcolor: COLORS.white },
};

export const Submit: Sx = { height: 44, mt: 1, bgcolor: COLORS.primary[600] };

export const Divider: Sx = {
  my: 2.5,
  [mqShortDesktop]: { my: 1.75 },
  fontSize: "0.6875rem",
  fontWeight: 600,
  color: COLORS.gray[500],
  "&::before, &::after": { borderColor: COLORS.gray[200] },
};

export const SsoButton: Sx = { flex: 1, height: 40, fontWeight: 500 };

export const Notice: Sx = {
  mt: 3,
  p: 2,
  borderRadius: 2,
  bgcolor: COLORS.gray[100],
  display: "flex",
  gap: 1.5,
  alignItems: "flex-start",
  [mqShortDesktop]: { mt: 2, p: 1.5 },
};

export const Footer: Sx = {
  mt: 3,
  pt: 3,
  borderTop: `1px solid ${COLORS.gray[200]}`,
  textAlign: "center",
  [mqShortDesktop]: { mt: 2, pt: 2 },
};

export const DesktopOnly: Sx = { [mqTablet]: { display: "none" } };
export const MobileOnly: Sx = { display: "none", [mqTablet]: { display: "flex" } };
