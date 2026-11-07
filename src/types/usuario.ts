import type { PerfilAcesso, UserRole, UsuarioStatus } from "@/enums";

export type Usuario = {
  nome: string;
  primeiroNome: string;
  iniciais: string;
  cargo: string;
  email: string;
  role: UserRole;
};

/** Usuário cadastrado na organização (tela de administração de usuários). */
export type UsuarioSistema = {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  perfil: PerfilAcesso;
  status: UsuarioStatus;
  ultimoAcesso: string;
};
