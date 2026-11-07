/** Dados do processo aberto no designer (mock até existir API). */
export const mockProcessoModelagem = {
  codigo: "CRED-014",
  titulo: "Solicitação de Crédito Imobiliário",
  departamento: "Financeiro",
  macroprocesso: "Gestão Financeira",
  dono: "Ana Silva",
  versao: "v2.4.1",
  status: "Rascunho",
  versaoPublicada: "v2.4.0",
  atualizadoPor: "João Duarte",
  objetivo: "Analisar e responder pedidos de crédito imobiliário em até 5 dias úteis, com risco controlado.",
};

export const mockColaboradores = [
  { nome: "João Duarte", cor: "#0F8A62", online: true },
  { nome: "Ana Silva", cor: "#7DB632", online: true },
  { nome: "Mariana Costa", cor: "#14231F", online: false },
];

export type SugestaoIa = {
  id: string;
  categoria: "Automação" | "Conformidade" | "Melhoria de fluxo";
  titulo: string;
  texto: string;
  impacto: string;
  /** Elemento do diagrama relacionado (para focar ao clicar) */
  elementoId?: string;
  confianca: number;
};

export const mockSugestoesIa: SugestaoIa[] = [
  {
    id: "s1",
    categoria: "Automação",
    titulo: "Ler documentos com OCR",
    texto: "“Analisar documentação” leva em média 4h. Extrair os dados do RG, renda e matrícula por OCR antes da análise reduz para ~15 min.",
    impacto: "-3h45 por solicitação",
    elementoId: "Tarefa_AnalisarDocs",
    confianca: 92,
  },
  {
    id: "s2",
    categoria: "Conformidade",
    titulo: "Tratar score negativo",
    texto: "Não há caminho para quando o score de crédito vem negativo ou indisponível. Adicione um evento de erro em “Consultar score de crédito”.",
    impacto: "Exigência da política de crédito",
    elementoId: "Tarefa_ConsultarScore",
    confianca: 88,
  },
  {
    id: "s3",
    categoria: "Melhoria de fluxo",
    titulo: "Limitar o retrabalho",
    texto: "O ciclo “Corrigir pendências” não tem limite. Após 2 devoluções, encaminhe para atendimento humano para evitar abandono.",
    impacto: "-18% de desistências",
    elementoId: "Tarefa_Corrigir",
    confianca: 74,
  },
];

export const mockComentarios = [
  {
    id: "c1",
    autor: "Ana Silva",
    quando: "Hoje, 10:12",
    texto: "Precisamos confirmar com o Jurídico se a matrícula do imóvel pode ser enviada digitalmente.",
    elemento: "Enviar documentos",
  },
  {
    id: "c2",
    autor: "Mariana Costa",
    quando: "Ontem, 17:40",
    texto: "A integração com o bureau de crédito já está pronta em homologação.",
    elemento: "Consultar score de crédito",
  },
];

export const mockVersoes = [
  { versao: "v2.4.1", status: "Rascunho", autor: "João Duarte", data: "Hoje, 14:32", resumo: "Raia do sistema e retrabalho de pendências", atual: true },
  { versao: "v2.4.0", status: "Publicada", autor: "Ana Silva", data: "12/05/2024", resumo: "Parecer final passa a ser do analista" },
  { versao: "v2.3.0", status: "Arquivada", autor: "Carlos Mendes", data: "02/03/2024", resumo: "Inclusão da consulta automática de score" },
  { versao: "v1.0.0", status: "Arquivada", autor: "Ana Silva", data: "10/11/2023", resumo: "Primeira versão mapeada" },
];
