import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type { Element } from "bpmn-js/lib/model/Types";
import type { Contagem } from "../store/useModelagemStore";
import { nomeDoTipo } from "./bpmnTipos";

export type Problema = {
  /** Elemento a destacar quando o usuário clica no problema (null = processo todo) */
  elementoId: string | null;
  nivel: "erro" | "aviso";
  mensagem: string;
};

const ehNo = (t: string) => /Task$|SubProcess$|CallActivity$|Gateway$|Event$/.test(t) && t !== "bpmn:BoundaryEvent";
const ehAtividadeOuGateway = (t: string) => /Task$|SubProcess$|CallActivity$|Gateway$/.test(t);

const rotulo = (el: Element) => (el.businessObject?.name ? `“${el.businessObject.name}”` : nomeDoTipo(el.type));

/** Regras básicas de boas práticas BPMN, recalculadas a cada alteração do diagrama. */
export function analisarDiagrama(registry: ElementRegistry): { problemas: Problema[]; contagem: Contagem } {
  const elementos = registry.getAll() as Element[];
  // Ignora rótulos (labels), que são elementos à parte no registry
  const nos = elementos.filter((e) => ehNo(e.type) && e.type !== "label" && !("labelTarget" in e && e.labelTarget));
  const problemas: Problema[] = [];

  const inicios = nos.filter((e) => e.type === "bpmn:StartEvent");
  const fins = nos.filter((e) => e.type === "bpmn:EndEvent");
  if (inicios.length === 0) problemas.push({ elementoId: null, nivel: "erro", mensagem: "O processo não tem evento de início" });
  if (fins.length === 0) problemas.push({ elementoId: null, nivel: "erro", mensagem: "O processo não tem evento de fim" });

  for (const el of nos) {
    // Elementos dentro de subprocessos fechados não aparecem no canvas principal
    const entradas = (el.incoming ?? []).filter((c) => c.type === "bpmn:SequenceFlow");
    const saidas = (el.outgoing ?? []).filter((c) => c.type === "bpmn:SequenceFlow");

    if (el.type !== "bpmn:StartEvent" && entradas.length === 0) {
      problemas.push({ elementoId: el.id, nivel: "aviso", mensagem: `${rotulo(el)} não tem fluxo de entrada` });
    }
    if (el.type !== "bpmn:EndEvent" && saidas.length === 0) {
      problemas.push({ elementoId: el.id, nivel: "aviso", mensagem: `${rotulo(el)} não tem fluxo de saída` });
    }
    if (ehAtividadeOuGateway(el.type) && !el.businessObject?.name?.trim()) {
      problemas.push({ elementoId: el.id, nivel: "aviso", mensagem: `${nomeDoTipo(el.type)} sem nome` });
    }
    if (el.type === "bpmn:ExclusiveGateway" && saidas.length > 1 && saidas.some((s) => !s.businessObject?.name?.trim())) {
      problemas.push({ elementoId: el.id, nivel: "aviso", mensagem: `Saídas de ${rotulo(el)} sem rótulo de condição` });
    }
  }

  return {
    problemas,
    contagem: {
      atividades: nos.filter((e) => /Task$|SubProcess$|CallActivity$/.test(e.type)).length,
      eventos: nos.filter((e) => /Event$/.test(e.type)).length,
      gateways: nos.filter((e) => /Gateway$/.test(e.type)).length,
      fluxos: elementos.filter((e) => e.type === "bpmn:SequenceFlow").length,
    },
  };
}
