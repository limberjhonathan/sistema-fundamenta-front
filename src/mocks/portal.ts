import type { CategoriaPortal } from "@/types/processo";

export const mockSugestoesPortal = ["Fluxo de RH", "Faturamento", "Política de TI", "Manual de Marca"];

export const mockCategoriasPortal: CategoriaPortal[] = [
  {
    nome: "Recursos Humanos",
    artigos: [
      { categoria: "RH", titulo: "Onboarding de Talentos", descricao: "Fluxo completo de integração para novos colaboradores, desde a contratação até o primeiro mês.", atualizado: "Atu. 2 dias atrás", nota: 4.8, novo: true },
      { categoria: "RH", titulo: "Solicitação de Férias", descricao: "Procedimento padrão para solicitação e aprovação de períodos de descanso", atualizado: "Atu. 1 semana atrás", nota: 4.5 },
      { categoria: "RH", titulo: "Avaliação de Desempenho 360°", descricao: "Diretrizes e formulários para o ciclo semestral de feedback e metas corporativas.", atualizado: "Atu. 3 semanas atrás", nota: 4.9 },
    ],
  },
  {
    nome: "Operações & Logística",
    artigos: [
      { categoria: "Operações", titulo: "Gestão de Inventário", descricao: "Controle de entrada e saída de ativos físicos e materiais de escritório.", atualizado: "Atu. Ontem", nota: 4.7 },
      { categoria: "Operações", titulo: "Manutenção Preventiva", descricao: "Cronograma e checklist para verificação técnica de equipamentos críticos.", atualizado: "Atu. 5 dias atrás", nota: 4.2 },
    ],
  },
  {
    nome: "Financeiro",
    artigos: [
      { categoria: "Financeiro", titulo: "Reembolso de Despesas", descricao: "Processo para prestação de contas de viagens e gastos corporativos autorizados.", atualizado: "Atu. 4 dias atrás", nota: 4.6, novo: true },
      { categoria: "Financeiro", titulo: "Aprovação de Orçamento", descricao: "Fluxo de submissão de propostas orçamentárias para novos projetos.", atualizado: "Atu. 2 semanas atrás", nota: 4.4 },
    ],
  },
];

export const mockDocumentacaoExterna = [
  "Manual de Normas ABNT 2024",
  "Portal do Governo Federal - BPM",
  "Guia de Boas Práticas - ISO 9001",
];

export const mockMaisVistos = [
  { titulo: "Política de Home Office", acessos: "2.4k" },
  { titulo: "Código de Ética e Conduta", acessos: "1.8k" },
  { titulo: "Manual do Gestor Fundamenta", acessos: "1.2k" },
];
