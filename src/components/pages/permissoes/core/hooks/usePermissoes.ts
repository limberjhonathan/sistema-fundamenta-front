import { useMemo } from "react";
import { AcaoPermissao, ModuloSistema } from "@/enums";
import type { PerfilPermissao } from "@/types/organizacao";
import { usePermissoesStore } from "../store/usePermissoesStore";

const TOTAL_ACOES = Object.values(AcaoPermissao).length * Object.values(ModuloSistema).length;

const iguais = (a: PerfilPermissao, b: PerfilPermissao) =>
  Object.values(ModuloSistema).every(
    (m) => a.permissoes[m].length === b.permissoes[m].length && a.permissoes[m].every((x) => b.permissoes[m].includes(x)),
  );

/** Quantas ações o perfil tem liberadas, de todas as possíveis. */
export const contarAcoes = (p: PerfilPermissao) =>
  Object.values(p.permissoes).reduce((acc, acoes) => acc + acoes.length, 0);

export function usePermissoes() {
  const { perfis, rascunho, selecionado } = usePermissoesStore();

  const atual = rascunho.find((p) => p.perfil === selecionado)!;

  /** Perfis com alteração pendente (para marcar na lista e mostrar a barra de salvar). */
  const alterados = useMemo(
    () => rascunho.filter((r) => !iguais(r, perfis.find((p) => p.perfil === r.perfil)!)).map((r) => r.perfil),
    [rascunho, perfis],
  );

  return { atual, perfis: rascunho, alterados, totalAcoes: TOTAL_ACOES };
}
