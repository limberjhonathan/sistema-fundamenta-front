"use client";

import { Box, Card, Divider, Tooltip, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { mockDistribuicaoSetor } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const CORES = [COLORS.primary[700], COLORS.accent.green, COLORS.accent.orange, COLORS.primary[500]];

export default function DistribuicaoSetor() {
  const total = mockDistribuicaoSetor.reduce((acc, s) => acc + s.value, 0);

  return (
    <Card sx={{ ...S.Card, display: "flex", flexDirection: "column" }}>
      <Typography variant="h3" sx={S.CardTitle}>
        Distribuição por Setor
      </Typography>
      <Typography sx={S.CardSubtitle}>Processos mapeados por departamento</Typography>

      <Box sx={{ flex: 1, display: "grid", placeItems: "center", py: 2 }}>
        <PieChart
          width={200}
          height={200}
          hideLegend
          colors={CORES}
          series={[{ data: mockDistribuicaoSetor, innerRadius: 62, outerRadius: 92, paddingAngle: 3, cornerRadius: 2 }]}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.25, mb: 2 }}>
        {mockDistribuicaoSetor.map((s, i) => (
          <Tooltip key={s.id} title={`${s.label}: ${s.value}`}>
            <Box sx={{ width: 8, height: 8, borderRadius: 0.5, bgcolor: CORES[i] }} />
          </Tooltip>
        ))}
      </Box>

      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5 }}>
        <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[600] }}>Total de Processos</Typography>
        <Typography sx={{ fontWeight: 700 }}>{total}</Typography>
      </Box>
    </Card>
  );
}
