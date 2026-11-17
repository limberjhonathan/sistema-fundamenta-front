import { TipoAnexo } from "@/enums";

export const EXTENSOES: Record<TipoAnexo, string[]> = {
  [TipoAnexo.Video]: ["mp4", "mov", "webm", "mkv", "avi"],
  [TipoAnexo.Audio]: ["mp3", "m4a", "wav", "ogg"],
  [TipoAnexo.Planilha]: ["xlsx", "xls", "csv", "ods"],
  [TipoAnexo.Documento]: ["pdf", "docx", "doc", "txt", "md", "odt", "pptx"],
  [TipoAnexo.Imagem]: ["png", "jpg", "jpeg", "webp"],
};

/** Limite por tipo, em MB — vídeo e áudio são maiores por natureza. */
export const LIMITE_MB: Record<TipoAnexo, number> = {
  [TipoAnexo.Video]: 500,
  [TipoAnexo.Audio]: 100,
  [TipoAnexo.Planilha]: 20,
  [TipoAnexo.Documento]: 30,
  [TipoAnexo.Imagem]: 10,
};

/** Valor para o `accept` do input de arquivo. */
export const ACCEPT_ANEXOS = Object.values(EXTENSOES)
  .flat()
  .map((ext) => `.${ext}`)
  .join(",");

export const extensao = (nome: string) => nome.split(".").pop()?.toLowerCase() ?? "";

/** Descobre a categoria pela extensão; `null` quando o formato não é aceito. */
export function tipoDoArquivo(nome: string): TipoAnexo | null {
  const ext = extensao(nome);
  const tipo = (Object.keys(EXTENSOES) as TipoAnexo[]).find((t) => EXTENSOES[t].includes(ext));
  return tipo ?? null;
}

export function formatarTamanho(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;
  return `${(bytes / 1024 ** 3).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} GB`;
}

/** 754 → "12:34"; 3725 → "1:02:05". */
export function formatarDuracao(segundos: number) {
  const s = Math.round(segundos);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/** Lê a duração de vídeo/áudio pelo próprio navegador; `undefined` se não conseguir. */
export function lerDuracao(file: File, tag: "video" | "audio"): Promise<number | undefined> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const midia = document.createElement(tag);
    const fim = (valor?: number) => {
      URL.revokeObjectURL(url);
      resolve(valor && Number.isFinite(valor) ? valor : undefined);
    };
    midia.preload = "metadata";
    midia.onloadedmetadata = () => fim(midia.duration);
    midia.onerror = () => fim();
    midia.src = url;
  });
}

/** Retorna a mensagem de erro do arquivo, ou `null` se ele pode ser enviado. */
export function validarArquivo(file: File): string | null {
  const tipo = tipoDoArquivo(file.name);
  if (!tipo) return `${file.name}: formato não suportado`;
  if (file.size > LIMITE_MB[tipo] * 1024 ** 2) return `${file.name}: excede o limite de ${LIMITE_MB[tipo]} MB`;
  return null;
}
