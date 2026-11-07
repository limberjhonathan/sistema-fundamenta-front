import type { PerfilAcesso, UsuarioStatus } from "@/enums";

export type Filters = {
  buscaPor: string;
  perfil: PerfilAcesso | "";
  status: UsuarioStatus | "";
  departamento: string;
};

export type Pagination = { pagina: number; limite: number };

export type Ordenacao = "asc" | "desc";

export type UsuarioFormValues = {
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  perfil: PerfilAcesso;
  enviarConvite: boolean;
};
