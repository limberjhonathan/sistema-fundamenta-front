import type {
  AcaoPermissao,
  DepartamentoStatus,
  ModuloSistema,
  PerfilAcesso,
  RecursoIa,
  TipoMacroprocesso,
} from "@/enums";

export type Departamento = {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  gestor: string;
  centroCusto: string;
  colaboradores: number;
  processos: number;
  /** % de atividades do departamento já mapeadas em processos */
  cobertura: number;
  status: DepartamentoStatus;
};

export type Macroprocesso = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  tipo: TipoMacroprocesso;
  dono: string;
  departamentos: string[];
  /** Códigos dos processos (ver mocks/processos) vinculados ao macroprocesso */
  processos: string[];
  /** Maturidade de 1 a 5 */
  maturidade: number;
};

/** Permissões de um perfil: módulo → ações liberadas. */
export type MatrizPermissoes = Record<ModuloSistema, AcaoPermissao[]>;

export type PerfilPermissao = {
  perfil: PerfilAcesso;
  descricao: string;
  usuarios: number;
  /** Perfis de sistema não podem ser editados */
  bloqueado?: boolean;
  permissoes: MatrizPermissoes;
};

export type ConsumoRecursoIa = {
  recurso: RecursoIa;
  creditos: number;
  requisicoes: number;
};

export type CotaDepartamento = {
  departamento: string;
  limite: number;
  usado: number;
};

export type ConsumidorIa = {
  nome: string;
  departamento: string;
  creditos: number;
};

export type ConfiguracaoIa = {
  chave: string;
  titulo: string;
  descricao: string;
  ativo: boolean;
};
