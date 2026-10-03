/** Diagrama de exemplo carregado quando não há nada salvo no navegador. */
export const DIAGRAMA_INICIAL = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_Credito" targetNamespace="http://fundamenta.app/bpmn">
  <bpmn:process id="Processo_Credito_Imobiliario" name="Solicitação de Crédito Imobiliário" isExecutable="false">
    <bpmn:startEvent id="Inicio" name="Solicitação recebida">
      <bpmn:outgoing>Fluxo_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_0v9x2k1" name="Analisar Documentação de Crédito">
      <bpmn:incoming>Fluxo_1</bpmn:incoming>
      <bpmn:outgoing>Fluxo_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Fim" name="Análise concluída">
      <bpmn:incoming>Fluxo_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Fluxo_1" sourceRef="Inicio" targetRef="Task_0v9x2k1" />
    <bpmn:sequenceFlow id="Fluxo_2" sourceRef="Task_0v9x2k1" targetRef="Fim" />
    <bpmn:textAnnotation id="Nota_1">
      <bpmn:text>Verificar validade do RG/CPF em até 48h</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Associacao_1" sourceRef="Task_0v9x2k1" targetRef="Nota_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="Diagrama_1">
    <bpmndi:BPMNPlane id="Plano_1" bpmnElement="Processo_Credito_Imobiliario">
      <bpmndi:BPMNShape id="Inicio_di" bpmnElement="Inicio">
        <dc:Bounds x="180" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0v9x2k1_di" bpmnElement="Task_0v9x2k1">
        <dc:Bounds x="290" y="178" width="140" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Fim_di" bpmnElement="Fim">
        <dc:Bounds x="510" y="200" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Nota_1_di" bpmnElement="Nota_1">
        <dc:Bounds x="400" y="70" width="170" height="44" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Fluxo_1_di" bpmnElement="Fluxo_1">
        <di:waypoint x="216" y="218" />
        <di:waypoint x="290" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_2_di" bpmnElement="Fluxo_2">
        <di:waypoint x="430" y="218" />
        <di:waypoint x="510" y="218" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Associacao_1_di" bpmnElement="Associacao_1">
        <di:waypoint x="400" y="178" />
        <di:waypoint x="450" y="114" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
