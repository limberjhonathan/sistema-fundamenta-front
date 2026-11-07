import type { TableColumn } from "./processos";

export const COTAS_COLUMNS: TableColumn[] = [
  { key: "departamento", label: "Departamento" },
  { key: "uso", label: "Uso no mês", width: "38%" },
  { key: "limite", label: "Limite mensal", width: 140, align: "right" },
  { key: "situacao", label: "Situação", width: 140 },
  { key: "acoes", label: "", width: 60, align: "center" },
];
