import { useFormik } from "formik";
import * as Yup from "yup";
import { PerfilAcesso, UsuarioStatus } from "@/enums";
import { useUsuariosStore } from "../store/useUsuariosStore";
import type { UsuarioFormValues } from "../types";

const schema = Yup.object({
  nome: Yup.string().trim().min(3, "Informe o nome completo").required("Informe o nome"),
  email: Yup.string().email("Informe um e-mail válido").required("Informe o e-mail corporativo"),
  cargo: Yup.string().trim().required("Informe o cargo"),
  departamento: Yup.string().required("Selecione o departamento"),
  perfil: Yup.mixed<PerfilAcesso>().oneOf(Object.values(PerfilAcesso)).required(),
  enviarConvite: Yup.boolean(),
});

/** Formulário de convite/edição de usuário. Estático: salva apenas no store local. */
export function useUsuarioForm() {
  const { dialog, salvar, usuarios } = useUsuariosStore();
  const editando = dialog.editando;

  return useFormik<UsuarioFormValues>({
    enableReinitialize: true,
    initialValues: {
      nome: editando?.nome ?? "",
      email: editando?.email ?? "",
      cargo: editando?.cargo ?? "",
      departamento: editando?.departamento ?? "",
      perfil: editando?.perfil ?? PerfilAcesso.Leitor,
      enviarConvite: !editando,
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const { enviarConvite, ...dados } = values;
      salvar({
        ...dados,
        id: editando?.id ?? `USR-${String(usuarios.length + 1).padStart(3, "0")}`,
        status: editando?.status ?? (enviarConvite ? UsuarioStatus.Convidado : UsuarioStatus.Ativo),
        ultimoAcesso: editando?.ultimoAcesso ?? "Nunca acessou",
      });
      resetForm();
    },
  });
}
