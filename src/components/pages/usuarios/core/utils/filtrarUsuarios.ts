import type { UsuarioSistema } from "@/types/usuario";
import type { Filters, Ordenacao } from "../types";

/** Aplica filtros e ordenação por nome (lado cliente, enquanto não há API). */
export function filtrarUsuarios(lista: UsuarioSistema[], filters: Filters, ordenacao: Ordenacao) {
  const busca = filters.buscaPor.trim().toLowerCase();

  return lista
    .filter((u) => !busca || u.nome.toLowerCase().includes(busca) || u.email.toLowerCase().includes(busca))
    .filter((u) => !filters.perfil || u.perfil === filters.perfil)
    .filter((u) => !filters.status || u.status === filters.status)
    .filter((u) => !filters.departamento || u.departamento === filters.departamento)
    .sort((a, b) => (ordenacao === "asc" ? 1 : -1) * a.nome.localeCompare(b.nome, "pt-BR"));
}
