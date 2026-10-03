import type { UserRole } from "@/enums";

export type Usuario = {
  nome: string;
  primeiroNome: string;
  iniciais: string;
  cargo: string;
  email: string;
  role: UserRole;
};
