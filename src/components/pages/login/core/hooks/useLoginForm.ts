import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export type LoginValues = { email: string; senha: string; manterConectado: boolean };

const schema = Yup.object({
  email: Yup.string().email("Informe um e-mail válido").required("Informe seu e-mail corporativo"),
  senha: Yup.string().min(6, "A senha deve ter ao menos 6 caracteres").required("Informe sua senha"),
  manterConectado: Yup.boolean(),
});

export function useLoginForm() {
  const router = useRouter();

  return useFormik<LoginValues>({
    initialValues: { email: "", senha: "", manterConectado: false },
    validationSchema: schema,
    // Estático por enquanto: sem chamada à API, apenas navega para o dashboard
    onSubmit: () => router.push("/dashboard"),
  });
}
