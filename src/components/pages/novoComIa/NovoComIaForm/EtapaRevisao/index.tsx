"use client";

import { Box, Typography } from "@mui/material";
import { useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { COLORS } from "@/styles/colors";
import * as S from "../../style";

export default function EtapaRevisao() {
  const { dados } = useNovoComIaStore();

  const itens = [
    { label: "Nome do processo", valor: dados.nome },
    { label: "Departamento", valor: dados.departamento },
    { label: "Descrição", valor: dados.descricao },
    { label: "Objetivo", valor: dados.objetivo },
    { label: "Gatilho de início", valor: dados.gatilho },
    { label: "Sistemas", valor: dados.sistemas },
    { label: "Nível de detalhe", valor: dados.nivelDetalhe },
  ];

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {itens.map((i) => (
        <Box key={i.label}>
          <Typography sx={S.Label}>{i.label}</Typography>
          <Typography sx={{ fontSize: "0.875rem", color: i.valor ? COLORS.gray[900] : COLORS.gray[400], whiteSpace: "pre-line" }}>
            {i.valor || "Não informado"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
