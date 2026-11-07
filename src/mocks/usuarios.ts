import { PerfilAcesso, UsuarioStatus } from "@/enums";
import type { UsuarioSistema } from "@/types/usuario";

const emailDe = (nome: string) => {
  const partes = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(" ");
  return `${partes[0]}.${partes[partes.length - 1]}@fundamenta.com`;
};

const u = (
  id: string,
  nome: string,
  cargo: string,
  departamento: string,
  perfil: PerfilAcesso,
  status: UsuarioStatus,
  ultimoAcesso: string,
): UsuarioSistema => ({ id, nome, cargo, departamento, perfil, status, ultimoAcesso, email: emailDe(nome) });

export const mockUsuarios: UsuarioSistema[] = [
  u("USR-001", "João Duarte", "Gerente de Processos", "Operações", PerfilAcesso.Administrador, UsuarioStatus.Ativo, "Agora"),
  u("USR-002", "Ana Silva", "Coordenadora Financeira", "Financeiro", PerfilAcesso.Gestor, UsuarioStatus.Ativo, "Há 12 min"),
  u("USR-003", "Carlos Mendes", "Analista de RH", "Recursos Humanos", PerfilAcesso.Editor, UsuarioStatus.Ativo, "Há 1 h"),
  u("USR-004", "Roberto Souza", "Supervisor de Manutenção", "Operações", PerfilAcesso.Editor, UsuarioStatus.Ativo, "Hoje, 08:40"),
  u("USR-005", "Mariana Costa", "Gerente de TI", "TI", PerfilAcesso.Gestor, UsuarioStatus.Ativo, "Hoje, 10:15"),
  u("USR-006", "Juliana Lima", "Analista de Marketing", "Marketing", PerfilAcesso.Editor, UsuarioStatus.Inativo, "02/04/2024"),
  u("USR-007", "Fernando Rocha", "Advogado Sênior", "Jurídico", PerfilAcesso.Gestor, UsuarioStatus.Ativo, "Ontem, 18:02"),
  u("USR-008", "Patrícia Alves", "Diretora de Pessoas", "Recursos Humanos", PerfilAcesso.Gestor, UsuarioStatus.Ativo, "Ontem, 16:30"),
  u("USR-009", "Lucas Ferreira", "Analista de Dados", "TI", PerfilAcesso.Editor, UsuarioStatus.Ativo, "Hoje, 09:05"),
  u("USR-010", "Beatriz Ramos", "Assistente Administrativa", "Financeiro", PerfilAcesso.Leitor, UsuarioStatus.Ativo, "Há 3 h"),
  u("USR-011", "Diego Martins", "Técnico de Campo", "Operações", PerfilAcesso.Leitor, UsuarioStatus.Ativo, "Ontem, 07:50"),
  u("USR-012", "Camila Rocha", "Estagiária Jurídica", "Jurídico", PerfilAcesso.Leitor, UsuarioStatus.Convidado, "Nunca acessou"),
  u("USR-013", "Rafael Nunes", "Desenvolvedor", "TI", PerfilAcesso.Leitor, UsuarioStatus.Convidado, "Nunca acessou"),
  u("USR-014", "Larissa Gomes", "Coordenadora de Marketing", "Marketing", PerfilAcesso.Gestor, UsuarioStatus.Ativo, "Hoje, 11:20"),
  u("USR-015", "Thiago Barbosa", "Analista de Compras", "Financeiro", PerfilAcesso.Editor, UsuarioStatus.Ativo, "Há 2 dias"),
  u("USR-016", "Vanessa Prado", "Analista de Qualidade", "Operações", PerfilAcesso.Editor, UsuarioStatus.Ativo, "Há 5 h"),
  u("USR-017", "Gustavo Pires", "Auxiliar de Logística", "Operações", PerfilAcesso.Leitor, UsuarioStatus.Inativo, "15/01/2024"),
  u("USR-018", "Helena Duarte", "Analista de Recrutamento", "Recursos Humanos", PerfilAcesso.Leitor, UsuarioStatus.Ativo, "Hoje, 08:12"),
];

/** Licenças contratadas no plano atual. */
export const LICENCAS_CONTRATADAS = 25;
