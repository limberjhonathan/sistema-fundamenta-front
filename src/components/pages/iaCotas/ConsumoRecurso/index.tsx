"use client";

import { Box, Card, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { mockConsumoRecurso } from "@/mocks/iaCotas";
import { RECURSO_IA } from "@/status";
import { formatarNumero } from "../core/hooks/useIaCotas";
import * as S from "../style";

export default function ConsumoRecurso() {
  const total = mockConsumoRecurso.reduce((acc, r) => acc + r.creditos, 0);

  return (
    <Card sx={S.Card}>
      <Typography variant="h3" sx={S.CardTitle}>
        Consumo por recurso
      </Typography>
      <Typography sx={S.CardSubtitle}>Onde os créditos estão sendo usados</Typography>

      <Box sx={{ position: "relative", display: "grid", placeItems: "center", my: 1 }}>
        <PieChart
          width={190}
          height={190}
          hideLegend
          colors={mockConsumoRecurso.map((r) => RECURSO_IA[r.recurso].cor)}
          series={[
            {
              data: mockConsumoRecurso.map((r, i) => ({ id: i, value: r.creditos, label: RECURSO_IA[r.recurso].label })),
              innerRadius: 62,
              outerRadius: 90,
              paddingAngle: 2,
              cornerRadius: 3,
            },
          ]}
        />
        <Box sx={{ position: "absolute", textAlign: "center", pointerEvents: "none" }}>
          <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.375rem", fontWeight: 600, lineHeight: 1 }}>
            {formatarNumero(total)}
          </Typography>
          <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>créditos</Typography>
        </Box>
      </Box>

      {mockConsumoRecurso.map((r) => (
        <Box key={r.recurso} sx={S.RecursoLinha}>
          <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: RECURSO_IA[r.recurso].cor }} />
          <Box>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>{RECURSO_IA[r.recurso].label}</Typography>
            <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{formatarNumero(r.requisicoes)} requisições</Typography>
          </Box>
          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700 }}>{Math.round((r.creditos / total) * 100)}%</Typography>
        </Box>
      ))}
    </Card>
  );
}
