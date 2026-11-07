import { create } from "zustand";
import { mockMacroprocessos } from "@/mocks/macroprocessos";
import type { Macroprocesso } from "@/types/organizacao";
import type { FiltroTipo } from "../types";

type MacroprocessosState = {
  macroprocessos: Macroprocesso[];
  tipo: FiltroTipo;
  buscaPor: string;
  /** Macroprocesso expandido na lista (também destacado na cadeia de valor) */
  expandidoId: string | null;
  dialog: { aberto: boolean; editando: Macroprocesso | null };

  setTipo: (tipo: FiltroTipo) => void;
  setBuscaPor: (busca: string) => void;
  alternarExpandido: (id: string) => void;
  focar: (id: string) => void;
  abrirDialog: (macro?: Macroprocesso) => void;
  fecharDialog: () => void;
  salvar: (macro: Macroprocesso) => void;
};

export const useMacroprocessosStore = create<MacroprocessosState>((set) => ({
  macroprocessos: mockMacroprocessos,
  tipo: "todos",
  buscaPor: "",
  expandidoId: null,
  dialog: { aberto: false, editando: null },

  setTipo: (tipo) => set({ tipo }),
  setBuscaPor: (buscaPor) => set({ buscaPor }),
  alternarExpandido: (id) => set((s) => ({ expandidoId: s.expandidoId === id ? null : id })),
  // Clique na cadeia de valor: limpa filtros para garantir que o item apareça na lista
  focar: (id) => set({ expandidoId: id, tipo: "todos", buscaPor: "" }),
  abrirDialog: (macro) => set({ dialog: { aberto: true, editando: macro ?? null } }),
  fecharDialog: () => set({ dialog: { aberto: false, editando: null } }),
  salvar: (macro) =>
    set((s) => {
      const existe = s.macroprocessos.some((m) => m.id === macro.id);
      return {
        macroprocessos: existe ? s.macroprocessos.map((m) => (m.id === macro.id ? macro : m)) : [...s.macroprocessos, macro],
        dialog: { aberto: false, editando: null },
        expandidoId: macro.id,
      };
    }),
}));
