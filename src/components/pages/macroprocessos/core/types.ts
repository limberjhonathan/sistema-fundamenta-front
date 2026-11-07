import type { TipoMacroprocesso } from "@/enums";

export type FiltroTipo = TipoMacroprocesso | "todos";

export type MacroprocessoFormValues = {
  nome: string;
  codigo: string;
  tipo: TipoMacroprocesso;
  dono: string;
  departamentos: string[];
  descricao: string;
};
