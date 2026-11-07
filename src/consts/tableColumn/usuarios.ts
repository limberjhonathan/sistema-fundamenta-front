import type { TableColumn } from "./processos";

export const USUARIOS_COLUMNS: TableColumn[] = [
  { key: "nome", label: "Usuário", sortable: true },
  { key: "departamento", label: "Departamento", width: 170 },
  { key: "perfil", label: "Perfil", width: 140 },
  { key: "status", label: "Status", width: 160 },
  { key: "ultimoAcesso", label: "Último acesso", width: 150 },
  { key: "acoes", label: "Ações", width: 70, align: "center" },
];
