const TIPOS: Record<string, string> = {
  "bpmn:Process": "Processo",
  "bpmn:Collaboration": "Colaboração",
  "bpmn:StartEvent": "Evento de início",
  "bpmn:EndEvent": "Evento de fim",
  "bpmn:IntermediateThrowEvent": "Evento intermediário",
  "bpmn:IntermediateCatchEvent": "Evento intermediário",
  "bpmn:BoundaryEvent": "Evento de borda",
  "bpmn:Task": "Tarefa",
  "bpmn:UserTask": "Tarefa de usuário",
  "bpmn:ServiceTask": "Tarefa de serviço",
  "bpmn:ManualTask": "Tarefa manual",
  "bpmn:ScriptTask": "Tarefa de script",
  "bpmn:SendTask": "Tarefa de envio",
  "bpmn:ReceiveTask": "Tarefa de recebimento",
  "bpmn:BusinessRuleTask": "Regra de negócio",
  "bpmn:SubProcess": "Subprocesso",
  "bpmn:CallActivity": "Atividade de chamada",
  "bpmn:ExclusiveGateway": "Gateway exclusivo",
  "bpmn:ParallelGateway": "Gateway paralelo",
  "bpmn:InclusiveGateway": "Gateway inclusivo",
  "bpmn:EventBasedGateway": "Gateway baseado em evento",
  "bpmn:SequenceFlow": "Fluxo de sequência",
  "bpmn:MessageFlow": "Fluxo de mensagem",
  "bpmn:Association": "Associação",
  "bpmn:TextAnnotation": "Anotação",
  "bpmn:DataObjectReference": "Objeto de dados",
  "bpmn:DataStoreReference": "Repositório de dados",
  "bpmn:Participant": "Participante (pool)",
  "bpmn:Lane": "Raia",
  "bpmn:Group": "Grupo",
};

/** Ícone da fonte bpmn-font (já importada pelo canvas) para cada tipo. */
const ICONES: Record<string, string> = {
  "bpmn:StartEvent": "bpmn-icon-start-event-none",
  "bpmn:EndEvent": "bpmn-icon-end-event-none",
  "bpmn:IntermediateThrowEvent": "bpmn-icon-intermediate-event-none",
  "bpmn:IntermediateCatchEvent": "bpmn-icon-intermediate-event-none",
  "bpmn:Task": "bpmn-icon-task",
  "bpmn:UserTask": "bpmn-icon-user-task",
  "bpmn:ServiceTask": "bpmn-icon-service-task",
  "bpmn:ManualTask": "bpmn-icon-manual-task",
  "bpmn:ScriptTask": "bpmn-icon-script-task",
  "bpmn:SendTask": "bpmn-icon-send-task",
  "bpmn:ReceiveTask": "bpmn-icon-receive-task",
  "bpmn:BusinessRuleTask": "bpmn-icon-business-rule-task",
  "bpmn:SubProcess": "bpmn-icon-subprocess-expanded",
  "bpmn:CallActivity": "bpmn-icon-call-activity",
  "bpmn:ExclusiveGateway": "bpmn-icon-gateway-xor",
  "bpmn:ParallelGateway": "bpmn-icon-gateway-parallel",
  "bpmn:InclusiveGateway": "bpmn-icon-gateway-or",
  "bpmn:EventBasedGateway": "bpmn-icon-gateway-eventbased",
  "bpmn:SequenceFlow": "bpmn-icon-connection",
  "bpmn:TextAnnotation": "bpmn-icon-text-annotation",
  "bpmn:DataObjectReference": "bpmn-icon-data-object",
  "bpmn:DataStoreReference": "bpmn-icon-data-store",
  "bpmn:Participant": "bpmn-icon-participant",
  "bpmn:Lane": "bpmn-icon-lane",
  "bpmn:Group": "bpmn-icon-group",
};

export const nomeDoTipo = (tipo: string) => TIPOS[tipo] ?? tipo.replace("bpmn:", "");

export const iconeDoTipo = (tipo: string) => ICONES[tipo] ?? "bpmn-icon-task-none";

/** Atividades (tarefas e subprocessos) recebem SLA, sistema e sugestões de automação no painel. */
export const ehAtividade = (tipo: string) => /Task$|SubProcess$|CallActivity$/.test(tipo);

export const ehGateway = (tipo: string) => /Gateway$/.test(tipo);

/** Tipos para os quais o painel oferece "trocar tipo" (substituição via bpmnReplace). */
export const TIPOS_TAREFA = [
  "bpmn:Task",
  "bpmn:UserTask",
  "bpmn:ServiceTask",
  "bpmn:ManualTask",
  "bpmn:BusinessRuleTask",
  "bpmn:SendTask",
  "bpmn:ReceiveTask",
  "bpmn:ScriptTask",
];

export const TIPOS_GATEWAY = ["bpmn:ExclusiveGateway", "bpmn:ParallelGateway", "bpmn:InclusiveGateway", "bpmn:EventBasedGateway"];
