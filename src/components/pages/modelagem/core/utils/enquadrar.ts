import type Canvas from "diagram-js/lib/core/Canvas";

/** Espaço (px) ocupado pelos controles flutuantes sobre o canvas. */
const MARGEM = { esquerda: 84, direita: 32, topo: 32, base: 72 };

/**
 * Centraliza o diagrama na área livre do canvas (descontando paleta à esquerda e
 * controles embaixo), reduzindo se não couber mas sem ampliar além de 100%.
 */
export function enquadrar(canvas: Canvas) {
  const { inner, outer } = canvas.viewbox();
  if (!inner.width || !inner.height || !outer.width || !outer.height) return;

  const livreLargura = Math.max(100, outer.width - MARGEM.esquerda - MARGEM.direita);
  const livreAltura = Math.max(100, outer.height - MARGEM.topo - MARGEM.base);
  const escala = Math.min(1, livreLargura / inner.width, livreAltura / inner.height);

  // Em coordenadas do diagrama: canto superior esquerdo da área visível
  const largura = outer.width / escala;
  const altura = outer.height / escala;
  const x = inner.x + inner.width / 2 - (MARGEM.esquerda + livreLargura / 2) / escala;
  const y = inner.y + inner.height / 2 - (MARGEM.topo + livreAltura / 2) / escala;

  canvas.viewbox({ x, y, width: largura, height: altura });
}
