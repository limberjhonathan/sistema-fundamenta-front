import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { mqShortDesktop, mqTablet } from "@/utils/mediaQuery";

export const Container: Sx = {
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  bgcolor: COLORS.primary[900],
  color: COLORS.white,
  px: 7,
  py: "clamp(24px, 5vh, 48px)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(16px, 3.2vh, 32px)",
  "& > *": { flexShrink: 0 },
  [mqTablet]: { display: "none" },
};

export const Title: Sx = {
  fontSize: "clamp(1.75rem, min(3.2vw, 5.5vh), 2.75rem)",
  lineHeight: 1.15,
  fontWeight: 700,
};

export const Illustration: Sx = {
  // Ocupa o espaço que sobrar na coluna, encolhendo em telas baixas
  flex: "1 1 0 !important",
  minHeight: 110,
  maxHeight: 300,
  width: "100%",
  maxWidth: 520,
  borderRadius: 3,
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(140deg, ${COLORS.gray[100]} 0%, ${COLORS.gray[300]} 100%)`,
  boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
};

export const Pill = (left: string, color: string): Sx => ({
  position: "absolute",
  bottom: "22%",
  left,
  width: 34,
  height: 54,
  borderRadius: 20,
  bgcolor: color,
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
});

export const Base = (left: string): Sx => ({
  position: "absolute",
  bottom: "12%",
  left,
  width: 110,
  height: 28,
  borderRadius: 1,
  bgcolor: "#F08A4B",
  transform: "skewX(-25deg)",
});

export const Checks: Sx = {
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  columnGap: 4,
  rowGap: 1,
  pb: 2,
  borderBottom: "1px solid rgba(255,255,255,0.4)",
  maxWidth: 520,
};

export const Testimonial: Sx = {
  border: "1px solid rgba(255,255,255,0.35)",
  borderRadius: 2,
  p: 2.5,
  maxWidth: 320,
  // Em notebooks com pouca altura o depoimento sai para não forçar rolagem
  [mqShortDesktop]: { display: "none" },
};

export const MobileHero: Sx = {
  display: "none",
  [mqTablet]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 1.5,
    minHeight: "42dvh",
    px: 3,
    color: COLORS.white,
    background: `linear-gradient(180deg, ${COLORS.primary[100]}55 0%, ${COLORS.primary[500]} 70%, ${COLORS.primary[600]} 100%)`,
  },
};
