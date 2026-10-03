import { create } from "zustand";

export enum AprovacoesAba {
  Pendentes = "pendentes",
  MeuHistorico = "meu-historico",
  EmObservacao = "em-observacao",
}

export type Decisao = "aprovado" | "rejeitado";

type AprovacoesState = {
  aba: AprovacoesAba;
  buscaPor: string;
  decisoes: Record<string, Decisao>;
  setAba: (aba: AprovacoesAba) => void;
  setBuscaPor: (busca: string) => void;
  decidir: (id: string, decisao: Decisao) => void;
};

export const useAprovacoesStore = create<AprovacoesState>((set) => ({
  aba: AprovacoesAba.Pendentes,
  buscaPor: "",
  decisoes: {},
  setAba: (aba) => set({ aba }),
  setBuscaPor: (buscaPor) => set({ buscaPor }),
  decidir: (id, decisao) => set((s) => ({ decisoes: { ...s.decisoes, [id]: decisao } })),
}));
