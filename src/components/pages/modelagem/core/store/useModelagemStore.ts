import { create } from "zustand";
import type Modeler from "bpmn-js/lib/Modeler";

export type ElementoSelecionado = {
  id: string;
  tipo: string;
  nome: string;
  documentacao: string;
};

type ModelagemState = {
  modeler: Modeler | null;
  selecionado: ElementoSelecionado | null;
  zoom: number;
  alterado: boolean;
  salvoEm: Date | null;
  setModeler: (modeler: Modeler | null) => void;
  setSelecionado: (el: ElementoSelecionado | null) => void;
  setZoom: (zoom: number) => void;
  marcarAlterado: () => void;
  marcarSalvo: () => void;
};

export const useModelagemStore = create<ModelagemState>((set) => ({
  modeler: null,
  selecionado: null,
  zoom: 100,
  alterado: false,
  salvoEm: null,
  setModeler: (modeler) => set({ modeler }),
  setSelecionado: (selecionado) => set({ selecionado }),
  setZoom: (zoom) => set({ zoom }),
  marcarAlterado: () => set({ alterado: true }),
  marcarSalvo: () => set({ alterado: false, salvoEm: new Date() }),
}));
