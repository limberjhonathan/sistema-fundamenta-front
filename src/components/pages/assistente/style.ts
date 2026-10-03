import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { HEADER_HEIGHT } from "@/components/shared/Header/style";
import { MOBILE_NAV_HEIGHT } from "@/components/shared/navigation/MobileBottomNav/style";

export const Page: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 260px" },
  height: {
    xs: `calc(100dvh - ${HEADER_HEIGHT + MOBILE_NAV_HEIGHT}px)`,
    md: `calc(100dvh - ${HEADER_HEIGHT}px)`,
  },
};

export const ChatColumn: Sx = { display: "flex", flexDirection: "column", minHeight: 0 };

export const Messages: Sx = { flex: 1, overflowY: "auto", px: { xs: 2, md: 3 }, py: 3 };

export const DayDivider: Sx = {
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: COLORS.gray[500],
  mb: 3,
  "&::before, &::after": { borderColor: COLORS.gray[200] },
};

export const IaBubble: Sx = {
  p: 2,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 1px 3px rgba(17,24,39,0.05)",
  maxWidth: 560,
};

export const UserBubble: Sx = {
  p: 2,
  borderRadius: 2,
  bgcolor: COLORS.primary[600],
  color: COLORS.white,
  maxWidth: 520,
};

export const IaTag: Sx = {
  height: 18,
  fontSize: "0.625rem",
  bgcolor: COLORS.primary[50],
  color: COLORS.primary[600],
  "& .MuiChip-icon": { fontSize: 11, color: COLORS.primary[600] },
};

export const Fonte: Sx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  px: 1,
  py: 0.5,
  mr: 1,
  mt: 1,
  borderRadius: 1,
  border: `1px solid ${COLORS.gray[200]}`,
  bgcolor: COLORS.gray[50],
  fontSize: "0.75rem",
  fontWeight: 500,
  "& svg": { fontSize: 13 },
};

export const Composer: Sx = { px: { xs: 2, md: 3 }, pb: 1.5 };

export const ComposerBox: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1.5,
  py: 1,
  borderRadius: 2,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "0 4px 16px rgba(17,24,39,0.06)",
};

export const SidePanel: Sx = {
  display: { xs: "none", lg: "flex" },
  flexDirection: "column",
  borderLeft: `1px solid ${COLORS.gray[200]}`,
  bgcolor: COLORS.gray[50],
  minHeight: 0,
};

export const SugestaoCard: Sx = { p: 1.5, mb: 1.25, borderRadius: 2, cursor: "pointer", "&:hover": { borderColor: COLORS.primary[100] } };
