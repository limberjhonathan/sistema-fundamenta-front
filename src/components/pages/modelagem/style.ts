import type { Sx } from "@/styles/sx";
import { BRAND, COLORS } from "@/styles/colors";
import { HEADER_HEIGHT } from "@/components/shared/Header/style";
import { MOBILE_NAV_HEIGHT } from "@/components/shared/navigation/MobileBottomNav/style";

export const PAINEL_LARGURA = 340;

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ───────────── Página ───────────── */

export const Page: Sx = {
  display: "flex",
  flexDirection: "column",
  height: {
    xs: `calc(100dvh - ${HEADER_HEIGHT + MOBILE_NAV_HEIGHT}px)`,
    md: `calc(100dvh - ${HEADER_HEIGHT}px)`,
  },
  bgcolor: COLORS.gray[50],
};

export const Body = (painelAberto: boolean): Sx => ({
  flex: 1,
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: painelAberto ? `minmax(0, 1fr) ${PAINEL_LARGURA}px` : "minmax(0, 1fr) 0px" },
  transition: "grid-template-columns .2s ease",
});

/* ───────────── Cabeçalho ───────────── */

export const Header: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: { xs: 1.5, md: 2 },
  minHeight: 64,
  bgcolor: COLORS.white,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
};

export const Breadcrumb: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: "0.75rem",
  color: COLORS.gray[500],
  "& a": { color: "inherit", textDecoration: "none", "&:hover": { color: COLORS.primary[600] } },
};

export const Titulo: Sx = {
  fontFamily: "var(--font-space-grotesk)",
  fontSize: "1.0625rem",
  fontWeight: 600,
  lineHeight: 1.2,
  color: BRAND.dark,
};

export const Codigo: Sx = {
  fontFamily: mono,
  fontSize: "0.6875rem",
  px: 0.75,
  py: 0.125,
  borderRadius: 0.75,
  bgcolor: COLORS.gray[100],
  color: COLORS.gray[600],
};

export const Abas: Sx = {
  bgcolor: COLORS.gray[100],
  p: 0.5,
  borderRadius: 2,
  "& .MuiToggleButton-root": {
    border: "none",
    px: 1.5,
    py: 0.5,
    gap: 0.75,
    fontSize: "0.8125rem",
    fontWeight: 600,
    textTransform: "none",
    color: COLORS.gray[600],
    borderRadius: "6px !important",
    "& svg": { fontSize: 16 },
  },
  "& .Mui-selected": {
    bgcolor: `${COLORS.white} !important`,
    color: `${BRAND.dark} !important`,
    boxShadow: "0 1px 3px rgba(20,35,31,0.12)",
  },
};

export const GrupoIcones: Sx = {
  display: "flex",
  alignItems: "center",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: 2,
  "& .MuiIconButton-root": { borderRadius: 1.5, p: 0.75 },
};

export const SalvoStatus = (alterado: boolean): Sx => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: "0.75rem",
  whiteSpace: "nowrap",
  color: alterado ? COLORS.accent.orangeDark : COLORS.gray[500],
  "& svg": { fontSize: 16 },
});

/* ───────────── Canvas ───────────── */

export const Canvas: Sx = {
  position: "relative",
  overflow: "hidden",
  minHeight: 0,
  bgcolor: "#F7FAF8",
  backgroundImage: `radial-gradient(${COLORS.gray[300]} 1px, transparent 1px)`,
  backgroundSize: "22px 22px",
};

