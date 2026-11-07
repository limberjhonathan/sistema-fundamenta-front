import { create } from "zustand";
import { AcaoPermissao, ModuloSistema, PerfilAcesso } from "@/enums";
import { mockPerfis } from "@/mocks/permissoes";
import type { PerfilPermissao } from "@/types/organizacao";

export enum PermissoesAba {
  Editar = "editar",
  Comparar = "comparar",
}

const TODAS_ACOES = Object.values(AcaoPermissao);

type PermissoesState = {
  /** Versão salva */
  perfis: PerfilPermissao[];
  /** Cópia em edição: a diferença para `perfis` indica alterações não salvas */
  rascunho: PerfilPermissao[];
  selecionado: PerfilAcesso;
  aba: PermissoesAba;

  setAba: (aba: PermissoesAba) => void;
  selecionar: (perfil: PerfilAcesso) => void;
  alternarAcao: (modulo: ModuloSistema, acao: AcaoPermissao) => void;
  alternarModulo: (modulo: ModuloSistema) => void;
  descartar: () => void;
  salvar: () => void;
};

/** Regra: qualquer ação exige "Visualizar"; tirar "Visualizar" remove todas as outras. */
function aplicarRegra(acoes: AcaoPermissao[], acao: AcaoPermissao): AcaoPermissao[] {
  const tem = acoes.includes(acao);
  if (acao === AcaoPermissao.Visualizar) return tem ? [] : [AcaoPermissao.Visualizar];
  const novas = tem ? acoes.filter((a) => a !== acao) : [...acoes, acao];
  return tem ? novas : Array.from(new Set([AcaoPermissao.Visualizar, ...novas]));
}

const atualizarPerfil = (
  lista: PerfilPermissao[],
  perfil: PerfilAcesso,
  fn: (p: PerfilPermissao) => PerfilPermissao,
) => lista.map((p) => (p.perfil === perfil && !p.bloqueado ? fn(p) : p));

export const usePermissoesStore = create<PermissoesState>((set) => ({
  perfis: mockPerfis,
  rascunho: mockPerfis,
  selecionado: PerfilAcesso.Gestor,
  aba: PermissoesAba.Editar,

  setAba: (aba) => set({ aba }),
  selecionar: (selecionado) => set({ selecionado, aba: PermissoesAba.Editar }),
  alternarAcao: (modulo, acao) =>
    set((s) => ({
      rascunho: atualizarPerfil(s.rascunho, s.selecionado, (p) => ({
        ...p,
        permissoes: { ...p.permissoes, [modulo]: aplicarRegra(p.permissoes[modulo], acao) },
      })),
    })),
  alternarModulo: (modulo) =>
    set((s) => ({
      rascunho: atualizarPerfil(s.rascunho, s.selecionado, (p) => ({
        ...p,
        permissoes: {
          ...p.permissoes,
          [modulo]: p.permissoes[modulo].length === TODAS_ACOES.length ? [] : [...TODAS_ACOES],
        },
      })),
    })),
  descartar: () => set((s) => ({ rascunho: s.perfis })),
  salvar: () => set((s) => ({ perfis: s.rascunho })),
}));
