"use client";

import { useState } from "react";
import { Box, Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import AreaChart from "@/components/shared/AreaChart";
import { mockEficiencia } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

type Periodo = keyof typeof mockEficiencia;

export default function EficienciaChart() {
  const [periodo, setPeriodo] = useState<Periodo>("6M");
  const dados = mockEficiencia[periodo];

  return (
    <Card sx={S.Card}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={S.CardTitle}>
            Eficiência de Processos
          </Typography>
          <Typography sx={S.CardSubtitle}>Desempenho operacional vs. Metas estabelecidas</Typography>
        </Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={periodo}
          onChange={(_, v: Periodo | null) => v && setPeriodo(v)}
          sx={{
            bgcolor: COLORS.gray[100],
            p: 0.5,
            borderRadius: 2,
            "& .MuiToggleButton-root": { border: "none", px: 1.25, py: 0.25, fontSize: "0.75rem", borderRadius: "6px !important" },
            "& .Mui-selected": { bgcolor: `${COLORS.white} !important`, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" },
          }}
        >
          {(Object.keys(mockEficiencia) as Periodo[]).map((p) => (
            <ToggleButton key={p} value={p}>
              {p}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <AreaChart labels={dados.meses} valores={dados.valores} yMax={100} serieLabel="Eficiência Real" />

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: 0.5, bgcolor: COLORS.primary[600] }} />
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Eficiência Real</Typography>
      </Box>
    </Card>
  );
}
