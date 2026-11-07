import { create } from "zustand";
import type Modeler from "bpmn-js/lib/Modeler";
import type { Problema } from "../utils/validar";

export type ElementoSelecionado = {
  id: string;
  tipo: string;
  nome: string;
  documentacao: string;
  /** Nome da raia (responsável) onde o elemento está, se houver */
  raia: string | null;
};

export type ModelagemAba = "diagrama" | "xml" | "versoes";

export type PainelAba = "propriedades" | "ia" | "comentarios";

/** Ferramenta ativa do diagram-js (null = seleção normal). */
export type Ferramenta = "hand" | "lasso" | "space" | "global-connect" | null;

/** Dados de negócio por elemento que ainda não vão para o XML (mock até existir API). */
export type MetadadosElemento = { sla: string; sistema: string; automatizavel: boolean };

export type Contagem = { atividades: number; eventos: number; gateways: number; fluxos: number };

type ModelagemState = {
  modeler: Modeler | null;
  aba: ModelagemAba;
  painelAba: PainelAba;
  painelAberto: boolean;
  selecionado: ElementoSelecionado | null;
  ferramenta: Ferramenta;
  zoom: number;
  podeDesfazer: boolean;
  podeRefazer: boolean;
  alterado: boolean;
  salvoEm: Date | null;
  problemas: Problema[];
  contagem: Contagem;
  metadados: Record<string, MetadadosElemento>;
  atalhosAbertos: boolean;

  setModeler: (modeler: Modeler | null) => void;
  setAba: (aba: ModelagemAba) => void;
  setPainelAba: (aba: PainelAba) => void;
  alternarPainel: () => void;
  setSelecionado: (el: ElementoSelecionado | null) => void;
  setFerramenta: (ferramenta: Ferramenta) => void;
  setZoom: (zoom: number) => void;
  setHistorico: (podeDesfazer: boolean, podeRefazer: boolean) => void;
  setAnalise: (problemas: Problema[], contagem: Contagem) => void;
  setMetadados: (id: string, dados: Partial<MetadadosElemento>) => void;
  setAtalhosAbertos: (aberto: boolean) => void;
  marcarAlterado: () => void;
  marcarSalvo: () => void;
};

export const METADADOS_VAZIOS: MetadadosElemento = { sla: "", sistema: "", automatizavel: false };

export const useModelagemStore = create<ModelagemState>((set) => ({
  modeler: null,
  aba: "diagrama",
  painelAba: "propriedades",
  painelAberto: true,
  selecionado: null,
  ferramenta: null,
  zoom: 100,
  podeDesfazer: false,
  podeRefazer: false,
  alterado: false,
  salvoEm: null,
  problemas: [],
  contagem: { atividades: 0, eventos: 0, gateways: 0, fluxos: 0 },
  // Exemplo: metadados do diagrama inicial
  metadados: {
    Tarefa_AnalisarDocs: { sla: "48h úteis", sistema: "Portal de Crédito", automatizavel: true },
    Tarefa_ConsultarScore: { sla: "5 min", sistema: "Serasa / bureau de crédito", automatizavel: true },
    Tarefa_Parecer: { sla: "24h úteis", sistema: "", automatizavel: false },
  },
  atalhosAbertos: false,

  setModeler: (modeler) => set({ modeler }),
  setAba: (aba) => set({ aba }),
  setPainelAba: (painelAba) => set({ painelAba, painelAberto: true }),
  alternarPainel: () => set((s) => ({ painelAberto: !s.painelAberto })),
  setSelecionado: (selecionado) => set({ selecionado }),
  setFerramenta: (ferramenta) => set({ ferramenta }),
  setZoom: (zoom) => set({ zoom }),
  setHistorico: (podeDesfazer, podeRefazer) => set({ podeDesfazer, podeRefazer }),
  setAnalise: (problemas, contagem) => set({ problemas, contagem }),
  setMetadados: (id, dados) =>
    set((s) => ({ metadados: { ...s.metadados, [id]: { ...METADADOS_VAZIOS, ...s.metadados[id], ...dados } } })),
  setAtalhosAbertos: (atalhosAbertos) => set({ atalhosAbertos }),
  marcarAlterado: () => set({ alterado: true }),
  marcarSalvo: () => set({ alterado: false, salvoEm: new Date() }),
}));
