import { useFormik } from "formik";
import * as Yup from "yup";
import { TipoMacroprocesso } from "@/enums";
import { useMacroprocessosStore } from "../store/useMacroprocessosStore";
import type { MacroprocessoFormValues } from "../types";

const PREFIXO: Record<TipoMacroprocesso, string> = {
  [TipoMacroprocesso.Gestao]: "GES",
  [TipoMacroprocesso.Finalistico]: "FIN",
  [TipoMacroprocesso.Suporte]: "SUP",
};

const schema = Yup.object({
  nome: Yup.string().trim().min(3, "Nome muito curto").required("Informe o nome do macroprocesso"),
  codigo: Yup.string()
    .trim()
    .matches(/^MP-[A-Z]{3}-\d{2}$/, "Use o formato MP-XXX-00")
    .required("Informe o código"),
  tipo: Yup.mixed<TipoMacroprocesso>().oneOf(Object.values(TipoMacroprocesso)).required(),
  dono: Yup.string().required("Selecione o dono do macroprocesso"),
  departamentos: Yup.array(Yup.string()).min(1, "Selecione ao menos um departamento"),
  descricao: Yup.string().trim().max(200, "Máximo de 200 caracteres"),
});

/** Sugere o próximo código livre para o tipo escolhido (ex.: MP-SUP-04). */
export function sugerirCodigo(tipo: TipoMacroprocesso, existentes: string[]) {
  const prefixo = `MP-${PREFIXO[tipo]}-`;
  const usados = existentes.filter((c) => c.startsWith(prefixo)).map((c) => Number(c.slice(prefixo.length)));
  return `${prefixo}${String(Math.max(0, ...usados) + 1).padStart(2, "0")}`;
}

export function useMacroprocessoForm() {
  const { dialog, salvar, macroprocessos } = useMacroprocessosStore();
  const editando = dialog.editando;
  const codigos = macroprocessos.map((m) => m.codigo);

  return useFormik<MacroprocessoFormValues>({
    enableReinitialize: true,
    initialValues: {
      nome: editando?.nome ?? "",
      codigo: editando?.codigo ?? sugerirCodigo(TipoMacroprocesso.Suporte, codigos),
      tipo: editando?.tipo ?? TipoMacroprocesso.Suporte,
      dono: editando?.dono ?? "",
      departamentos: editando?.departamentos ?? [],
      descricao: editando?.descricao ?? "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      salvar({
        ...values,
        id: editando?.id ?? `MP-${String(macroprocessos.length + 1).padStart(2, "0")}`,
        processos: editando?.processos ?? [],
        maturidade: editando?.maturidade ?? 1,
      });
      resetForm();
    },
  });
}
