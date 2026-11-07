import { AcaoPermissao, DepartamentoStatus, ModuloSistema, RecursoIa, SituacaoCota, TipoMacroprocesso } from "@/enums";
import { BRAND, COLORS } from "@/styles/colors";
import type { StatusStyle } from "./processo";

export const DEPARTAMENTO_STATUS: Record<DepartamentoStatus, StatusStyle> = {
  [DepartamentoStatus.Ativo]: { label: "Ativo", color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight, border: "#A3E2C4" },
  [DepartamentoStatus.Inativo]: { label: "Inativo", color: COLORS.gray[600], bg: COLORS.gray[100], border: COLORS.gray[300] },
};

export const TIPO_MACROPROCESSO: Record<TipoMacroprocesso, StatusStyle & { descricao: string }> = {
  [TipoMacroprocesso.Gestao]: {
    label: "Gestão",
    descricao: "Direcionam a organização: estratégia, governança e melhoria contínua",
    color: COLORS.white,
    bg: BRAND.dark,
    border: BRAND.dark,
  },
  [TipoMacroprocesso.Finalistico]: {
    label: "Finalísticos",
    descricao: "Entregam valor diretamente ao cliente final",
    color: BRAND.dark,
    bg: BRAND.lime,
    border: COLORS.accent.limeDark,
  },
  [TipoMacroprocesso.Suporte]: {
    label: "Suporte",
    descricao: "Dão sustentação às demais áreas: pessoas, finanças, tecnologia",
    color: COLORS.primary[700],
    bg: COLORS.primary[50],
    border: COLORS.primary[100],
  },
};

export const MODULO_LABEL: Record<ModuloSistema, { label: string; descricao: string }> = {
  [ModuloSistema.Processos]: { label: "Processos", descricao: "Catálogo e ciclo de vida dos processos" },
  [ModuloSistema.Modelagem]: { label: "Modelagem", descricao: "Editor BPMN e versões" },
  [ModuloSistema.Aprovacoes]: { label: "Aprovações", descricao: "Fila de solicitações e decisões" },
  [ModuloSistema.Portal]: { label: "Portal", descricao: "Base de conhecimento e documentos" },
  [ModuloSistema.Assistente]: { label: "Assistente e IA", descricao: "Chat, Novo com IA e sugestões" },
  [ModuloSistema.Administracao]: { label: "Administração", descricao: "Usuários, departamentos e cotas" },
};

export const ACAO_LABEL: Record<AcaoPermissao, string> = {
  [AcaoPermissao.Visualizar]: "Visualizar",
  [AcaoPermissao.Criar]: "Criar",
  [AcaoPermissao.Editar]: "Editar",
  [AcaoPermissao.Excluir]: "Excluir",
  [AcaoPermissao.Aprovar]: "Aprovar",
};

export const RECURSO_IA: Record<RecursoIa, { label: string; cor: string }> = {
  [RecursoIa.Assistente]: { label: "Assistente", cor: COLORS.primary[600] },
  [RecursoIa.NovoComIa]: { label: "Novo com IA", cor: BRAND.dark },
  [RecursoIa.Modelagem]: { label: "Sugestões na modelagem", cor: COLORS.accent.limeDark },
  [RecursoIa.Busca]: { label: "Resumo da busca", cor: COLORS.gray[400] },
};

export const SITUACAO_COTA: Record<SituacaoCota, StatusStyle> = {
  [SituacaoCota.Normal]: { label: "Normal", color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight, border: "#A3E2C4" },
  [SituacaoCota.Atencao]: { label: "Atenção", color: COLORS.accent.orangeDark, bg: "#FFFBEB", border: "#FDE68A" },
  [SituacaoCota.Esgotada]: { label: "Esgotada", color: COLORS.accent.redDark, bg: "#FEF2F2", border: "#FECACA" },
};
