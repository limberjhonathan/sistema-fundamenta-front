import { RefObject, useEffect } from "react";
import type Modeler from "bpmn-js/lib/Modeler";
import type EventBus from "diagram-js/lib/core/EventBus";
import type Canvas from "diagram-js/lib/core/Canvas";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type CommandStack from "diagram-js/lib/command/CommandStack";
import type { Element } from "bpmn-js/lib/model/Types";
import { DIAGRAMA_INICIAL } from "../utils/diagramaInicial";
import { lerDiagramaSalvo } from "../utils/armazenamento";
import { enquadrar } from "../utils/enquadrar";
import { configuracaoTema, marcarCategoria } from "../utils/tema";
import { analisarDiagrama } from "../utils/validar";
import { useModelagemStore, type ElementoSelecionado, type Ferramenta } from "../store/useModelagemStore";

/** Encontra a raia (lane) que contém o elemento, para mostrar o responsável no painel. */
function raiaDe(el: Element, registry: ElementRegistry): string | null {
  const raia = (registry.getAll() as Element[]).find(
    (e) => e.type === "bpmn:Lane" && (e.businessObject?.flowNodeRef ?? []).some((n: { id: string }) => n.id === el.id),
  );
  return raia?.businessObject?.name ?? null;
}

export function paraSelecionado(el: Element, registry: ElementRegistry): ElementoSelecionado {
  const bo = el.businessObject;
  return {
    id: el.id,
    tipo: el.type,
    nome: bo?.name ?? "",
    documentacao: bo?.documentation?.[0]?.text ?? "",
    raia: raiaDe(el, registry),
  };
}

/** Cria o editor BPMN dentro do container e liga os eventos dele ao store da Modelagem. */
export function useBpmnModeler(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const store = useModelagemStore.getState();
    let modeler: Modeler | null = null;
    let cancelado = false;

    (async () => {
      // bpmn-js só funciona no navegador, por isso é importado sob demanda
      const { default: BpmnModeler } = await import("bpmn-js/lib/Modeler");
      if (cancelado || !containerRef.current) return;

      modeler = new BpmnModeler({ container: containerRef.current, ...configuracaoTema() });

      const eventBus = modeler.get<EventBus>("eventBus");
      const canvas = modeler.get<Canvas>("canvas");
      const registry = modeler.get<ElementRegistry>("elementRegistry");
      const commandStack = modeler.get<CommandStack>("commandStack");

      // Antes do import: cada shape adicionado recebe a classe da sua categoria (cores por tipo)
      eventBus.on("shape.added", (e: { element: Element }) => marcarCategoria(canvas, e.element));

      try {
        await modeler.importXML(lerDiagramaSalvo() ?? DIAGRAMA_INICIAL);
      } catch {
        // XML salvo inválido: volta para o exemplo
        await modeler.importXML(DIAGRAMA_INICIAL);
      }
      if (cancelado) return;

      const analisar = () => {
        const { problemas, contagem } = analisarDiagrama(registry);
        useModelagemStore.getState().setAnalise(problemas, contagem);
      };

      enquadrar(canvas);
      store.setZoom(Math.round(canvas.zoom() * 100));
      analisar();

      eventBus.on("import.done", analisar);

      eventBus.on("selection.changed", (e: { newSelection: Element[] }) => {
        const [primeiro] = e.newSelection;
        store.setSelecionado(e.newSelection.length === 1 && primeiro ? paraSelecionado(primeiro, registry) : null);
      });

      eventBus.on("element.changed", (e: { element: Element }) => {
        const atual = useModelagemStore.getState().selecionado;
        if (atual && e.element.id === atual.id) store.setSelecionado(paraSelecionado(e.element, registry));
      });

      eventBus.on("commandStack.changed", () => {
        store.marcarAlterado();
        store.setHistorico(commandStack.canUndo(), commandStack.canRedo());
        analisar();
      });

      eventBus.on("tool-manager.update", (e: { tool: Ferramenta }) => store.setFerramenta(e.tool ?? null));

      eventBus.on("canvas.viewbox.changed", (e: { viewbox: { scale: number } }) => {
        store.setZoom(Math.round(e.viewbox.scale * 100));
      });

      store.setModeler(modeler);
    })();

    return () => {
      cancelado = true;
      modeler?.destroy();
      store.setModeler(null);
      store.setSelecionado(null);
    };
  }, [containerRef]);
}
