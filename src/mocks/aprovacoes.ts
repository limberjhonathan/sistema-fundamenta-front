import { AprovacaoStatus } from "@/enums";
import type { Aprovacao } from "@/types/processo";

export const mockAprovacoesResumo = {
  pendentes: "12",
  urgentes: "03",
  aprovadosHoje: "08",
  tempoMedio: "4.2h",
};

export const mockAprovacoes: Aprovacao[] = [
  {
    id: "APR-001",
    titulo: "Onboarding de Fornecedores Externos",
    status: AprovacaoStatus.Urgente,
    versao: "v2.4.0",
    departamento: "Suprimentos",
    descricao: "Atualização crítica no fluxo de compliance para novos fornecedores internacionais",
    solicitante: "Mariana Silva",
    cargo: "Analista de Compras",
    solicitadoEm: "2024-05-20",
  },
  {
    id: "APR-002",
    titulo: "Reembolso de Despesas de Viagem",
    status: AprovacaoStatus.Pendente,
    versao: "v1.1.2",
    departamento: "Financeiro",
    descricao: "Inclusão de nova regra para dedução de impostos em viagens para a América Latina.",
    solicitante: "Carlos Oliveira",
    cargo: "Coordenador Financeiro",
    solicitadoEm: "2024-05-19",
  },
  {
    id: "APR-003",
    titulo: "Solicitação de Acesso a Sistemas",
    status: AprovacaoStatus.Pendente,
    versao: "v3.0.1",
    departamento: "Tecnologia",
    descricao: "Padronização do fluxo de aprovação automática para softwares de produtividade",
    solicitante: "Roberto Santos",
    cargo: "Gerente de TI",
    solicitadoEm: "2024-05-18",
  },
  {
    id: "APR-004",
    titulo: "Gestão de Contratos Jurídicos",
    status: AprovacaoStatus.Pendente,
    versao: "v2.2.0",
    departamento: "Jurídico",
    descricao: "Revisão das cláusulas de confidencialidade padrão para prestadores de serviços de consultoria.",
    solicitante: "Ana Paula Costa",
    cargo: "Advogada Senior",
    solicitadoEm: "2024-05-17",
  },
];
