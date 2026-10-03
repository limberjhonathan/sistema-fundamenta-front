import { RefObject, useEffect } from "react";
import type Modeler from "bpmn-js/lib/Modeler";
import type EventBus from "diagram-js/lib/core/EventBus";
import type Canvas from "diagram-js/lib/core/Canvas";
import type { Element } from "bpmn-js/lib/model/Types";
import { DIAGRAMA_INICIAL } from "../utils/diagramaInicial";
import { lerDiagramaSalvo } from "../utils/armazenamento";
import { enquadrar } from "../utils/enquadrar";
import { useModelagemStore, type ElementoSelecionado } from "../store/useModelagemStore";

export function paraSelecionado(el: Element): ElementoSelecionado {
  const bo = el.businessObject;
  return {
    id: el.id,
    tipo: el.type,
    nome: bo?.name ?? "",
    documentacao: bo?.documentation?.[0]?.text ?? "",
  };
}

/** Cria o editor BPMN dentro do container e liga os eventos dele ao store da Modelagem. */
export function useBpmnModeler(containerRef: RefObject<HTMLDivElement | null>) {
  const { setModeler, setSelecionado, setZoom, marcarAlterado } = useModelagemStore.getState();

  useEffect(() => {
    let modeler: Modeler | null = null;
    let cancelado = false;

    (async () => {
      // bpmn-js só funciona no navegador, por isso é importado sob demanda
      const { default: BpmnModeler } = await import("bpmn-js/lib/Modeler");
      if (cancelado || !containerRef.current) return;

      modeler = new BpmnModeler({ container: containerRef.current });

      try {
        await modeler.importXML(lerDiagramaSalvo() ?? DIAGRAMA_INICIAL);
      } catch {
        // XML salvo inválido: volta para o exemplo
        await modeler.importXML(DIAGRAMA_INICIAL);
      }
      if (cancelado) return;

      const eventBus = modeler.get<EventBus>("eventBus");
      const canvas = modeler.get<Canvas>("canvas");

      enquadrar(canvas);
      setZoom(Math.round(canvas.zoom() * 100));

      eventBus.on("selection.changed", (e: { newSelection: Element[] }) => {
        const [primeiro] = e.newSelection;
        setSelecionado(e.newSelection.length === 1 && primeiro ? paraSelecionado(primeiro) : null);
      });

      eventBus.on("element.changed", (e: { element: Element }) => {
        const atual = useModelagemStore.getState().selecionado;
        if (atual && e.element.id === atual.id) setSelecionado(paraSelecionado(e.element));
      });

      eventBus.on("commandStack.changed", marcarAlterado);

      eventBus.on("canvas.viewbox.changed", (e: { viewbox: { scale: number } }) => {
        setZoom(Math.round(e.viewbox.scale * 100));
      });

      setModeler(modeler);
    })();

    return () => {
      cancelado = true;
      modeler?.destroy();
      setModeler(null);
      setSelecionado(null);
    };
  }, [containerRef, setModeler, setSelecionado, setZoom, marcarAlterado]);
}
