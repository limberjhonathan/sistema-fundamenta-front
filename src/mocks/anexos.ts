import { TipoAnexo } from "@/enums";
import type { ResumoAnexo } from "@/types/anexo";

/** Resumos de demonstração devolvidos pela "leitura" simulada da IA. */
export const mockResumoPorTipo: Record<TipoAnexo, ResumoAnexo> = {
  [TipoAnexo.Video]: {
    texto: "Transcrição concluída. A gravação descreve o fluxo do pedido até a aprovação final, com duas exceções citadas.",
    destaques: ["6 etapas identificadas", "3 responsáveis citados", "Gargalo na aprovação (04:12)"],
  },
  [TipoAnexo.Audio]: {
    texto: "Transcrição concluída. O áudio explica quem inicia o processo e quais sistemas são usados.",
    destaques: ["4 etapas identificadas", "Gatilho: solicitação do gestor", "Sistema citado: ERP"],
  },
  [TipoAnexo.Planilha]: {
    texto: "Planilha lida. As colunas foram interpretadas como etapas, responsáveis e prazos.",
    destaques: ["42 linhas", "Colunas: Etapa, Responsável, SLA", "5 responsáveis distintos"],
  },
  [TipoAnexo.Documento]: {
    texto: "Documento lido. Foram extraídas as regras de negócio e a sequência de atividades descrita no texto.",
    destaques: ["8 atividades", "3 regras de aprovação", "Referência a norma interna"],
  },
  [TipoAnexo.Imagem]: {
    texto: "Imagem analisada. Parece um fluxo desenhado à mão; os blocos e setas foram convertidos em etapas.",
    destaques: ["5 blocos reconhecidos", "1 decisão (sim/não)"],
  },
};
