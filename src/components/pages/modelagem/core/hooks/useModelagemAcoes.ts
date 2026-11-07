import { useCallback } from "react";
import type Canvas from "diagram-js/lib/core/Canvas";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type CommandStack from "diagram-js/lib/command/CommandStack";
import type Selection from "diagram-js/lib/features/selection/Selection";
import type HandTool from "diagram-js/lib/features/hand-tool/HandTool";
import type LassoTool from "diagram-js/lib/features/lasso-tool/LassoTool";
import type SpaceTool from "diagram-js/lib/features/space-tool/SpaceTool";
import type GlobalConnect from "diagram-js/lib/features/global-connect/GlobalConnect";
import type Create from "diagram-js/lib/features/create/Create";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type BpmnFactory from "bpmn-js/lib/features/modeling/BpmnFactory";
import type ElementFactory from "bpmn-js/lib/features/modeling/ElementFactory";
import type BpmnReplace from "bpmn-js/lib/features/replace/BpmnReplace";
import type { Element } from "bpmn-js/lib/model/Types";
import { DIAGRAMA_INICIAL } from "../utils/diagramaInicial";
import { limparDiagramaSalvo, salvarDiagrama } from "../utils/armazenamento";
import { enquadrar } from "../utils/enquadrar";
import { useModelagemStore, type Ferramenta } from "../store/useModelagemStore";

const LIMITES_ZOOM = { min: 0.2, max: 4 };

const baixar = (conteudo: string, nome: string, tipo: string) => {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  link.click();
  URL.revokeObjectURL(url);
};

/** Ações sobre o editor BPMN usadas pelo cabeçalho, paleta, painel e canvas. */
export function useModelagemAcoes() {
  const modeler = useModelagemStore((s) => s.modeler);
  const marcarSalvo = useModelagemStore((s) => s.marcarSalvo);

  const elemento = useCallback(
    (id: string) => modeler?.get<ElementRegistry>("elementRegistry").get(id) as Element | undefined,
    [modeler],
  );

  const zoom = useCallback(
    (delta: number) => {
      if (!modeler) return;
      const canvas = modeler.get<Canvas>("canvas");
      canvas.zoom(Math.min(LIMITES_ZOOM.max, Math.max(LIMITES_ZOOM.min, canvas.zoom() + delta)));
    },
    [modeler],
  );

  const zoomReal = useCallback(() => modeler?.get<Canvas>("canvas").zoom(1), [modeler]);

  const ajustarTela = useCallback(() => modeler && enquadrar(modeler.get<Canvas>("canvas")), [modeler]);

  /** Recalcula o tamanho do canvas (ex.: ao voltar da aba XML ou abrir/fechar o painel). */
  const redimensionar = useCallback(() => modeler?.get<Canvas>("canvas").resized(), [modeler]);

  const desfazer = useCallback(() => modeler?.get<CommandStack>("commandStack").undo(), [modeler]);
  const refazer = useCallback(() => modeler?.get<CommandStack>("commandStack").redo(), [modeler]);

  /** Ativa uma ferramenta do diagram-js; clicar de novo na ferramenta ativa volta para seleção. */
  const ativarFerramenta = useCallback(
    (ferramenta: Exclude<Ferramenta, null>, evento: MouseEvent) => {
      if (!modeler) return;
      if (ferramenta === "hand") modeler.get<HandTool>("handTool").activateHand(evento);
      if (ferramenta === "lasso") modeler.get<LassoTool>("lassoTool").activateSelection(evento);
      if (ferramenta === "space") modeler.get<SpaceTool>("spaceTool").activateSelection(evento, false, false);
      if (ferramenta === "global-connect") modeler.get<GlobalConnect>("globalConnect").start(evento, false);
    },
    [modeler],
  );

  /** Começa a criar um elemento: ele segue o mouse até o clique no canvas (ou arrastando). */
  const criar = useCallback(
    (tipo: string, evento: MouseEvent | DragEvent) => {
      if (!modeler) return;
      const factory = modeler.get<ElementFactory>("elementFactory");
      const create = modeler.get<Create>("create");

      if (tipo === "participante") return create.start(evento, factory.createParticipantShape());

      if (tipo === "subprocesso") {
        const sub = factory.createShape({ type: "bpmn:SubProcess", x: 0, y: 0, isExpanded: true });
        const inicio = factory.createShape({ type: "bpmn:StartEvent", x: 40, y: 82, parent: sub });
        return create.start(evento, [sub, inicio], { hints: { autoSelect: [sub] } });
      }

      create.start(evento, factory.createShape({ type: tipo }));
    },
    [modeler],
  );

  /** Troca o tipo do elemento (ex.: Tarefa → Tarefa de usuário) mantendo nome e conexões. */
  const substituirTipo = useCallback(
    (id: string, tipo: string) => {
      const el = elemento(id);
      if (!el || !modeler || el.type === tipo) return;
      const novo = modeler.get<BpmnReplace>("bpmnReplace").replaceElement(el, { type: tipo } as Parameters<BpmnReplace["replaceElement"]>[1]);
      modeler.get<Selection>("selection").select(novo);
    },
    [elemento, modeler],
  );

  /** Seleciona o elemento e rola a tela até ele (usado na lista de validação). */
  const focar = useCallback(
    (id: string) => {
      const el = elemento(id);
      if (!el || !modeler) return;
      modeler.get<Canvas>("canvas").scrollToElement(el, 120);
      modeler.get<Selection>("selection").select(el);
    },
    [elemento, modeler],
  );

  const obterXml = useCallback(async () => {
    if (!modeler) return "";
    const { xml } = await modeler.saveXML({ format: true });
    return xml ?? "";
  }, [modeler]);

  const salvar = useCallback(async () => {
    const xml = await obterXml();
    const ok = !!xml && salvarDiagrama(xml);
    if (ok) marcarSalvo();
    return ok;
  }, [obterXml, marcarSalvo]);

  const baixarArquivo = useCallback(async () => {
    const xml = await obterXml();
    if (xml) baixar(xml, "processo.bpmn", "application/xml");
  }, [obterXml]);

  const baixarImagem = useCallback(async () => {
    if (!modeler) return;
    const { svg } = await modeler.saveSVG();
    baixar(svg, "processo.svg", "image/svg+xml");
  }, [modeler]);

  const restaurarExemplo = useCallback(async () => {
    if (!modeler) return;
    limparDiagramaSalvo();
    await modeler.importXML(DIAGRAMA_INICIAL);
    enquadrar(modeler.get<Canvas>("canvas"));
  }, [modeler]);

  const renomear = useCallback(
    (id: string, nome: string) => {
      const el = elemento(id);
      if (el && modeler) modeler.get<Modeling>("modeling").updateLabel(el, nome);
    },
    [elemento, modeler],
  );

  const documentar = useCallback(
    (id: string, texto: string) => {
      const el = elemento(id);
      if (!el || !modeler) return;
      const documentacao = texto.trim()
        ? [modeler.get<BpmnFactory>("bpmnFactory").create("bpmn:Documentation", { text: texto })]
        : [];
      modeler.get<Modeling>("modeling").updateProperties(el, { documentation: documentacao });
    },
    [elemento, modeler],
  );

  return {
    pronto: !!modeler,
    zoom,
    zoomReal,
    ajustarTela,
    redimensionar,
    desfazer,
    refazer,
    ativarFerramenta,
    criar,
    substituirTipo,
    focar,
    obterXml,
    salvar,
    baixarArquivo,
    baixarImagem,
    restaurarExemplo,
    renomear,
    documentar,
  };
}
