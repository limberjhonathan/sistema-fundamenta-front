import type { Processo } from "@/types/processo";
import type { Filters, Ordenacao } from "../types";

/** Aplica filtros e ordenação sobre a lista (lado cliente, enquanto não há API). */
export function filtrarProcessos(lista: Processo[], filters: Filters, ordenacao: Ordenacao) {
  const busca = filters.buscaPor.trim().toLowerCase();

  return lista
    .filter((p) => !busca || p.codigo.toLowerCase().includes(busca) || p.titulo.toLowerCase().includes(busca))
    .filter((p) => !filters.status || p.status === filters.status)
    .filter((p) => !filters.departamento || p.departamento === filters.departamento)
    .sort((a, b) => (ordenacao === "asc" ? 1 : -1) * a.codigo.localeCompare(b.codigo));
}
