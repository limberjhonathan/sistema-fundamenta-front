import { create } from "zustand";
import { DepartamentoStatus } from "@/enums";
import { mockDepartamentos } from "@/mocks/departamentos";
import type { Departamento } from "@/types/organizacao";
import type { OrdenacaoDepartamento } from "../types";

type DepartamentosState = {
  departamentos: Departamento[];
  buscaPor: string;
  ordenacao: OrdenacaoDepartamento;
  mostrarInativos: boolean;
  /** Departamento aberto no painel lateral de detalhes */
  detalheId: string | null;
  dialog: { aberto: boolean; editando: Departamento | null };

  setBuscaPor: (busca: string) => void;
  setOrdenacao: (ordenacao: OrdenacaoDepartamento) => void;
  setMostrarInativos: (mostrar: boolean) => void;
  abrirDetalhe: (id: string) => void;
  fecharDetalhe: () => void;
  abrirDialog: (departamento?: Departamento) => void;
  fecharDialog: () => void;
  salvar: (departamento: Departamento) => void;
  alternarStatus: (id: string) => void;
};

export const useDepartamentosStore = create<DepartamentosState>((set) => ({
  departamentos: mockDepartamentos,
  buscaPor: "",
  ordenacao: "nome",
  mostrarInativos: false,
  detalheId: null,
  dialog: { aberto: false, editando: null },

  setBuscaPor: (buscaPor) => set({ buscaPor }),
  setOrdenacao: (ordenacao) => set({ ordenacao }),
  setMostrarInativos: (mostrarInativos) => set({ mostrarInativos }),
  abrirDetalhe: (detalheId) => set({ detalheId }),
  fecharDetalhe: () => set({ detalheId: null }),
  abrirDialog: (departamento) => set({ dialog: { aberto: true, editando: departamento ?? null } }),
  fecharDialog: () => set({ dialog: { aberto: false, editando: null } }),
  salvar: (departamento) =>
    set((s) => {
      const existe = s.departamentos.some((d) => d.id === departamento.id);
      return {
        departamentos: existe
          ? s.departamentos.map((d) => (d.id === departamento.id ? departamento : d))
          : [...s.departamentos, departamento],
        dialog: { aberto: false, editando: null },
      };
    }),
  alternarStatus: (id) =>
    set((s) => ({
      departamentos: s.departamentos.map((d) =>
        d.id === id
          ? { ...d, status: d.status === DepartamentoStatus.Ativo ? DepartamentoStatus.Inativo : DepartamentoStatus.Ativo }
          : d,
      ),
    })),
}));
