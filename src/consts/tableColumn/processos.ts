export type TableColumn = { key: string; label: string; width?: string | number; align?: "left" | "center" | "right"; sortable?: boolean };

export const PROCESSOS_COLUMNS: TableColumn[] = [
  { key: "codigo", label: "Código", width: 110, sortable: true },
  { key: "titulo", label: "Título do Processo" },
  { key: "departamento", label: "Departamento", width: 170 },
  { key: "responsavel", label: "Responsável", width: 150 },
  { key: "status", label: "Status", width: 150 },
  { key: "versao", label: "Versão", width: 80 },
  { key: "acoes", label: "Ações", width: 70, align: "center" },
];
