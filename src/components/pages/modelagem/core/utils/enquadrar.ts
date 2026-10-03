import type Canvas from "diagram-js/lib/core/Canvas";

/** Centraliza o diagrama na tela, reduzindo se não couber mas sem ampliar além de 100%. */
export function enquadrar(canvas: Canvas) {
  canvas.zoom("fit-viewport");
  const { inner, outer, scale } = canvas.viewbox();
  if (scale <= 1) return;

  canvas.viewbox({
    x: inner.x + inner.width / 2 - outer.width / 2,
    y: inner.y + inner.height / 2 - outer.height / 2,
    width: outer.width,
    height: outer.height,
  });
}
