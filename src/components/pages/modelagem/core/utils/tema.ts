import type Canvas from "diagram-js/lib/core/Canvas";
import type { Element } from "bpmn-js/lib/model/Types";
import { BRAND, COLORS } from "@/styles/colors";

/** Lê a família real da Inter carregada pelo next/font (o SVG não resolve var() em atributos). */
function fonteInter() {
  if (typeof window === "undefined") return "Inter, sans-serif";
  const valor = getComputedStyle(document.documentElement).getPropertyValue("--font-inter").trim();
  return valor ? `${valor}, Inter, sans-serif` : "Inter, sans-serif";
}

/** Configuração de renderização do bpmn-js com as cores e a fonte da marca. */
export function configuracaoTema() {
  return {
    bpmnRenderer: {
      defaultFillColor: COLORS.white,
      defaultStrokeColor: COLORS.gray[700],
      defaultLabelColor: BRAND.dark,
    },
    textRenderer: {
      defaultStyle: { fontFamily: fonteInter(), fontSize: 12, fontWeight: 500, lineHeight: 1.25 },
      externalStyle: { fontFamily: fonteInter(), fontSize: 11, fontWeight: 400, lineHeight: 1.25 },
    },
  };
}

/** Classe CSS por categoria de elemento, usada pelo style.ts para colorir cada tipo. */
export function categoriaDoElemento(tipo: string): string | null {
  if (tipo === "bpmn:StartEvent") return "fd-inicio";
  if (tipo === "bpmn:EndEvent") return "fd-fim";
  if (/IntermediateThrowEvent|IntermediateCatchEvent|BoundaryEvent/.test(tipo)) return "fd-evento";
  if (/Gateway$/.test(tipo)) return "fd-gateway";
  if (/Task$|CallActivity$/.test(tipo)) return "fd-tarefa";
  if (tipo === "bpmn:SubProcess") return "fd-subprocesso";
  if (tipo === "bpmn:Participant") return "fd-pool";
  if (tipo === "bpmn:Lane") return "fd-raia";
  if (/DataObjectReference|DataStoreReference/.test(tipo)) return "fd-dado";
  return null;
}

/** Aplica a classe de categoria ao elemento no canvas (markers viram classes no SVG). */
export function marcarCategoria(canvas: Canvas, el: Element) {
  const categoria = categoriaDoElemento(el.type);
  if (categoria && !el.labelTarget) canvas.addMarker(el.id, categoria);
}
