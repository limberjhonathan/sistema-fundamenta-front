import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";
import { mqTablet } from "@/utils/mediaQuery";

export const Page: Sx = {
  // Desktop: ocupa exatamente a tela, sem rolagem da página
  height: "100dvh",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  bgcolor: COLORS.gray[50],
  [mqTablet]: {
    height: "auto",
    minHeight: "100dvh",
    overflow: "visible",
    gridTemplateColumns: "1fr",
    bgcolor: COLORS.primary[600],
  },
};

export const FormSide: Sx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 4,
  py: 3,
  minHeight: 0,
  // Só rola internamente em telas muito baixas; o form fica centralizado via margin auto
  overflowY: "auto",
  "& > form": { my: "auto" },
  [mqTablet]: {
    overflowY: "visible",
    bgcolor: COLORS.gray[50],
    borderRadius: "20px 20px 0 0",
    mt: -2.5,
    position: "relative",
    px: 2.5,
    py: 4,
  },
};
