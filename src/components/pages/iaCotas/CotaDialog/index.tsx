"use client";

import { Alert, Box, InputAdornment, Slider, TextField, Typography } from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormDialog from "@/components/shared/FormDialog";
import { formatarNumero, useIaCotas } from "../core/hooks/useIaCotas";
import { useIaCotasStore } from "../core/store/useIaCotasStore";

const PASSO = 250;

/** Modal para ajustar o limite mensal de créditos de um departamento. */
export default function CotaDialog() {
  const { editandoCota, fecharCota, salvarLimite } = useIaCotasStore();
  const { cotas, plano, limiteDistribuido } = useIaCotas();
  const cota = cotas.find((c) => c.departamento === editandoCota);

  // Quanto ainda dá para distribuir sem passar do plano (somando de volta o limite atual deste departamento)
  const maximo = plano.creditosMes - limiteDistribuido + (cota?.limite ?? 0);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: { limite: cota?.limite ?? 0 },
    validationSchema: Yup.object({
      limite: Yup.number()
        .typeError("Informe um número")
        .min(cota?.usado ?? 0, `Não pode ficar abaixo do já consumido (${formatarNumero(cota?.usado ?? 0)})`)
        .max(maximo, `Máximo disponível no plano: ${formatarNumero(maximo)}`)
        .required("Informe o limite"),
    }),
    onSubmit: (v) => cota && salvarLimite(cota.departamento, Number(v.limite)),
  });

  if (!cota) return null;

  const pctNovo = Math.round((cota.usado / Math.max(1, Number(form.values.limite))) * 100);

  return (
    <FormDialog
      open={!!editandoCota}
      onClose={fecharCota}
      onSubmit={form.submitForm}
      titulo={`Cota de IA · ${cota.departamento}`}
      subtitulo="Defina quantos créditos o departamento pode usar por ciclo."
      icon={<TuneRounded />}
      textoConfirmar="Salvar limite"
      maxWidth="xs"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
        <span>Consumido no ciclo</span>
        <b>{formatarNumero(cota.usado)} créditos</b>
      </Box>

      <Box sx={{ px: 1 }}>
        <Slider
          value={Number(form.values.limite) || 0}
          min={0}
          max={Math.max(maximo, cota.limite)}
          step={PASSO}
          onChange={(_, v) => form.setFieldValue("limite", v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={formatarNumero}
          aria-label="Limite mensal"
        />
      </Box>

      <TextField
        label="Limite mensal"
        size="small"
        type="number"
        {...form.getFieldProps("limite")}
        error={!!form.errors.limite}
        helperText={form.errors.limite ?? `Disponível para distribuir: ${formatarNumero(maximo)}`}
        slotProps={{ input: { endAdornment: <InputAdornment position="end">créditos</InputAdornment> } }}
      />

      <Alert severity={pctNovo >= 100 ? "error" : pctNovo >= 80 ? "warning" : "success"} sx={{ borderRadius: 2 }}>
        <Typography sx={{ fontSize: "0.8125rem" }}>
          Com este limite, o departamento terá usado <b>{pctNovo}%</b> da cota.
        </Typography>
      </Alert>
    </FormDialog>
  );
}
