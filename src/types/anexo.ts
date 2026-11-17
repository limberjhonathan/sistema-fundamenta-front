import type { AnexoStatus, TipoAnexo } from "@/enums";

/** O que a IA extraiu do arquivo (mock até existir o motor de IA). */
export type ResumoAnexo = {
  texto: string;
  destaques: string[];
};

export type Anexo = {
  id: string;
  nome: string;
  tamanho: number;
  tipo: TipoAnexo;
  status: AnexoStatus;
  /** 0–100 durante o envio. */
  progresso: number;
  /** Em segundos — só vídeo e áudio. */
  duracao?: number;
  /** Object URL para miniatura — só imagem. */
  previewUrl?: string;
  resumoIa?: ResumoAnexo;
  erro?: string;
  /** Arquivo original — guardado só em memória para o futuro envio à API. */
  file?: File;
};
