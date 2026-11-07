/**
 * Diagrama de exemplo carregado quando não há nada salvo no navegador:
 * crédito imobiliário com 3 raias (cliente, analista e sistema), decisão e retrabalho.
 */
export const DIAGRAMA_INICIAL = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_Credito" targetNamespace="http://fundamenta.app/bpmn">
  <bpmn:collaboration id="Colaboracao_1">
    <bpmn:participant id="Pool_Credito" name="Crédito Imobiliário" processRef="Processo_Credito_Imobiliario" />
  </bpmn:collaboration>
  <bpmn:process id="Processo_Credito_Imobiliario" name="Solicitação de Crédito Imobiliário" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1">
      <bpmn:lane id="Raia_Cliente" name="Cliente">
        <bpmn:flowNodeRef>Inicio</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Tarefa_EnviarDocs</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Tarefa_Corrigir</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Fim</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Raia_Analista" name="Analista de Crédito">
        <bpmn:flowNodeRef>Tarefa_AnalisarDocs</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Docs</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Tarefa_Parecer</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Raia_Sistema" name="Sistema de Crédito">
        <bpmn:flowNodeRef>Tarefa_ConsultarScore</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Tarefa_Calcular</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Tarefa_Proposta</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:startEvent id="Inicio" name="Solicitação enviada">
      <bpmn:outgoing>Fluxo_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Tarefa_EnviarDocs" name="Enviar documentos">
      <bpmn:incoming>Fluxo_1</bpmn:incoming>
      <bpmn:outgoing>Fluxo_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="Tarefa_ConsultarScore" name="Consultar score de crédito">
      <bpmn:incoming>Fluxo_2</bpmn:incoming>
      <bpmn:outgoing>Fluxo_3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Tarefa_AnalisarDocs" name="Analisar documentação">
      <bpmn:documentation>Conferir RG/CPF, comprovante de renda e matrícula do imóvel. Pendências voltam para o cliente.</bpmn:documentation>
      <bpmn:incoming>Fluxo_3</bpmn:incoming>
      <bpmn:incoming>Fluxo_Retrabalho</bpmn:incoming>
      <bpmn:outgoing>Fluxo_4</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_Docs" name="Documentação aprovada?">
      <bpmn:incoming>Fluxo_4</bpmn:incoming>
      <bpmn:outgoing>Fluxo_Sim</bpmn:outgoing>
      <bpmn:outgoing>Fluxo_Nao</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="Tarefa_Corrigir" name="Corrigir pendências">
      <bpmn:incoming>Fluxo_Nao</bpmn:incoming>
      <bpmn:outgoing>Fluxo_Retrabalho</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="Tarefa_Calcular" name="Calcular condições do financiamento">
      <bpmn:incoming>Fluxo_Sim</bpmn:incoming>
      <bpmn:outgoing>Fluxo_5</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Tarefa_Parecer" name="Emitir parecer final">
      <bpmn:incoming>Fluxo_5</bpmn:incoming>
      <bpmn:outgoing>Fluxo_6</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sendTask id="Tarefa_Proposta" name="Enviar proposta ao cliente">
      <bpmn:incoming>Fluxo_6</bpmn:incoming>
      <bpmn:outgoing>Fluxo_7</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:endEvent id="Fim" name="Proposta recebida">
      <bpmn:incoming>Fluxo_7</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Fluxo_1" sourceRef="Inicio" targetRef="Tarefa_EnviarDocs" />
    <bpmn:sequenceFlow id="Fluxo_2" sourceRef="Tarefa_EnviarDocs" targetRef="Tarefa_ConsultarScore" />
    <bpmn:sequenceFlow id="Fluxo_3" sourceRef="Tarefa_ConsultarScore" targetRef="Tarefa_AnalisarDocs" />
    <bpmn:sequenceFlow id="Fluxo_4" sourceRef="Tarefa_AnalisarDocs" targetRef="Gateway_Docs" />
    <bpmn:sequenceFlow id="Fluxo_Sim" name="Sim" sourceRef="Gateway_Docs" targetRef="Tarefa_Calcular" />
    <bpmn:sequenceFlow id="Fluxo_Nao" name="Não" sourceRef="Gateway_Docs" targetRef="Tarefa_Corrigir" />
    <bpmn:sequenceFlow id="Fluxo_Retrabalho" sourceRef="Tarefa_Corrigir" targetRef="Tarefa_AnalisarDocs" />
    <bpmn:sequenceFlow id="Fluxo_5" sourceRef="Tarefa_Calcular" targetRef="Tarefa_Parecer" />
    <bpmn:sequenceFlow id="Fluxo_6" sourceRef="Tarefa_Parecer" targetRef="Tarefa_Proposta" />
    <bpmn:sequenceFlow id="Fluxo_7" sourceRef="Tarefa_Proposta" targetRef="Fim" />
    <bpmn:textAnnotation id="Nota_SLA">
      <bpmn:text>SLA da análise: 48h úteis</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Associacao_SLA" sourceRef="Tarefa_AnalisarDocs" targetRef="Nota_SLA" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="Diagrama_1">
    <bpmndi:BPMNPlane id="Plano_1" bpmnElement="Colaboracao_1">
      <bpmndi:BPMNShape id="Pool_Credito_di" bpmnElement="Pool_Credito" isHorizontal="true">
        <dc:Bounds x="160" y="80" width="1360" height="540" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Raia_Cliente_di" bpmnElement="Raia_Cliente" isHorizontal="true">
        <dc:Bounds x="190" y="80" width="1330" height="180" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Raia_Analista_di" bpmnElement="Raia_Analista" isHorizontal="true">
        <dc:Bounds x="190" y="260" width="1330" height="180" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Raia_Sistema_di" bpmnElement="Raia_Sistema" isHorizontal="true">
        <dc:Bounds x="190" y="440" width="1330" height="180" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Inicio_di" bpmnElement="Inicio">
        <dc:Bounds x="240" y="152" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="213" y="195" width="90" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_EnviarDocs_di" bpmnElement="Tarefa_EnviarDocs">
        <dc:Bounds x="330" y="130" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_ConsultarScore_di" bpmnElement="Tarefa_ConsultarScore">
        <dc:Bounds x="510" y="490" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_AnalisarDocs_di" bpmnElement="Tarefa_AnalisarDocs">
        <dc:Bounds x="680" y="310" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Docs_di" bpmnElement="Gateway_Docs" isMarkerVisible="true">
        <dc:Bounds x="850" y="325" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="830" y="382" width="90" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_Corrigir_di" bpmnElement="Tarefa_Corrigir">
        <dc:Bounds x="820" y="130" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_Calcular_di" bpmnElement="Tarefa_Calcular">
        <dc:Bounds x="960" y="490" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_Parecer_di" bpmnElement="Tarefa_Parecer">
        <dc:Bounds x="1110" y="310" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Tarefa_Proposta_di" bpmnElement="Tarefa_Proposta">
        <dc:Bounds x="1260" y="490" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Fim_di" bpmnElement="Fim">
        <dc:Bounds x="1440" y="152" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1424" y="118" width="68" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Nota_SLA_di" bpmnElement="Nota_SLA">
        <dc:Bounds x="540" y="100" width="150" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Fluxo_1_di" bpmnElement="Fluxo_1">
        <di:waypoint x="276" y="170" />
        <di:waypoint x="330" y="170" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_2_di" bpmnElement="Fluxo_2">
        <di:waypoint x="450" y="170" />
        <di:waypoint x="480" y="170" />
        <di:waypoint x="480" y="530" />
        <di:waypoint x="510" y="530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_3_di" bpmnElement="Fluxo_3">
        <di:waypoint x="630" y="530" />
        <di:waypoint x="655" y="530" />
        <di:waypoint x="655" y="350" />
        <di:waypoint x="680" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_4_di" bpmnElement="Fluxo_4">
        <di:waypoint x="800" y="350" />
        <di:waypoint x="850" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_Sim_di" bpmnElement="Fluxo_Sim">
        <di:waypoint x="900" y="350" />
        <di:waypoint x="930" y="350" />
        <di:waypoint x="930" y="530" />
        <di:waypoint x="960" y="530" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="936" y="420" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_Nao_di" bpmnElement="Fluxo_Nao">
        <di:waypoint x="875" y="325" />
        <di:waypoint x="875" y="210" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="882" y="262" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_Retrabalho_di" bpmnElement="Fluxo_Retrabalho">
        <di:waypoint x="820" y="170" />
        <di:waypoint x="740" y="170" />
        <di:waypoint x="740" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_5_di" bpmnElement="Fluxo_5">
        <di:waypoint x="1080" y="530" />
        <di:waypoint x="1170" y="530" />
        <di:waypoint x="1170" y="390" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_6_di" bpmnElement="Fluxo_6">
        <di:waypoint x="1230" y="350" />
        <di:waypoint x="1320" y="350" />
        <di:waypoint x="1320" y="490" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Fluxo_7_di" bpmnElement="Fluxo_7">
        <di:waypoint x="1380" y="530" />
        <di:waypoint x="1458" y="530" />
        <di:waypoint x="1458" y="188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Associacao_SLA_di" bpmnElement="Associacao_SLA">
        <di:waypoint x="695" y="310" />
        <di:waypoint x="640" y="140" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