/** Container onde o bpmn-js desenha: cores por categoria (markers do tema.ts) e componentes do editor. */
export const BpmnContainer: Sx = {
  position: "absolute",
  inset: 0,
  "--element-selected-outline-stroke-color": COLORS.primary[600],
  "--element-selected-outline-secondary-stroke-color": COLORS.primary[100],
  "--element-hover-outline-fill-color": COLORS.primary[100],
  "--context-pad-entry-hover-background-color": COLORS.primary[50],
  "--shape-attach-allowed-stroke-color": COLORS.primary[600],
  "--shape-connect-allowed-fill-color": COLORS.primary[50],
  "--shape-drop-allowed-fill-color": "rgba(22,168,120,0.06)",
  "--lasso-fill-color": "rgba(22,168,120,0.08)",
  "--lasso-stroke-color": COLORS.primary[600],
  "--snap-line-stroke-color": COLORS.primary[500],
  "--popup-background-color": COLORS.white,
  "--popup-border-color": COLORS.gray[200],
  "--popup-entry-hover-color": COLORS.primary[50],
  "--popup-header-entry-selected-color": COLORS.primary[600],
  "--popup-search-focus-border-color": COLORS.primary[600],
  "--color-text": BRAND.dark,

  // Remove a borda de foco que o navegador desenha em volta do canvas
  "& .djs-container, & .djs-container svg, & .bjs-container": { outline: "none !important" },

  // A paleta padrão é substituída pela ModelagemPaleta
  "& .djs-palette": { display: "none" },

  // Cores por categoria
  "& .fd-tarefa .djs-visual > rect, & .fd-subprocesso .djs-visual > rect": {
    stroke: `${COLORS.gray[300]} !important`,
    strokeWidth: "1.5px !important",
    filter: "drop-shadow(0 2px 4px rgba(20,35,31,0.08))",
  },
  "& .fd-tarefa .djs-visual > path": { stroke: `${COLORS.primary[700]} !important` },
  "& .fd-inicio .djs-visual > circle": { stroke: `${COLORS.primary[600]} !important`, fill: `${COLORS.accent.greenLight} !important`, strokeWidth: "2px !important" },
  "& .fd-fim .djs-visual > circle": { stroke: `${BRAND.dark} !important`, fill: `${COLORS.gray[100]} !important` },
  "& .fd-evento .djs-visual > circle": { stroke: `${COLORS.primary[700]} !important`, fill: `${COLORS.white} !important` },
  "& .fd-gateway .djs-visual > polygon": { stroke: `${COLORS.accent.limeDark} !important`, fill: "#F1FBE3 !important", strokeWidth: "1.5px !important" },
  "& .fd-gateway .djs-visual > path": { fill: `${BRAND.dark} !important`, stroke: `${BRAND.dark} !important` },
  "& .fd-pool > .djs-visual > rect, & .fd-raia > .djs-visual > rect": { stroke: `${COLORS.gray[300]} !important`, strokeWidth: "1px !important" },
  "& .fd-pool > .djs-visual > polyline": { stroke: `${COLORS.gray[300]} !important` },
  "& .fd-pool > .djs-visual > text, & .fd-raia > .djs-visual > text": {
    fill: `${COLORS.gray[600]} !important`,
    fontWeight: "600 !important",
    letterSpacing: "0.02em",
  },
  "& .fd-dado .djs-visual > path": { stroke: `${COLORS.gray[500]} !important` },

  // Conexões mais suaves
  "& .djs-connection .djs-visual > path": { stroke: `${COLORS.gray[500]} !important`, strokeWidth: "1.5px !important" },
  "& .djs-connection.selected .djs-visual > path, & .djs-connection.hover .djs-visual > path": { stroke: `${COLORS.primary[600]} !important` },

  // Menu de contexto (aparece ao lado do elemento selecionado)
  "& .djs-context-pad.open": {
    bgcolor: COLORS.white,
    border: `1px solid ${COLORS.gray[200]}`,
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(20,35,31,0.12)",
    p: "4px",
  },
  "& .djs-context-pad .entry": { borderRadius: "6px", color: COLORS.gray[700], "&:hover": { color: COLORS.primary[600] } },

  // Menu de troca de tipo e busca
  "& .djs-popup": {
    borderRadius: "12px",
    boxShadow: "0 16px 40px rgba(20,35,31,0.16)",
    overflow: "hidden",
    fontFamily: "var(--font-inter)",
  },

  // Edição de texto direto no elemento
  "& .djs-direct-editing-parent": { fontFamily: "var(--font-inter) !important", color: BRAND.dark },

  // Marca d'água do bpmn.io: exigida pela licença, fica discreta no canto
  "& .bjs-powered-by": { bottom: "60px !important", right: "16px !important", opacity: 0.35, zIndex: "1 !important" },
};

/* ───────────── Paleta ───────────── */

export const Paleta: Sx = {
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  gap: 0.25,
  p: 0.75,
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: 3,
  boxShadow: "0 8px 24px rgba(20,35,31,0.08)",
  maxHeight: "calc(100% - 32px)",
  overflowY: "auto",
  scrollbarWidth: "none",
};

export const PaletaSeparador: Sx = { height: 1, bgcolor: COLORS.gray[200], my: 0.5, mx: 0.5 };

