const TIPOS: Record<string, string> = {
  "bpmn:Process": "Processo",
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

export const nomeDoTipo = (tipo: string) => TIPOS[tipo] ?? tipo.replace("bpmn:", "");

/** Atividades (tarefas e subprocessos) recebem as configurações de IA/RACI no painel. */
export const ehAtividade = (tipo: string) => /Task$|SubProcess$|CallActivity$/.test(tipo);
