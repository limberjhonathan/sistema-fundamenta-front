import { TipoConteudo } from "@/enums";
import type { ResultadoBusca } from "@/types/processo";

export const mockBuscasRecentes = ["Onboarding", "LGPD compliance", "Solicitação de férias", "Dashboard de vendas"];

export const mockTiposFiltro = [
  { tipo: TipoConteudo.Processo, label: "Processos", total: 12 },
  { tipo: TipoConteudo.Documento, label: "Documentos", total: 28 },
  { tipo: TipoConteudo.Portal, label: "Portal", total: 42 },
  { tipo: TipoConteudo.IaInsights, label: "IA Insights", total: 8 },
];

export const mockTagsPopulares = ["LGPD", "Compliance", "Workflow", "BPMN", "Estratégia", "SLA"];

export const mockPodeInteressar = [
  "Como criar um novo processo?",
  "Manual de faturamento mensal",
  "Organograma da empresa",
  "Políticas de home office",
];

export const mockResultadosBusca: ResultadoBusca[] = [
  {
    id: "#0001",
    tipo: TipoConteudo.Processo,
    comIa: true,
    titulo: "Processo de Onboarding de Novos Colaboradores",
    descricao: "Manual detalhado e fluxo BPMN para integração de novos talentos na Fundamenta, cobrindo desde o primeiro dia até o encerramento do primeiro mês.",
    departamento: "Recursos Humanos",
    atualizado: "Atualizado 2 dias atrás",
    autor: "Mariana Silva",
    tags: ["#RH", "#Onboarding", "#Treinamento"],
    relevancia: 95,
  },
  {
    id: "#0002",
    tipo: TipoConteudo.Documento,
    titulo: "Diretrizes de Segurança da Informação v2.4",
    descricao: "Documentação técnica sobre protocolos de segurança, gerenciamento de acessos e conformidade com a LGPD para sistemas internos.",
    departamento: "Tecnologia",
    atualizado: "Atualizado 1 semana atrás",
    autor: "Ricardo Santos",
    tags: ["#Segurança", "#LGPD", "#TI"],
    relevancia: 88,
  },
  {
    id: "#0003",
    tipo: TipoConteudo.Portal,
    titulo: "Manual do Portal do Conhecimento",
    descricao: "Guia completo sobre como utilizar o portal do conhecimento Fundamenta, criar artigos e buscar informações estratégicas.",
    departamento: "Gestão do Conhecimento",
    atualizado: "Atualizado 3 dias atrás",
    autor: "Ana Clara",
    tags: ["#Portal", "#Guia", "#Sistemas"],
    relevancia: 80,
  },
  {
    id: "#0004",
    tipo: TipoConteudo.Processo,
    comIa: true,
    titulo: "Workflow de Aprovação de Capex",
    descricao: "Processo automatizado para solicitação e aprovação de despesas de capital, integrando os departamentos financeiro e gerência executiva.",
    departamento: "Financeiro",
    atualizado: "Atualizado Ontem",
    autor: "João Duarte",
    tags: ["#Financeiro", "#Capex", "#Aprovação"],
    relevancia: 74,
  },
  {
    id: "#0005",
    tipo: TipoConteudo.Documento,
    titulo: "Política de Viagens Corporativas 2024",
    descricao: "Normas e procedimentos para solicitações de passagens, reembolsos e estadias durante missões de trabalho oficiais.",
    departamento: "Administrativo",
    atualizado: "Atualizado 1 mês atrás",
    autor: "Carlos Eduardo",
    tags: ["#Viagens", "#Política", "#Administrativo"],
    relevancia: 70,
  },
];
