import { create } from "zustand";
import { mockConfiguracoesIa, mockCotasDepartamento } from "@/mocks/iaCotas";
import type { ConfiguracaoIa, CotaDepartamento } from "@/types/organizacao";

export type PeriodoConsumo = "7d" | "30d";

type IaCotasState = {
  cotas: CotaDepartamento[];
  configuracoes: ConfiguracaoIa[];
  periodo: PeriodoConsumo;
  /** Departamento com o modal de limite aberto */
  editandoCota: string | null;

  setPeriodo: (periodo: PeriodoConsumo) => void;
  alternarConfiguracao: (chave: string) => void;
  abrirCota: (departamento: string) => void;
  fecharCota: () => void;
  salvarLimite: (departamento: string, limite: number) => void;
};

export const useIaCotasStore = create<IaCotasState>((set) => ({
  cotas: mockCotasDepartamento,
  configuracoes: mockConfiguracoesIa,
  periodo: "30d",
  editandoCota: null,

  setPeriodo: (periodo) => set({ periodo }),
  alternarConfiguracao: (chave) =>
    set((s) => ({ configuracoes: s.configuracoes.map((c) => (c.chave === chave ? { ...c, ativo: !c.ativo } : c)) })),
  abrirCota: (editandoCota) => set({ editandoCota }),
  fecharCota: () => set({ editandoCota: null }),
  salvarLimite: (departamento, limite) =>
    set((s) => ({
      cotas: s.cotas.map((c) => (c.departamento === departamento ? { ...c, limite } : c)),
      editandoCota: null,
    })),
}));
