import { useMemo } from "react";
import { mockProcessos } from "@/mocks/processos";
import { useProcessosTableStore } from "../store/useProcessosTableStore";
import { filtrarProcessos } from "../utils/filtrarProcessos";

/** Junta o store da view com os dados (mock) e devolve { table, filters, pagination }. */
export function useProcessosTable() {
  const store = useProcessosTableStore();
  const { filters, pagination, ordenacao } = store;

  const filtrados = useMemo(() => filtrarProcessos(mockProcessos, filters, ordenacao), [filters, ordenacao]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / pagination.limite));
  const inicio = (pagination.pagina - 1) * pagination.limite;

  return {
    table: {
      linhas: filtrados.slice(inicio, inicio + pagination.limite),
      ordenacao,
      alternarOrdenacao: store.alternarOrdenacao,
    },
    filters: { valores: filters, setFilter: store.setFilter, limpar: store.limparFiltros },
    pagination: { ...pagination, total: filtrados.length, totalPaginas, setPagina: store.setPagina },
  };
}
