import { PerfilAcesso, UsuarioStatus } from "@/enums";
import { COLORS } from "@/styles/colors";
import type { StatusStyle } from "./processo";

export const USUARIO_STATUS: Record<UsuarioStatus, StatusStyle> = {
  [UsuarioStatus.Ativo]: { label: "Ativo", color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight, border: "#A3E2C4" },
  [UsuarioStatus.Convidado]: { label: "Convite pendente", color: COLORS.accent.orangeDark, bg: "#FFFBEB", border: "#FDE68A" },
  [UsuarioStatus.Inativo]: { label: "Inativo", color: COLORS.gray[600], bg: COLORS.gray[100], border: COLORS.gray[300] },
};

export const PERFIL_ACESSO: Record<PerfilAcesso, StatusStyle & { descricao: string }> = {
  [PerfilAcesso.Administrador]: {
    label: "Administrador",
    descricao: "Acesso total, incluindo configurações da organização",
    color: COLORS.white,
    bg: COLORS.primary[900],
    border: COLORS.primary[900],
  },
  [PerfilAcesso.Gestor]: {
    label: "Gestor",
    descricao: "Aprova processos e acompanha indicadores do departamento",
    color: COLORS.primary[700],
    bg: COLORS.primary[50],
    border: COLORS.primary[100],
  },
  [PerfilAcesso.Editor]: {
    label: "Editor",
    descricao: "Cria e modela processos, envia para aprovação",
    color: COLORS.gray[900],
    bg: "#F1FBE3",
    border: "#D5F2AE",
  },
  [PerfilAcesso.Leitor]: {
    label: "Leitor",
    descricao: "Consulta processos publicados e usa o assistente",
    color: COLORS.gray[700],
    bg: COLORS.white,
    border: COLORS.gray[300],
  },
};
