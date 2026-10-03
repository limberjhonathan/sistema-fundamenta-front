import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { mqTablet } from "@/utils/mediaQuery";

export const HEADER_HEIGHT = 64;

export const Container: Sx = {
  position: "sticky",
  top: 0,
  zIndex: (theme) => theme.zIndex.appBar,
  height: HEADER_HEIGHT,
  px: 3,
  display: "flex",
  alignItems: "center",
  gap: 2,
  bgcolor: COLORS.gray[50],
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  [mqTablet]: { px: 2, bgcolor: COLORS.white },
};

export const Search: Sx = {
  width: 360,
  maxWidth: "100%",
  "& .MuiOutlinedInput-root": { bgcolor: COLORS.gray[100], height: 36 },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  [mqTablet]: { display: "none" },
};

export const Right: Sx = { ml: "auto", display: "flex", alignItems: "center", gap: 1.5 };

export const UserButton: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1,
  py: 0.5,
  borderRadius: 2,
  color: "text.primary",
  textAlign: "left",
};

export const UserAvatar: Sx = {
  width: 32,
  height: 32,
  fontSize: "0.75rem",
  fontWeight: 700,
  bgcolor: COLORS.primary[600],
};

export const UserInfo: Sx = { [mqTablet]: { display: "none" } };
