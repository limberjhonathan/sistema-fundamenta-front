import { create } from "zustand";
import { UsuarioStatus } from "@/enums";
import { mockUsuarios } from "@/mocks/usuarios";
import type { UsuarioSistema } from "@/types/usuario";
import type { Filters, Ordenacao, Pagination } from "../types";

const FILTROS_INICIAIS: Filters = { buscaPor: "", perfil: "", status: "", departamento: "" };

type UsuariosState = {
  /** Cópia local do mock: as ações da tela alteram esta lista (sem API por enquanto) */
  usuarios: UsuarioSistema[];
  filters: Filters;
  pagination: Pagination;
  ordenacao: Ordenacao;
  selecionados: string[];
  dialog: { aberto: boolean; editando: UsuarioSistema | null };

  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  limparFiltros: () => void;
  setPagina: (pagina: number) => void;
  alternarOrdenacao: () => void;

  alternarSelecao: (id: string) => void;
  selecionarVarios: (ids: string[], marcar: boolean) => void;
  limparSelecao: () => void;

  abrirDialog: (usuario?: UsuarioSistema) => void;
  fecharDialog: () => void;
  salvar: (usuario: UsuarioSistema) => void;
  alterarStatus: (ids: string[], status: UsuarioStatus) => void;
};

export const useUsuariosStore = create<UsuariosState>((set) => ({
  usuarios: mockUsuarios,
  filters: FILTROS_INICIAIS,
  pagination: { pagina: 1, limite: 8 },
  ordenacao: "asc",
  selecionados: [],
  dialog: { aberto: false, editando: null },

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value }, pagination: { ...s.pagination, pagina: 1 } })),
  limparFiltros: () => set((s) => ({ filters: FILTROS_INICIAIS, pagination: { ...s.pagination, pagina: 1 } })),
  setPagina: (pagina) => set((s) => ({ pagination: { ...s.pagination, pagina } })),
  alternarOrdenacao: () => set((s) => ({ ordenacao: s.ordenacao === "asc" ? "desc" : "asc" })),

  alternarSelecao: (id) =>
    set((s) => ({
      selecionados: s.selecionados.includes(id) ? s.selecionados.filter((i) => i !== id) : [...s.selecionados, id],
    })),
  selecionarVarios: (ids, marcar) =>
    set((s) => ({
      selecionados: marcar ? Array.from(new Set([...s.selecionados, ...ids])) : s.selecionados.filter((i) => !ids.includes(i)),
    })),
  limparSelecao: () => set({ selecionados: [] }),

  abrirDialog: (usuario) => set({ dialog: { aberto: true, editando: usuario ?? null } }),
  fecharDialog: () => set({ dialog: { aberto: false, editando: null } }),
  salvar: (usuario) =>
    set((s) => {
      const existe = s.usuarios.some((u) => u.id === usuario.id);
      return {
        usuarios: existe ? s.usuarios.map((u) => (u.id === usuario.id ? usuario : u)) : [usuario, ...s.usuarios],
        dialog: { aberto: false, editando: null },
      };
    }),
  alterarStatus: (ids, status) =>
    set((s) => ({
      usuarios: s.usuarios.map((u) => (ids.includes(u.id) ? { ...u, status } : u)),
      selecionados: [],
    })),
}));
