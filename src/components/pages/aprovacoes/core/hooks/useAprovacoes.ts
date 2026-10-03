import { useMemo } from "react";
import { mockAprovacoes } from "@/mocks/aprovacoes";
import { AprovacoesAba, useAprovacoesStore } from "../store/useAprovacoesStore";

export function useAprovacoes() {
  const { aba, buscaPor, decisoes, decidir } = useAprovacoesStore();

  const pendentes = useMemo(() => mockAprovacoes.filter((a) => !decisoes[a.id]), [decisoes]);
  const historico = useMemo(() => mockAprovacoes.filter((a) => decisoes[a.id]), [decisoes]);

  const lista = useMemo(() => {
    const base = aba === AprovacoesAba.Pendentes ? pendentes : aba === AprovacoesAba.MeuHistorico ? historico : [];
    const termo = buscaPor.trim().toLowerCase();
    return base.filter((a) => !termo || a.titulo.toLowerCase().includes(termo) || a.id.toLowerCase().includes(termo));
  }, [aba, buscaPor, pendentes, historico]);

  return { lista, totalPendentes: pendentes.length, decisoes, decidir };
}
