import { create } from "zustand";

export enum NovoComIaView {
  Formulario = "formulario",
  Gerando = "gerando",
}

export enum NovoComIaEtapa {
  Basico = 0,
  Estrategia = 1,
  Revisao = 2,
}

export type NovoProcessoDados = {
  nome: string;
  departamento: string;
  descricao: string;
  objetivo: string;
  gatilho: string;
  sistemas: string;
  nivelDetalhe: "essencial" | "detalhado" | "completo";
};

const DADOS_INICIAIS: NovoProcessoDados = {
  nome: "",
  departamento: "",
  descricao: "",
  objetivo: "",
  gatilho: "",
  sistemas: "",
  nivelDetalhe: "detalhado",
};

type NovoComIaState = {
  view: NovoComIaView;
  etapa: NovoComIaEtapa;
  dados: NovoProcessoDados;
  setView: (view: NovoComIaView) => void;
  setEtapa: (etapa: NovoComIaEtapa) => void;
  setCampo: <K extends keyof NovoProcessoDados>(campo: K, valor: NovoProcessoDados[K]) => void;
  reset: () => void;
};

export const useNovoComIaStore = create<NovoComIaState>((set) => ({
  view: NovoComIaView.Formulario,
  etapa: NovoComIaEtapa.Basico,
  dados: DADOS_INICIAIS,
  setView: (view) => set({ view }),
  setEtapa: (etapa) => set({ etapa }),
  setCampo: (campo, valor) => set((s) => ({ dados: { ...s.dados, [campo]: valor } })),
  reset: () => set({ view: NovoComIaView.Formulario, etapa: NovoComIaEtapa.Basico, dados: DADOS_INICIAIS }),
}));
