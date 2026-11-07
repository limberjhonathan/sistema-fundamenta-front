import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";

export const CadeiaCard: Sx = { p: { xs: 2, md: 3 }, borderRadius: 3, mb: 3 };

export const CadeiaHeader: Sx = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2.5, flexWrap: "wrap" };

export const CadeiaCorpo: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 72px" }, gap: 1.5, alignItems: "stretch" };

export const Faixa = (bg: string, color: string): Sx => ({
  borderRadius: 2,
  p: 1.5,
  bgcolor: bg,
  color,
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const FaixaTitulo: Sx = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.8,
};

export const FaixaItens: Sx = { display: "flex", gap: 1, flexWrap: "wrap" };

/** Item "seta" da cadeia finalística: cada etapa aponta para a próxima. */
export const Chevron = (ativo: boolean, primeiro: boolean): Sx => ({
  flex: { xs: "1 1 100%", sm: "1 1 0" },
  minHeight: 64,
  px: 3,
  py: 1.5,
  bgcolor: ativo ? BRAND.dark : BRAND.lime,
  color: ativo ? BRAND.lime : BRAND.dark,
  fontFamily: "var(--font-space-grotesk)",
  fontWeight: 600,
  fontSize: "0.9375rem",
  textAlign: "left",
  justifyContent: "flex-start",
  clipPath: {
    sm: primeiro
      ? "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)"
      : "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)",
  },
  borderRadius: { xs: 1.5, sm: 0 },
  transition: "background-color .15s, color .15s",
  "&:hover": { bgcolor: ativo ? BRAND.dark : "#A9E85A" },
});

export const Pilula = (ativo: boolean, escuro: boolean): Sx => ({
  px: 1.5,
  py: 0.75,
  borderRadius: 1.5,
  fontSize: "0.8125rem",
  fontWeight: 600,
  border: "1px solid",
  borderColor: escuro ? "rgba(255,255,255,0.18)" : COLORS.primary[100],
  bgcolor: ativo ? (escuro ? BRAND.lime : COLORS.primary[600]) : escuro ? "rgba(255,255,255,0.06)" : COLORS.white,
  color: ativo ? (escuro ? BRAND.dark : COLORS.white) : "inherit",
  transition: "all .15s",
  "&:hover": { borderColor: escuro ? BRAND.lime : COLORS.primary[600] },
});

export const Cliente: Sx = {
  display: { xs: "none", md: "flex" },
  borderRadius: 2,
  border: `1.5px dashed ${COLORS.gray[300]}`,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: COLORS.gray[500],
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};

export const ListaBar: Sx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  mb: 2,
  flexWrap: "wrap",
};

export const Accordion: Sx = {
  borderRadius: "12px !important",
  border: `1px solid ${COLORS.gray[200]}`,
  boxShadow: "none",
  mb: 1.5,
  "&:before": { display: "none" },
  "&.Mui-expanded": { borderColor: COLORS.primary[100], boxShadow: "0 8px 24px rgba(20,35,31,0.06)" },
};

export const AccordionResumo: Sx = {
  px: 2.5,
  "& .MuiAccordionSummary-content": { alignItems: "center", gap: 2, my: 1.5, minWidth: 0 },
};

export const Codigo: Sx = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.75rem", color: COLORS.gray[500] };

export const MacroNome: Sx = { fontFamily: "var(--font-space-grotesk)", fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.25 };

export const TipoChip = (cor: { color: string; bg: string; border: string }): Sx => ({
  height: 22,
  fontSize: "0.6875rem",
  fontWeight: 700,
  borderRadius: 1,
  color: cor.color,
  bgcolor: cor.bg,
  border: `1px solid ${cor.border}`,
});

export const MaturidadeDot = (preenchido: boolean): Sx => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  bgcolor: preenchido ? COLORS.primary[600] : COLORS.gray[200],
});

export const ProcessoLinha: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr auto", md: "90px 1fr 160px 150px auto" },
  alignItems: "center",
  gap: 2,
  px: 1.5,
  py: 1.25,
  borderRadius: 1.5,
  "&:hover": { bgcolor: COLORS.gray[50] },
};

export const SemProcessos: Sx = {
  p: 2,
  borderRadius: 2,
  border: `1.5px dashed ${COLORS.gray[300]}`,
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
};

export const FormGrid: Sx = { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" }, gap: 2 };

export const TipoOpcao = (selecionado: boolean): Sx => ({
  p: 1.5,
  borderRadius: 2,
  textAlign: "left",
  alignItems: "flex-start",
  border: `1.5px solid ${selecionado ? COLORS.primary[600] : COLORS.gray[200]}`,
  bgcolor: selecionado ? COLORS.primary[50] : COLORS.white,
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
});
