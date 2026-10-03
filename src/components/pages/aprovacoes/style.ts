import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const ResumoGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
  gap: 2,
  mb: 3,
};

export const ResumoCard: Sx = { p: 2, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 };

export const TabsBar: Sx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  mb: 3,
  flexWrap: "wrap",
};

export const CardsGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" },
  gap: 2.5,
};

export const AprovacaoCard: Sx = { p: 2.5, borderRadius: 2, display: "flex", flexDirection: "column" };

export const Id: Sx = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.6875rem", color: COLORS.gray[500] };

export const Titulo: Sx = { fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.2, my: 1 };

export const Versao: Sx = { height: 20, fontSize: "0.6875rem", borderRadius: 1, bgcolor: COLORS.white, border: `1px solid ${COLORS.gray[200]}` };

export const Descricao: Sx = {
  fontSize: "0.8125rem",
  color: COLORS.gray[600],
  my: 1.5,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const Solicitante: Sx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  pt: 1.5,
  mt: "auto",
  mb: 2,
  borderTop: `1px solid ${COLORS.gray[200]}`,
};
