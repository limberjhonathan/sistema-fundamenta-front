import { useMemo } from "react";
import { UsuarioStatus } from "@/enums";
import { LICENCAS_CONTRATADAS } from "@/mocks/usuarios";
import { useUsuariosStore } from "../store/useUsuariosStore";
import { filtrarUsuarios } from "../utils/filtrarUsuarios";

/** Junta o store com os dados e devolve { table, filters, pagination, selecao, resumo }. */
export function useUsuarios() {
  const store = useUsuariosStore();
  const { usuarios, filters, pagination, ordenacao, selecionados } = store;

  const filtrados = useMemo(() => filtrarUsuarios(usuarios, filters, ordenacao), [usuarios, filters, ordenacao]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / pagination.limite));
  const inicio = (pagination.pagina - 1) * pagination.limite;
  const linhas = filtrados.slice(inicio, inicio + pagination.limite);

  const resumo = useMemo(() => {
    const ativos = usuarios.filter((u) => u.status === UsuarioStatus.Ativo).length;
    const convidados = usuarios.filter((u) => u.status === UsuarioStatus.Convidado).length;
    // Licença é consumida por usuários ativos e convites pendentes
    const licencasUsadas = ativos + convidados;
    return { total: usuarios.length, ativos, convidados, licencasUsadas, licencasTotal: LICENCAS_CONTRATADAS };
  }, [usuarios]);

  const idsPagina = linhas.map((u) => u.id);
  const marcadosNaPagina = idsPagina.filter((id) => selecionados.includes(id)).length;

  return {
    table: { linhas, ordenacao, alternarOrdenacao: store.alternarOrdenacao },
    filters: { valores: filters, setFilter: store.setFilter, limpar: store.limparFiltros },
    pagination: { ...pagination, total: filtrados.length, totalPaginas, setPagina: store.setPagina },
    selecao: {
      ids: selecionados,
      todosNaPagina: idsPagina.length > 0 && marcadosNaPagina === idsPagina.length,
      algunsNaPagina: marcadosNaPagina > 0 && marcadosNaPagina < idsPagina.length,
      alternar: store.alternarSelecao,
      alternarPagina: (marcar: boolean) => store.selecionarVarios(idsPagina, marcar),
      limpar: store.limparSelecao,
    },
    resumo,
  };
}
