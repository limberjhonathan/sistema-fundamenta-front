import { AprovacaoStatus, Prioridade, ProcessoStatus } from "@/enums";
import { COLORS } from "@/styles/colors";

export type StatusStyle = { label: string; color: string; bg: string; border: string };

export const PROCESSO_STATUS: Record<ProcessoStatus, StatusStyle> = {
  [ProcessoStatus.Publicado]: {
    label: "Publicado",
    color: COLORS.accent.greenDark,
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
  [ProcessoStatus.EmAprovacao]: {
    label: "Em Aprovação",
    color: COLORS.accent.orangeDark,
    bg: "#FFFBEB",
    border: "#FDE68A",
  },
  [ProcessoStatus.Rascunho]: {
    label: "Rascunho",
    color: COLORS.gray[600],
    bg: COLORS.gray[100],
    border: COLORS.gray[300],
  },
  [ProcessoStatus.Obsoleto]: {
    label: "Obsoleto",
    color: COLORS.accent.redDark,
    bg: "#FEF2F2",
    border: "#FECACA",
  },
};

export const PRIORIDADE: Record<Prioridade, StatusStyle> = {
  [Prioridade.Alta]: { label: "Alta", color: COLORS.accent.redDark, bg: "#FEF2F2", border: "#FCA5A5" },
  [Prioridade.Media]: { label: "Média", color: COLORS.accent.orangeDark, bg: "#FFFBEB", border: "#FCD34D" },
  [Prioridade.Baixa]: { label: "Baixa", color: COLORS.accent.greenDark, bg: "#ECFDF5", border: "#6EE7B7" },
};

export const APROVACAO_STATUS: Record<AprovacaoStatus, StatusStyle> = {
  [AprovacaoStatus.Urgente]: { label: "Urgente", color: COLORS.accent.redDark, bg: "#FEF2F2", border: "#FCA5A5" },
  [AprovacaoStatus.Pendente]: { label: "Pendente", color: COLORS.accent.orangeDark, bg: "#FFFBEB", border: "#FCD34D" },
};
