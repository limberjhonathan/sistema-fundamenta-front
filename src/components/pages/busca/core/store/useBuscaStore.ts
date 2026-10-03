import { create } from "zustand";
import { TipoConteudo } from "@/enums";

type BuscaState = {
  termo: string;
  tipos: TipoConteudo[];
  departamentos: string[];
  pagina: number;
  setTermo: (termo: string) => void;
  alternarTipo: (tipo: TipoConteudo) => void;
  alternarDepartamento: (dep: string) => void;
  limparFiltros: () => void;
  setPagina: (pagina: number) => void;
};

const TODOS_TIPOS = Object.values(TipoConteudo);

const alternar = <T,>(lista: T[], item: T) => (lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]);

export const useBuscaStore = create<BuscaState>((set) => ({
  termo: "Onboarding",
  tipos: TODOS_TIPOS,
  departamentos: [],
  pagina: 1,
  setTermo: (termo) => set({ termo, pagina: 1 }),
  alternarTipo: (tipo) => set((s) => ({ tipos: alternar(s.tipos, tipo), pagina: 1 })),
  alternarDepartamento: (dep) => set((s) => ({ departamentos: alternar(s.departamentos, dep), pagina: 1 })),
  limparFiltros: () => set({ tipos: TODOS_TIPOS, departamentos: [], pagina: 1 }),
  setPagina: (pagina) => set({ pagina }),
}));