export const PaletaItem = (ativo: boolean): Sx => ({
  width: 40,
  height: 40,
  borderRadius: 2,
  display: "grid",
  placeItems: "center",
  color: ativo ? COLORS.white : COLORS.gray[700],
  bgcolor: ativo ? BRAND.dark : "transparent",
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color .12s, color .12s",
  "& i": { fontSize: 22, lineHeight: 1 },
  "&:hover": { bgcolor: ativo ? BRAND.dark : COLORS.primary[50], color: ativo ? BRAND.lime : COLORS.primary[700] },
});

export const PaletaTooltip: Sx = { display: "flex", flexDirection: "column", gap: 0.25 };

/* ───────────── Controles flutuantes ───────────── */

export const Flutuante: Sx = {
  bgcolor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: 2.5,
  boxShadow: "0 8px 24px rgba(20,35,31,0.08)",
};

export const Zoom: Sx = {
  ...Flutuante,
  position: "absolute",
  bottom: 16,
  right: 16,
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  p: 0.5,
  "& .MuiIconButton-root": { borderRadius: 1.5 },
};

export const ZoomValor: Sx = {
  fontSize: "0.75rem",
  fontWeight: 600,
  minWidth: 48,
  textAlign: "center",
  borderRadius: 1.5,
  py: 0.5,
  color: COLORS.gray[700],
  "&:hover": { bgcolor: COLORS.gray[100] },
};

export const SugestaoIa: Sx = {
  position: "absolute",
  bottom: 16,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
  display: { xs: "none", sm: "flex" },
  alignItems: "center",
  gap: 1.25,
  pl: 0.75,
  pr: 0.5,
  py: 0.5,
  maxWidth: "min(520px, calc(100% - 260px))",
  borderRadius: 999,
  bgcolor: BRAND.dark,
  color: COLORS.white,
  boxShadow: "0 12px 32px rgba(20,35,31,0.28)",
};

export const SugestaoIaIcone: Sx = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  bgcolor: BRAND.lime,
  color: BRAND.dark,
  flexShrink: 0,
  "& svg": { fontSize: 16 },
};

export const Ferramenta: Sx = {
  position: "absolute",
  top: 16,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
  px: 1.5,
  py: 0.75,
  borderRadius: 999,
  bgcolor: BRAND.dark,
  color: COLORS.white,
  fontSize: "0.75rem",
  display: "flex",
  alignItems: "center",
  gap: 1,
  boxShadow: "0 8px 24px rgba(20,35,31,0.2)",
};

/* ───────────── Barra de status ───────────── */

export const StatusBar: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2,
  height: 36,
  fontSize: "0.75rem",
  color: COLORS.gray[600],
  bgcolor: COLORS.white,
  borderTop: `1px solid ${COLORS.gray[200]}`,
  "& .MuiButton-root": { fontSize: "0.75rem", minHeight: 0, py: 0.25, px: 1, color: COLORS.gray[700] },
};

export const ValidacaoBotao = (erros: number, avisos: number): Sx => ({
  color: `${erros ? COLORS.accent.redDark : avisos ? COLORS.accent.orangeDark : COLORS.accent.greenDark} !important`,
  bgcolor: erros ? COLORS.accent.redLight : avisos ? COLORS.accent.orangeLight : COLORS.accent.greenLight,
  borderRadius: 999,
  fontWeight: 600,
  "&:hover": { filter: "brightness(0.97)", bgcolor: erros ? COLORS.accent.redLight : avisos ? COLORS.accent.orangeLight : COLORS.accent.greenLight },
});

export const ProblemaItem: Sx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1,
  px: 1.5,
  py: 1,
  borderRadius: 1.5,
  textAlign: "left",
  width: "100%",
  justifyContent: "flex-start",
  "&:hover": { bgcolor: COLORS.gray[50] },
};

export const Tecla: Sx = {
  display: "inline-flex",
  alignItems: "center",
  px: 0.75,
  minWidth: 22,
  height: 22,
  justifyContent: "center",
  borderRadius: 0.75,
  border: `1px solid ${COLORS.gray[300]}`,
  borderBottomWidth: 2,
  bgcolor: COLORS.white,
  fontSize: "0.6875rem",
  fontFamily: mono,
  color: COLORS.gray[700],
};

/* ───────────── Painel (inspetor) ───────────── */

export const Painel: Sx = {
  display: { xs: "none", md: "flex" },
  flexDirection: "column",
  minWidth: 0,
  overflow: "hidden",
  bgcolor: COLORS.white,
  borderLeft: `1px solid ${COLORS.gray[200]}`,
};

