import { Prioridade, ProcessoStatus } from "@/enums";
import type { Atividade, TarefaGestao } from "@/types/processo";

export const mockKpisGestor = [
  { titulo: "Processos Ativos", valor: "42", variacao: "+12%", positivo: true, descricao: "Aumento em relação ao mês anterior", icone: "pulse" },
  { titulo: "Tempo Médio de Ciclo", valor: "4.2 dias", variacao: "-15%", positivo: true, descricao: "Redução na latência operacional", icone: "clock" },
  { titulo: "Taxa de Conformidade", valor: "98.5%", variacao: "+2.1%", positivo: true, descricao: "Aderência aos padrões BPMN", icone: "check" },
  { titulo: "Tarefas Pendentes", valor: "18", variacao: "-3", positivo: true, descricao: "Fila de aprovação atual", icone: "alert" },
] as const;

export const mockEficiencia = {
  "1M": { meses: ["S1", "S2", "S3", "S4"], valores: [78, 80, 79, 84] },
  "3M": { meses: ["Abr", "Mai", "Jun"], valores: [70, 78, 85] },
  "6M": { meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], valores: [65, 68, 72, 70, 78, 85] },
};

export const mockDistribuicaoSetor = [
  { id: 0, label: "Operações", value: 52 },
  { id: 1, label: "Financeiro", value: 24 },
  { id: 2, label: "Recursos Humanos", value: 32 },
  { id: 3, label: "TI", value: 20 },
];

export const mockTarefasGestao: TarefaGestao[] = [
  { id: 1, titulo: "Revisão: Processo de Onboarding V2", departamento: "Recursos Humanos", vence: "Hoje", status: "Pendente" },
  { id: 2, titulo: "Aprovação: Fluxo de Reembolso", departamento: "Financeiro", vence: "Amanhã", status: "Em Análise" },
  { id: 3, titulo: "Ajuste: SLA de Suporte Nível 1", departamento: "TI", vence: "24 Out", status: "Pendente" },
];

export const mockResumoGestor = [
  { titulo: "Nível de Maturidade BPM", valor: "Nível 4", complemento: "Gerenciado", icone: "target" },
  { titulo: "Automações Ativas", valor: "12", complemento: "Processos automatizados", icone: "bolt" },
  { titulo: "Última Revisão Geral", valor: "12 Out", complemento: "8 dias atrás", icone: "history" },
] as const;

export const mockAtividades: Atividade[] = [
  { id: 1, titulo: "Revisar Fluxograma: Solicitação de Férias", prazo: "Hoje, 17:00", prioridade: Prioridade.Alta },
  { id: 2, titulo: "Validar RACI do Processo de Onboarding", prazo: "Amanhã, 09:00", prioridade: Prioridade.Media },
  { id: 3, titulo: "Preencher Metadados: Gestão de Ativos", prazo: "22 Out, 14:00", prioridade: Prioridade.Baixa },
  { id: 4, titulo: "Aprovar Alteração: Reembolso de Despesas", prazo: "25 Out, 10:00", prioridade: Prioridade.Media, concluida: true },
];

export const mockAcessosRecentes = [
  { categoria: "Recursos Humanos", titulo: "Política de Trabalho Remoto", atualizado: "15/10/2023", favorito: true },
  { categoria: "Operações", titulo: "Solicitação de Suporte de TI", atualizado: "12/10/2023", favorito: false },
  { categoria: "Jurídico", titulo: "Manual de Compliance v2.1", atualizado: "05/10/2023", favorito: true },
];

export const mockResumoFuncionario = [
  { titulo: "Processos Criados", valor: "12" },
  { titulo: "Documentos Lidos", valor: "45" },
  { titulo: "Horas Salvas (IA)", valor: "28.5h", destaque: true },
  { titulo: "Nível de Engajamento", valor: "Ouro", medalha: true },
];

export const mockCreditosIa = { usados: 650, total: 1000, renovacaoDias: 12 };

export const mockAtividadeSemanal = {
  dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  valores: [400, 310, 520, 460, 610, 210, 150],
};

export const mockProcessosRecentes = [
  { titulo: "Onboarding de Fornecedores", status: ProcessoStatus.EmAprovacao, quando: "2h atrás" },
  { titulo: "Solicitação de Reembolso", status: ProcessoStatus.Publicado, quando: "5h atrás" },
  { titulo: "Gestão de Mudanças TI", status: ProcessoStatus.Rascunho, quando: "Ontem" },
];
