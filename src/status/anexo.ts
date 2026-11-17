import { AnexoStatus, TipoAnexo } from "@/enums";
import { COLORS } from "@/styles/colors";
import type { StatusStyle } from "./processo";

export const ANEXO_STATUS: Record<AnexoStatus, StatusStyle> = {
  [AnexoStatus.Enviando]: { label: "Enviando", color: COLORS.gray[600], bg: COLORS.gray[100], border: COLORS.gray[300] },
  [AnexoStatus.Analisando]: { label: "IA analisando", color: COLORS.accent.orangeDark, bg: COLORS.accent.orangeLight, border: "#FDE68A" },
  [AnexoStatus.Lido]: { label: "Lido pela IA", color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight, border: "#A3E2C4" },
  [AnexoStatus.Erro]: { label: "Erro", color: COLORS.accent.redDark, bg: COLORS.accent.redLight, border: "#FECACA" },
};

/** Tons dessaturados para conviver com a paleta verde da marca sem competir com ela. */
export const TIPO_ANEXO: Record<TipoAnexo, { label: string; color: string; bg: string; leitura: string }> = {
  [TipoAnexo.Video]: { label: "Vídeo", color: "#5B4BC4", bg: "#EFECFB", leitura: "Transcrevendo o vídeo…" },
  [TipoAnexo.Audio]: { label: "Áudio", color: "#B23A6F", bg: "#FBEEF4", leitura: "Transcrevendo o áudio…" },
  [TipoAnexo.Planilha]: { label: "Planilha", color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight, leitura: "Interpretando colunas…" },
  [TipoAnexo.Documento]: { label: "Documento", color: "#2F5DB8", bg: "#EBF1FB", leitura: "Lendo o documento…" },
  [TipoAnexo.Imagem]: { label: "Imagem", color: COLORS.accent.orangeDark, bg: COLORS.accent.orangeLight, leitura: "Reconhecendo o conteúdo…" },
};
