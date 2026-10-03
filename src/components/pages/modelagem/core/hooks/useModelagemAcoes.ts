import { useCallback } from "react";
import type Canvas from "diagram-js/lib/core/Canvas";
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type BpmnFactory from "bpmn-js/lib/features/modeling/BpmnFactory";
import type { Element } from "bpmn-js/lib/model/Types";
import { DIAGRAMA_INICIAL } from "../utils/diagramaInicial";
import { limparDiagramaSalvo, salvarDiagrama } from "../utils/armazenamento";
import { enquadrar } from "../utils/enquadrar";
import { useModelagemStore } from "../store/useModelagemStore";

const LIMITES_ZOOM = { min: 0.2, max: 4 };

/** Ações sobre o editor BPMN usadas pela toolbar, painel e canvas. */
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
      const alvo = Math.min(LIMITES_ZOOM.max, Math.max(LIMITES_ZOOM.min, canvas.zoom() + delta));
      canvas.zoom(alvo);
    },
    [modeler],
  );

  const ajustarTela = useCallback(() => modeler && enquadrar(modeler.get<Canvas>("canvas")), [modeler]);

  /** Recalcula o tamanho do canvas (ex.: ao voltar da aba XML, quando ele estava oculto). */
  const redimensionar = useCallback(() => modeler?.get<Canvas>("canvas").resized(), [modeler]);

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
    if (!xml) return;
    const url = URL.createObjectURL(new Blob([xml], { type: "application/xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "processo.bpmn";
    link.click();
    URL.revokeObjectURL(url);
  }, [obterXml]);

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

  return { pronto: !!modeler, zoom, ajustarTela, redimensionar, obterXml, salvar, baixarArquivo, restaurarExemplo, renomear, documentar };
}
