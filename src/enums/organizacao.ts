/** Classificação dos macroprocessos na cadeia de valor. */
export enum TipoMacroprocesso {
  Gestao = "gestao",
  Finalistico = "finalistico",
  Suporte = "suporte",
}

export enum DepartamentoStatus {
  Ativo = "ativo",
  Inativo = "inativo",
}

export enum ModuloSistema {
  Processos = "processos",
  Modelagem = "modelagem",
  Aprovacoes = "aprovacoes",
  Portal = "portal",
  Assistente = "assistente",
  Administracao = "administracao",
}

export enum AcaoPermissao {
  Visualizar = "visualizar",
  Criar = "criar",
  Editar = "editar",
  Excluir = "excluir",
  Aprovar = "aprovar",
}

export enum RecursoIa {
  NovoComIa = "novo-com-ia",
  Modelagem = "modelagem",
  Assistente = "assistente",
  Busca = "busca",
}

export enum SituacaoCota {
  Normal = "normal",
  Atencao = "atencao",
  Esgotada = "esgotada",
}
