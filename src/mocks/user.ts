import { UserRole } from "@/enums";
import type { Usuario } from "@/types/usuario";

export const mockUser: Usuario = {
  nome: "João Duarte",
  primeiroNome: "João",
  iniciais: "JD",
  cargo: "Gerente de Processos",
  email: "admin@fundamenta.com",
  role: UserRole.Gestor,
};
