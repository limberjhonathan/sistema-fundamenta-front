import { create } from "zustand";
import type { Anexo } from "@/types/anexo";

export enum NovoComIaView {
  Formulario = "formulario",
  Gerando = "gerando",
}

export enum NovoComIaEtapa {
  Basico = 0,
  Material = 1,
  Estrategia = 2,
  Revisao = 3,
}

export type NovoProcessoDados = {
  nome: string;
  departamento: string;
  descricao: string;
  /** Arquivos (vídeo, áudio, planilha, documento, imagem) que a IA lê como base. */
  anexos: Anexo[];
  /** Texto livre complementar ao material enviado. */
  anotacoes: string;
  objetivo: string;
  gatilho: string;
  sistemas: string;
  nivelDetalhe: "essencial" | "detalhado" | "completo";
};

const DADOS_INICIAIS: NovoProcessoDados = {
  nome: "",
  departamento: "",
  descricao: "",
  anexos: [],
  anotacoes: "",
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
  setAnexos: (atualizar: (prev: Anexo[]) => Anexo[]) => void;
  reset: () => void;
};

export const useNovoComIaStore = create<NovoComIaState>((set) => ({
  view: NovoComIaView.Formulario,
  etapa: NovoComIaEtapa.Basico,
  dados: DADOS_INICIAIS,
  setView: (view) => set({ view }),
  setEtapa: (etapa) => set({ etapa }),
  setCampo: (campo, valor) => set((s) => ({ dados: { ...s.dados, [campo]: valor } })),
  setAnexos: (atualizar) => set((s) => ({ dados: { ...s.dados, anexos: atualizar(s.dados.anexos) } })),
  reset: () => set({ view: NovoComIaView.Formulario, etapa: NovoComIaEtapa.Basico, dados: DADOS_INICIAIS }),
}));
