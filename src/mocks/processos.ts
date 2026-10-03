import { ProcessoStatus } from "@/enums";
import type { Processo } from "@/types/processo";

export const DEPARTAMENTOS = [
  "Financeiro",
  "Recursos Humanos",
  "Operações",
  "TI",
  "Marketing",
  "Jurídico",
];

const base: Processo[] = [
  {
    codigo: "FIN-001",
    titulo: "Processamento de Reembolso de Despesas",
    atualizadoEm: "12/05/2024",
    departamento: "Financeiro",
    responsavel: "Ana Silva",
    status: ProcessoStatus.Publicado,
    versao: "v2.4",
  },
  {
    codigo: "HR-012",
    titulo: "Onboarding de Novos Colaboradores",
    atualizadoEm: "15/05/2024",
    departamento: "Recursos Humanos",
    responsavel: "Carlos Mendes",
    status: ProcessoStatus.EmAprovacao,
    versao: "v3.1",
  },
  {
    codigo: "OPS-045",
    titulo: "Manutenção Preventiva de Equipamentos",
    atualizadoEm: "10/05/2024",
    departamento: "Operações",
    responsavel: "Roberto Souza",
    status: ProcessoStatus.Rascunho,
    versao: "v1.0",
  },
  {
    codigo: "TI-089",
    titulo: "Gestão de Incidentes Críticos",
    atualizadoEm: "08/05/2024",
    departamento: "TI",
    responsavel: "Mariana Costa",
    status: ProcessoStatus.Publicado,
    versao: "v4.0",
  },
  {
    codigo: "COM-023",
    titulo: "Fluxo de Aprovação de Campanhas",
    atualizadoEm: "20/04/2024",
    departamento: "Marketing",
    responsavel: "Juliana Lima",
    status: ProcessoStatus.Obsoleto,
    versao: "v2.0",
  },
  {
    codigo: "LEG-007",
    titulo: "Revisão de Contratos de Fornecedores",
    atualizadoEm: "14/05/2024",
    departamento: "Jurídico",
    responsavel: "Fernando Rocha",
    status: ProcessoStatus.Publicado,
    versao: "v2.1",
  },
];

// Repete a base para simular uma listagem maior com paginação
export const mockProcessos: Processo[] = Array.from({ length: 4 }, (_, lote) =>
  base.map((p) => ({
    ...p,
    codigo: lote === 0 ? p.codigo : `${p.codigo.split("-")[0]}-${String(100 * lote + Number(p.codigo.split("-")[1])).padStart(3, "0")}`,
  })),
).flat();

export const mockProcessosResumo = {
  total: 124,
  ativos: 86,
  aguardandoAprovacao: 12,
  rascunhos: 26,
};
