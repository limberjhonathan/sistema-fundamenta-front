import type { Ferramenta } from "../store/useModelagemStore";

export type ItemPaleta =
  | { id: string; tipo: "ferramenta"; ferramenta: Exclude<Ferramenta, null>; icone: string; titulo: string; atalho?: string }
  | {
      id: string;
      tipo: "criar";
      /** Tipo BPMN a criar; "participante" e "subprocesso" têm criação especial */
      bpmn: string;
      icone: string;
      titulo: string;
      descricao: string;
    };

export type GrupoPaleta = { titulo: string; itens: ItemPaleta[] };

/** Paleta própria do Fundamenta (substitui a paleta padrão do bpmn-js). */
export const GRUPOS_PALETA: GrupoPaleta[] = [
  {
    titulo: "Ferramentas",
    itens: [
      { id: "mao", tipo: "ferramenta", ferramenta: "hand", icone: "bpmn-icon-hand-tool", titulo: "Mover tela", atalho: "H" },
      { id: "laco", tipo: "ferramenta", ferramenta: "lasso", icone: "bpmn-icon-lasso-tool", titulo: "Selecionar área", atalho: "L" },
      { id: "espaco", tipo: "ferramenta", ferramenta: "space", icone: "bpmn-icon-space-tool", titulo: "Abrir/fechar espaço", atalho: "S" },
      { id: "conectar", tipo: "ferramenta", ferramenta: "global-connect", icone: "bpmn-icon-connection-multi", titulo: "Conectar elementos", atalho: "C" },
    ],
  },
  {
    titulo: "Eventos",
    itens: [
      { id: "inicio", tipo: "criar", bpmn: "bpmn:StartEvent", icone: "bpmn-icon-start-event-none", titulo: "Início", descricao: "Onde o processo começa" },
      {
        id: "intermediario",
        tipo: "criar",
        bpmn: "bpmn:IntermediateThrowEvent",
        icone: "bpmn-icon-intermediate-event-none",
        titulo: "Intermediário",
        descricao: "Algo que acontece no meio do fluxo",
      },
      { id: "fim", tipo: "criar", bpmn: "bpmn:EndEvent", icone: "bpmn-icon-end-event-none", titulo: "Fim", descricao: "Resultado final do processo" },
    ],
  },
  {
    titulo: "Atividades",
    itens: [
      { id: "tarefa", tipo: "criar", bpmn: "bpmn:Task", icone: "bpmn-icon-task", titulo: "Tarefa", descricao: "Uma etapa de trabalho" },
      { id: "usuario", tipo: "criar", bpmn: "bpmn:UserTask", icone: "bpmn-icon-user-task", titulo: "Tarefa de usuário", descricao: "Executada por uma pessoa no sistema" },
      { id: "servico", tipo: "criar", bpmn: "bpmn:ServiceTask", icone: "bpmn-icon-service-task", titulo: "Tarefa de serviço", descricao: "Executada automaticamente por um sistema" },
      { id: "subprocesso", tipo: "criar", bpmn: "subprocesso", icone: "bpmn-icon-subprocess-expanded", titulo: "Subprocesso", descricao: "Agrupa um fluxo interno" },
    ],
  },
  {
    titulo: "Decisões",
    itens: [
      { id: "xor", tipo: "criar", bpmn: "bpmn:ExclusiveGateway", icone: "bpmn-icon-gateway-xor", titulo: "Decisão exclusiva", descricao: "Segue apenas um caminho" },
      { id: "paralelo", tipo: "criar", bpmn: "bpmn:ParallelGateway", icone: "bpmn-icon-gateway-parallel", titulo: "Paralelo", descricao: "Divide ou junta caminhos simultâneos" },
    ],
  },
  {
    titulo: "Dados e organização",
    itens: [
      { id: "dado", tipo: "criar", bpmn: "bpmn:DataObjectReference", icone: "bpmn-icon-data-object", titulo: "Documento", descricao: "Informação usada ou gerada" },
      { id: "repositorio", tipo: "criar", bpmn: "bpmn:DataStoreReference", icone: "bpmn-icon-data-store", titulo: "Base de dados", descricao: "Sistema ou repositório" },
      { id: "pool", tipo: "criar", bpmn: "participante", icone: "bpmn-icon-participant", titulo: "Pool / raias", descricao: "Organiza responsáveis" },
      { id: "anotacao", tipo: "criar", bpmn: "bpmn:TextAnnotation", icone: "bpmn-icon-text-annotation", titulo: "Anotação", descricao: "Comentário no diagrama" },
      { id: "grupo", tipo: "criar", bpmn: "bpmn:Group", icone: "bpmn-icon-group", titulo: "Grupo", descricao: "Destaca uma área do fluxo" },
    ],
  },
];

export const ATALHOS = [
  { grupo: "Edição", itens: [
    { acao: "Desfazer", teclas: ["Ctrl", "Z"] },
    { acao: "Refazer", teclas: ["Ctrl", "Y"] },
    { acao: "Copiar / colar", teclas: ["Ctrl", "C / V"] },
    { acao: "Excluir seleção", teclas: ["Delete"] },
    { acao: "Renomear elemento", teclas: ["E"] },
    { acao: "Selecionar tudo", teclas: ["Ctrl", "A"] },
  ] },
  { grupo: "Ferramentas", itens: [
    { acao: "Mover tela", teclas: ["H"] },
    { acao: "Selecionar área", teclas: ["L"] },
    { acao: "Abrir/fechar espaço", teclas: ["S"] },
    { acao: "Conectar elementos", teclas: ["C"] },
    { acao: "Trocar tipo do elemento", teclas: ["R"] },
  ] },
  { grupo: "Navegação", itens: [
    { acao: "Mover a tela", teclas: ["Espaço", "arrastar"] },
    { acao: "Zoom", teclas: ["Ctrl", "scroll"] },
    { acao: "Rolar horizontalmente", teclas: ["Shift", "scroll"] },
  ] },
];
