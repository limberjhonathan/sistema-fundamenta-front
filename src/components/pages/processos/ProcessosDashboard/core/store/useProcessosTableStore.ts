import { create } from "zustand";
import type { Filters, Ordenacao, Pagination } from "../types";

const FILTROS_INICIAIS: Filters = { buscaPor: "", status: "", departamento: "" };

type ProcessosTableState = {
  filters: Filters;
  pagination: Pagination;
  ordenacao: Ordenacao;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  limparFiltros: () => void;
  setPagina: (pagina: number) => void;
  alternarOrdenacao: () => void;
};

export const useProcessosTableStore = create<ProcessosTableState>((set) => ({
  filters: FILTROS_INICIAIS,
  pagination: { pagina: 1, limite: 6 },
  ordenacao: "asc",
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value }, pagination: { ...s.pagination, pagina: 1 } })),
  limparFiltros: () => set((s) => ({ filters: FILTROS_INICIAIS, pagination: { ...s.pagination, pagina: 1 } })),
  setPagina: (pagina) => set((s) => ({ pagination: { ...s.pagination, pagina } })),
  alternarOrdenacao: () => set((s) => ({ ordenacao: s.ordenacao === "asc" ? "desc" : "asc" })),
}));
