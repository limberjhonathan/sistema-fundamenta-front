import { useMemo } from "react";
import { TipoMacroprocesso } from "@/enums";
import { mockProcessos } from "@/mocks/processos";
import type { Processo } from "@/types/processo";
import { useMacroprocessosStore } from "../store/useMacroprocessosStore";

// Índice código → processo (o mock repete lotes; ficamos com a primeira ocorrência)
const PROCESSOS_POR_CODIGO = mockProcessos.reduce<Record<string, Processo>>((acc, p) => {
  acc[p.codigo] ??= p;
  return acc;
}, {});

export function useMacroprocessos() {
  const { macroprocessos, tipo, buscaPor } = useMacroprocessosStore();

  const lista = useMemo(() => {
    const termo = buscaPor.trim().toLowerCase();
    return macroprocessos
      .filter((m) => tipo === "todos" || m.tipo === tipo)
      .filter((m) => !termo || m.nome.toLowerCase().includes(termo) || m.codigo.toLowerCase().includes(termo))
      .map((m) => ({ ...m, processosDetalhe: m.processos.map((c) => PROCESSOS_POR_CODIGO[c]).filter(Boolean) }));
  }, [macroprocessos, tipo, buscaPor]);

  /** Macroprocessos agrupados por tipo para desenhar a cadeia de valor (ignora filtros). */
  const cadeia = useMemo(
    () =>
      Object.values(TipoMacroprocesso).reduce(
        (acc, t) => ({ ...acc, [t]: macroprocessos.filter((m) => m.tipo === t) }),
        {} as Record<TipoMacroprocesso, typeof macroprocessos>,
      ),
    [macroprocessos],
  );

  const resumo = useMemo(() => {
    const vinculados = macroprocessos.reduce((acc, m) => acc + m.processos.length, 0);
    return {
      total: macroprocessos.length,
      vinculados,
      semProcessos: macroprocessos.filter((m) => m.processos.length === 0).length,
      maturidadeMedia: macroprocessos.reduce((acc, m) => acc + m.maturidade, 0) / Math.max(1, macroprocessos.length),
    };
  }, [macroprocessos]);

  const contagemPorTipo = useMemo(
    () =>
      Object.values(TipoMacroprocesso).reduce(
        (acc, t) => ({ ...acc, [t]: macroprocessos.filter((m) => m.tipo === t).length }),
        { todos: macroprocessos.length } as Record<TipoMacroprocesso | "todos", number>,
      ),
    [macroprocessos],
  );

  return { lista, cadeia, resumo, contagemPorTipo };
}
