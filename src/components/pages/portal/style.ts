import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Hero: Sx = {
  px: { xs: 2, md: 4 },
  pt: 3,
  pb: 3.5,
  color: COLORS.white,
  background: `linear-gradient(115deg, ${COLORS.primary[800]} 0%, ${COLORS.primary[600]} 55%, #1F6F78 75%, ${COLORS.primary[700]} 100%)`,
};

export const HeroSearch: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  p: 0.75,
  pl: 2,
  mt: 2.5,
  maxWidth: 560,
  borderRadius: 2,
  bgcolor: COLORS.white,
};

export const SugestaoChip: Sx = {
  height: 22,
  fontSize: "0.6875rem",
  color: COLORS.white,
  bgcolor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 1,
  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
};

export const InfoBar: Sx = {
  px: { xs: 2, md: 4 },
  py: 1.5,
  display: "flex",
  alignItems: "center",
  gap: 3,
  bgcolor: COLORS.white,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  flexWrap: "wrap",
};

export const CategoriaHeader: Sx = { display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 };

export const ArtigosGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
  gap: 2,
  mb: 4,
};

export const ArtigoCard: Sx = {
  p: 2,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "box-shadow .15s",
  "&:hover": { boxShadow: "0 8px 20px rgba(17,24,39,0.08)" },
};

export const CategoriaTag: Sx = { height: 18, fontSize: "0.5625rem", bgcolor: COLORS.gray[100], color: COLORS.gray[700], borderRadius: 999 };

export const CtaIa: Sx = {
  p: { xs: 3, md: 4 },
  borderRadius: 2,
  color: COLORS.white,
  background: `linear-gradient(90deg, ${COLORS.primary[900]} 0%, ${COLORS.primary[800]} 60%, ${COLORS.primary[700]} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 3,
  mb: 5,
};

export const LinksGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
  gap: 2.5,
};

export const LinkItem: Sx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 1.5,
  py: 1.25,
  mb: 1,
  borderRadius: 1.5,
  border: `1px solid ${COLORS.gray[200]}`,
  fontSize: "0.8125rem",
};
