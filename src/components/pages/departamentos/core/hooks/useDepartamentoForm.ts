import { useFormik } from "formik";
import * as Yup from "yup";
import { DepartamentoStatus } from "@/enums";
import { useDepartamentosStore } from "../store/useDepartamentosStore";
import type { DepartamentoFormValues } from "../types";

const schema = Yup.object({
  nome: Yup.string().trim().min(2, "Nome muito curto").required("Informe o nome do departamento"),
  sigla: Yup.string()
    .trim()
    .matches(/^[A-Za-z]{2,4}$/, "Use de 2 a 4 letras")
    .required("Informe a sigla"),
  gestor: Yup.string().required("Selecione o gestor responsável"),
  centroCusto: Yup.string().trim().required("Informe o centro de custo"),
  descricao: Yup.string().trim().max(160, "Máximo de 160 caracteres"),
});

/** Formulário de criação/edição de departamento. Estático: salva apenas no store local. */
export function useDepartamentoForm() {
  const { dialog, salvar, departamentos } = useDepartamentosStore();
  const editando = dialog.editando;

  return useFormik<DepartamentoFormValues>({
    enableReinitialize: true,
    initialValues: {
      nome: editando?.nome ?? "",
      sigla: editando?.sigla ?? "",
      gestor: editando?.gestor ?? "",
      centroCusto: editando?.centroCusto ?? "",
      descricao: editando?.descricao ?? "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      salvar({
        ...values,
        sigla: values.sigla.toUpperCase(),
        id: editando?.id ?? `DEP-${String(departamentos.length + 1).padStart(2, "0")}`,
        colaboradores: editando?.colaboradores ?? 0,
        processos: editando?.processos ?? 0,
        cobertura: editando?.cobertura ?? 0,
        status: editando?.status ?? DepartamentoStatus.Ativo,
      });
      resetForm();
    },
  });
}
