import { AcaoPermissao as A, ModuloSistema as M, PerfilAcesso } from "@/enums";
import type { PerfilPermissao } from "@/types/organizacao";

const TODAS = [A.Visualizar, A.Criar, A.Editar, A.Excluir, A.Aprovar];

export const mockPerfis: PerfilPermissao[] = [
  {
    perfil: PerfilAcesso.Administrador,
    descricao: "Acesso irrestrito a todos os módulos e às configurações da organização.",
    usuarios: 1,
    bloqueado: true,
    permissoes: {
      [M.Processos]: TODAS,
      [M.Modelagem]: TODAS,
      [M.Aprovacoes]: TODAS,
      [M.Portal]: TODAS,
      [M.Assistente]: TODAS,
      [M.Administracao]: TODAS,
    },
  },
  {
    perfil: PerfilAcesso.Gestor,
    descricao: "Aprova alterações, acompanha indicadores e gerencia os processos do seu departamento.",
    usuarios: 6,
    permissoes: {
      [M.Processos]: [A.Visualizar, A.Criar, A.Editar, A.Aprovar],
      [M.Modelagem]: [A.Visualizar, A.Criar, A.Editar],
      [M.Aprovacoes]: [A.Visualizar, A.Aprovar],
      [M.Portal]: [A.Visualizar, A.Criar, A.Editar],
      [M.Assistente]: [A.Visualizar, A.Criar],
      [M.Administracao]: [A.Visualizar],
    },
  },
  {
    perfil: PerfilAcesso.Editor,
    descricao: "Cria e modela processos e documentos, enviando-os para aprovação.",
    usuarios: 6,
    permissoes: {
      [M.Processos]: [A.Visualizar, A.Criar, A.Editar],
      [M.Modelagem]: [A.Visualizar, A.Criar, A.Editar],
      [M.Aprovacoes]: [A.Visualizar],
      [M.Portal]: [A.Visualizar, A.Criar],
      [M.Assistente]: [A.Visualizar, A.Criar],
      [M.Administracao]: [],
    },
  },
  {
    perfil: PerfilAcesso.Leitor,
    descricao: "Consulta processos publicados e o portal, e conversa com o assistente.",
    usuarios: 5,
    permissoes: {
      [M.Processos]: [A.Visualizar],
      [M.Modelagem]: [],
      [M.Aprovacoes]: [],
      [M.Portal]: [A.Visualizar],
      [M.Assistente]: [A.Visualizar, A.Criar],
      [M.Administracao]: [],
    },
  },
];
