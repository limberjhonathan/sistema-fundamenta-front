import { useMemo } from "react";
import { DepartamentoStatus } from "@/enums";
import { mockProcessos } from "@/mocks/processos";
import { mockUsuarios } from "@/mocks/usuarios";
import { useDepartamentosStore } from "../store/useDepartamentosStore";

export function useDepartamentos() {
  const { departamentos, buscaPor, ordenacao, mostrarInativos, detalheId } = useDepartamentosStore();

  const lista = useMemo(() => {
    const termo = buscaPor.trim().toLowerCase();
    return departamentos
      .filter((d) => mostrarInativos || d.status === DepartamentoStatus.Ativo)
      .filter(
        (d) =>
          !termo ||
          d.nome.toLowerCase().includes(termo) ||
          d.sigla.toLowerCase().includes(termo) ||
          d.gestor.toLowerCase().includes(termo),
      )
      .sort((a, b) => (ordenacao === "nome" ? a.nome.localeCompare(b.nome, "pt-BR") : b[ordenacao] - a[ordenacao]));
  }, [departamentos, buscaPor, ordenacao, mostrarInativos]);

  const resumo = useMemo(() => {
    const ativos = departamentos.filter((d) => d.status === DepartamentoStatus.Ativo);
    return {
      ativos: ativos.length,
      inativos: departamentos.length - ativos.length,
      colaboradores: ativos.reduce((acc, d) => acc + d.colaboradores, 0),
      processos: ativos.reduce((acc, d) => acc + d.processos, 0),
      coberturaMedia: Math.round(ativos.reduce((acc, d) => acc + d.cobertura, 0) / Math.max(1, ativos.length)),
    };
  }, [departamentos]);

  const detalhe = useMemo(() => {
    const dep = departamentos.find((d) => d.id === detalheId);
    if (!dep) return null;
    // O mock de processos repete lotes com o mesmo título: mostramos só títulos únicos
    const vistos = new Set<string>();
    const processos = mockProcessos.filter(
      (p) => p.departamento === dep.nome && !vistos.has(p.titulo) && vistos.add(p.titulo),
    );
    const membros = mockUsuarios.filter((u) => u.departamento === dep.nome);
    return { departamento: dep, processos, membros };
  }, [departamentos, detalheId]);

  return { lista, resumo, detalhe };
}
