import { useMemo } from "react";
import { SituacaoCota } from "@/enums";
import { mockConsumoDiario, mockPlanoIa } from "@/mocks/iaCotas";
import type { CotaDepartamento } from "@/types/organizacao";
import { useIaCotasStore } from "../store/useIaCotasStore";

/** ≥ 100% esgotada, ≥ 80% atenção (mesmo limite do alerta configurável). */
export function situacaoDaCota(c: CotaDepartamento) {
  const pct = c.usado / c.limite;
  return pct >= 1 ? SituacaoCota.Esgotada : pct >= 0.8 ? SituacaoCota.Atencao : SituacaoCota.Normal;
}

export const formatarNumero = (n: number) => n.toLocaleString("pt-BR");

export function useIaCotas() {
  const { cotas, periodo } = useIaCotasStore();

  const plano = useMemo(() => {
    const pct = mockPlanoIa.usados / mockPlanoIa.creditosMes;
    // Projeção linear: média diária do período × dias do mês
    const diasDecorridos = 30 - mockPlanoIa.diasParaRenovar;
    const projecao = Math.round((mockPlanoIa.usados / Math.max(1, diasDecorridos)) * 30);
    return { ...mockPlanoIa, pct, projecao, excede: projecao > mockPlanoIa.creditosMes };
  }, []);

  const consumo = useMemo(() => {
    const n = periodo === "7d" ? 7 : 30;
    return { dias: mockConsumoDiario.dias.slice(-n), valores: mockConsumoDiario.valores.slice(-n) };
  }, [periodo]);

  const cotasComSituacao = useMemo(
    () => cotas.map((c) => ({ ...c, pct: c.usado / c.limite, situacao: situacaoDaCota(c) })),
    [cotas],
  );

  const limiteDistribuido = cotas.reduce((acc, c) => acc + c.limite, 0);

  return { plano, consumo, cotas: cotasComSituacao, limiteDistribuido };
}
