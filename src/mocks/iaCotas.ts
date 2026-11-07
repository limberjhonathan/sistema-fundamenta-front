import { RecursoIa } from "@/enums";
import type { ConfiguracaoIa, ConsumidorIa, ConsumoRecursoIa, CotaDepartamento } from "@/types/organizacao";

export const mockPlanoIa = {
  nome: "Plano Corporativo",
  creditosMes: 20000,
  usados: 13480,
  renovacao: "01/12",
  diasParaRenovar: 24,
  requisicoes: 4812,
  horasEconomizadas: 312,
  variacaoMes: "+18%",
};

/** Consumo diário (créditos) dos últimos 30 dias. */
export const mockConsumoDiario = {
  dias: Array.from({ length: 30 }, (_, i) => String(i + 1).padStart(2, "0")),
  valores: [
    320, 410, 380, 520, 610, 180, 140, 450, 520, 560, 590, 640, 210, 160, 480, 530, 610, 700, 680, 230, 190, 560, 620,
    590, 710, 760, 240, 200, 640, 690,
  ],
};

export const mockConsumoRecurso: ConsumoRecursoIa[] = [
  { recurso: RecursoIa.Assistente, creditos: 6120, requisicoes: 3105 },
  { recurso: RecursoIa.NovoComIa, creditos: 4210, requisicoes: 342 },
  { recurso: RecursoIa.Modelagem, creditos: 2150, requisicoes: 861 },
  { recurso: RecursoIa.Busca, creditos: 1000, requisicoes: 504 },
];

export const mockCotasDepartamento: CotaDepartamento[] = [
  { departamento: "Operações", limite: 6000, usado: 5420 },
  { departamento: "Financeiro", limite: 3000, usado: 1980 },
  { departamento: "Recursos Humanos", limite: 3000, usado: 2310 },
  { departamento: "TI", limite: 4000, usado: 2050 },
  { departamento: "Marketing", limite: 2000, usado: 1240 },
  { departamento: "Jurídico", limite: 1000, usado: 480 },
];

export const mockTopConsumidores: ConsumidorIa[] = [
  { nome: "Roberto Souza", departamento: "Operações", creditos: 1840 },
  { nome: "Carlos Mendes", departamento: "Recursos Humanos", creditos: 1325 },
  { nome: "Lucas Ferreira", departamento: "TI", creditos: 1010 },
  { nome: "Vanessa Prado", departamento: "Operações", creditos: 940 },
  { nome: "Ana Silva", departamento: "Financeiro", creditos: 760 },
];

export const mockConfiguracoesIa: ConfiguracaoIa[] = [
  { chave: "assistente", titulo: "Assistente para todos os perfis", descricao: "Leitores também podem conversar com a IA.", ativo: true },
  { chave: "sugestoes", titulo: "Sugestões automáticas na modelagem", descricao: "A IA analisa o fluxo e sugere melhorias e automações.", ativo: true },
  { chave: "resumo-busca", titulo: "Resumo inteligente na busca", descricao: "Gera um resumo dos resultados no topo da busca.", ativo: true },
  { chave: "alerta", titulo: "Alertar gestores ao atingir 80% da cota", descricao: "Envia um aviso ao gestor do departamento.", ativo: true },
  { chave: "bloqueio", titulo: "Bloquear uso ao atingir 100% da cota", descricao: "Sem bloqueio, o excedente é cobrado na próxima fatura.", ativo: false },
];
