"use client";

import { Box, Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import AreaChart from "@/components/shared/AreaChart";
import { formatarNumero, useIaCotas } from "../core/hooks/useIaCotas";
import { type PeriodoConsumo, useIaCotasStore } from "../core/store/useIaCotasStore";
import * as S from "../style";

export default function ConsumoDiario() {
  const { consumo } = useIaCotas();
  const { periodo, setPeriodo } = useIaCotasStore();
  const total = consumo.valores.reduce((a, b) => a + b, 0);
  const pico = Math.max(...consumo.valores);

  return (
    <Card sx={S.Card}>
      <Box sx={S.CardHeader}>
        <Box>
          <Typography variant="h3" sx={S.CardTitle}>
            Consumo diário de créditos
          </Typography>
          <Typography sx={S.CardSubtitle}>
            {formatarNumero(total)} créditos no período · pico de {formatarNumero(pico)} em um dia
          </Typography>
        </Box>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={periodo}
          onChange={(_, v: PeriodoConsumo | null) => v && setPeriodo(v)}
          sx={{ "& .MuiToggleButton-root": { px: 1.5, py: 0.25, fontSize: "0.75rem", textTransform: "none" } }}
        >
          <ToggleButton value="7d">7 dias</ToggleButton>
          <ToggleButton value="30d">30 dias</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <AreaChart labels={consumo.dias} valores={consumo.valores} serieLabel="Créditos" height={260} />
      <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 1 }}>
        Os vales semanais correspondem aos fins de semana. Dia do mês no eixo horizontal.
      </Typography>
    </Card>
  );
}
