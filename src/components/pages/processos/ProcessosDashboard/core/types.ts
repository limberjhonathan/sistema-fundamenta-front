import type { ProcessoStatus } from "@/enums";

export type Filters = {
  buscaPor: string;
  status: ProcessoStatus | "";
  departamento: string;
};

export type Pagination = {
  pagina: number;
  limite: number;
};

export type Ordenacao = "asc" | "desc";
