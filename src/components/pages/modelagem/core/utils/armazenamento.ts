// Enquanto não há API, o diagrama fica salvo só no navegador de quem está editando.
const CHAVE = "fundamenta:modelagem:xml";

export function lerDiagramaSalvo(): string | null {
  try {
    return localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}

export function salvarDiagrama(xml: string): boolean {
  try {
    localStorage.setItem(CHAVE, xml);
    return true;
  } catch {
    return false;
  }
}

export function limparDiagramaSalvo() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    // sem armazenamento disponível: nada a limpar
  }
}
