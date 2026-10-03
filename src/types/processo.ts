import type { AprovacaoStatus, Prioridade, ProcessoStatus, TipoConteudo } from "@/enums";

export type Processo = {
  codigo: string;
  titulo: string;
  atualizadoEm: string;
  departamento: string;
  responsavel: string;
  status: ProcessoStatus;
  versao: string;
};

export type Atividade = {
  id: number;
  titulo: string;
  prazo: string;
  prioridade: Prioridade;
  concluida?: boolean;
};

export type TarefaGestao = {
  id: number;
  titulo: string;
  departamento: string;
  vence: string;
  status: string;
};

export type Aprovacao = {
  id: string;
  titulo: string;
  status: AprovacaoStatus;
  versao: string;
  departamento: string;
  descricao: string;
  solicitante: string;
  cargo: string;
  solicitadoEm: string;
};

export type ResultadoBusca = {
  id: string;
  tipo: TipoConteudo;
  comIa?: boolean;
  titulo: string;
  descricao: string;
  departamento: string;
  atualizado: string;
  autor: string;
  tags: string[];
  relevancia: number;
};

export type ArtigoPortal = {
  titulo: string;
  categoria: string;
  descricao: string;
  atualizado: string;
  nota: number;
  novo?: boolean;
};

export type CategoriaPortal = {
  nome: string;
  artigos: ArtigoPortal[];
};
