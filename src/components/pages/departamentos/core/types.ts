export type OrdenacaoDepartamento = "nome" | "processos" | "colaboradores" | "cobertura";

export type DepartamentoFormValues = {
  nome: string;
  sigla: string;
  gestor: string;
  centroCusto: string;
  descricao: string;
};
