"use client";

import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useNovoComIaStore, type NovoProcessoDados } from "@/components/store/useNovoComIaStore";
import * as S from "../../style";

const NIVEIS: { value: NovoProcessoDados["nivelDetalhe"]; label: string }[] = [
  { value: "essencial", label: "Essencial (happy path)" },
  { value: "detalhado", label: "Detalhado (com exceções)" },
  { value: "completo", label: "Completo (RACI + SIPOC)" },
];

export default function EtapaEstrategia() {
  const { dados, setCampo } = useNovoComIaStore();

  return (
    <>
      <Typography sx={S.Label}>Objetivo do processo</Typography>
      <TextField
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        placeholder="Ex: Reduzir o tempo de contratação para 15 dias"
        value={dados.objetivo}
        onChange={(e) => setCampo("objetivo", e.target.value)}
      />
      <Box sx={S.FieldsGrid}>
        <Box>
          <Typography sx={S.Label}>Gatilho de início</Typography>
          <TextField fullWidth size="small" placeholder="Ex: Abertura de vaga" value={dados.gatilho} onChange={(e) => setCampo("gatilho", e.target.value)} />
        </Box>
        <Box>
          <Typography sx={S.Label}>Sistemas envolvidos</Typography>
          <TextField fullWidth size="small" placeholder="Ex: SAP, LinkedIn, DocuSign" value={dados.sistemas} onChange={(e) => setCampo("sistemas", e.target.value)} />
        </Box>
      </Box>
      <Typography sx={S.Label}>Nível de detalhe</Typography>
      <RadioGroup row value={dados.nivelDetalhe} onChange={(e) => setCampo("nivelDetalhe", e.target.value as NovoProcessoDados["nivelDetalhe"])}>
        {NIVEIS.map((n) => (
          <FormControlLabel key={n.value} value={n.value} control={<Radio size="small" />} label={n.label} sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }} />
        ))}
      </RadioGroup>
    </>
  );
}