export const PainelAbas: Sx = {
  minHeight: 44,
  px: 1,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  "& .MuiTab-root": { minHeight: 44, minWidth: 0, px: 1, fontSize: "0.8125rem", textTransform: "none", gap: 0.25 },
  "& .MuiTab-iconWrapper": { mr: "4px !important" },
};

export const PainelConteudo: Sx = { flex: 1, overflowY: "auto", minHeight: 0 };

export const PainelSecao: Sx = { px: 2.5, py: 2, borderBottom: `1px solid ${COLORS.gray[200]}` };

export const SecaoTitulo: Sx = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: COLORS.gray[500],
  mb: 1.5,
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  "& svg": { fontSize: 15 },
};

export const Label: Sx = { fontSize: "0.75rem", fontWeight: 600, color: COLORS.gray[700], mb: 0.5 };

export const ElementoCabecalho: Sx = {
  px: 2.5,
  py: 2,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  background: `linear-gradient(180deg, ${COLORS.gray[50]} 0%, ${COLORS.white} 100%)`,
};

export const ElementoIcone: Sx = {
  width: 44,
  height: 44,
  borderRadius: 2,
  display: "grid",
  placeItems: "center",
  bgcolor: BRAND.dark,
  color: BRAND.lime,
  flexShrink: 0,
  "& i": { fontSize: 26, lineHeight: 1 },
};

export const IdChip: Sx = { fontFamily: mono, fontSize: "0.6875rem", color: COLORS.gray[500] };

export const Campo: Sx = { "& .MuiInputBase-root": { fontSize: "0.8125rem" } };

export const InfoLinha: Sx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
  py: 0.875,
  fontSize: "0.8125rem",
  "&:not(:last-child)": { borderBottom: `1px dashed ${COLORS.gray[200]}` },
  "& > span:first-of-type": { color: COLORS.gray[500] },
  "& > span:last-of-type": { fontWeight: 600, textAlign: "right" },
};

export const Metricas: Sx = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 };

export const Metrica: Sx = {
  p: 1.25,
  borderRadius: 2,
  bgcolor: COLORS.gray[50],
  border: `1px solid ${COLORS.gray[200]}`,
};

export const MetricaValor: Sx = { fontFamily: "var(--font-space-grotesk)", fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.1 };

export const AutomacaoCard = (ativo: boolean): Sx => ({
  p: 1.5,
  borderRadius: 2,
  border: `1px solid ${ativo ? COLORS.primary[100] : COLORS.gray[200]}`,
  bgcolor: ativo ? COLORS.primary[50] : COLORS.white,
  display: "flex",
  alignItems: "flex-start",
  gap: 1.25,
});

export const SugestaoCard: Sx = {
  p: 1.75,
  borderRadius: 2,
  border: `1px solid ${COLORS.gray[200]}`,
  bgcolor: COLORS.white,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  transition: "border-color .15s",
  "&:hover": { borderColor: COLORS.primary[100] },
};

export const ComentarioCard: Sx = { display: "flex", gap: 1.25, py: 1.5, "&:not(:last-child)": { borderBottom: `1px solid ${COLORS.gray[200]}` } };

/* ───────────── Abas XML e Versões ───────────── */

export const Alternativa: Sx = { p: { xs: 2, md: 3 }, overflow: "auto", minHeight: 0 };

export const XmlBloco: Sx = {
  m: 0,
  borderRadius: 3,
  bgcolor: BRAND.dark,
  color: "#CFEBDD",
  fontSize: "0.8125rem",
  lineHeight: 1.75,
  overflow: "auto",
  fontFamily: mono,
  display: "grid",
  gridTemplateColumns: "auto 1fr",
};

export const XmlLinhas: Sx = {
  py: 2.5,
  px: 1.5,
  textAlign: "right",
  color: "rgba(255,255,255,0.28)",
  userSelect: "none",
  borderRight: "1px solid rgba(255,255,255,0.08)",
};

export const VersaoLinha = (atual: boolean): Sx => ({
  position: "relative",
  display: "flex",
  gap: 2,
  pb: 3,
  "&:before": {
    content: '""',
    position: "absolute",
    left: 11,
    top: 28,
    bottom: 0,
    width: 2,
    bgcolor: COLORS.gray[200],
  },
  "&:last-of-type:before": { display: "none" },
  "& .ponto": {
    width: 24,
    height: 24,
    borderRadius: "50%",
    flexShrink: 0,
    mt: 2,
    border: `3px solid ${atual ? COLORS.primary[600] : COLORS.gray[300]}`,
    bgcolor: atual ? COLORS.primary[50] : COLORS.white,
  },
});
