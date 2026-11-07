"use client";

import { Avatar, Box, Card, LinearProgress, Typography } from "@mui/material";
import { mockTopConsumidores } from "@/mocks/iaCotas";
import { COLORS } from "@/styles/colors";
import { iniciais } from "@/utils/iniciais";
import { formatarNumero } from "../core/hooks/useIaCotas";
import * as S from "../style";

export default function TopConsumidores() {
  const maximo = mockTopConsumidores[0]?.creditos ?? 1;

  return (
    <Card sx={S.Card}>
      <Typography variant="h3" sx={S.CardTitle}>
        Maiores consumidores
      </Typography>
      <Typography sx={{ ...S.CardSubtitle, mb: 1 }}>Usuários com mais créditos no ciclo</Typography>

      {mockTopConsumidores.map((u, i) => (
        <Box key={u.nome} sx={S.ConsumidorLinha}>
          <Typography sx={S.Posicao(i === 0)}>{i + 1}</Typography>
          <Avatar sx={{ width: 32, height: 32, fontSize: "0.75rem", fontWeight: 700, bgcolor: COLORS.primary[50], color: COLORS.primary[700] }}>
            {iniciais(u.nome)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }} noWrap>
                {u.nome}
              </Typography>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700 }}>{formatarNumero(u.creditos)}</Typography>
            </Box>
            <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary", mb: 0.5 }}>{u.departamento}</Typography>
            <LinearProgress variant="determinate" value={(u.creditos / maximo) * 100} sx={{ height: 4 }} />
          </Box>
        </Box>
      ))}
    </Card>
  );
}
