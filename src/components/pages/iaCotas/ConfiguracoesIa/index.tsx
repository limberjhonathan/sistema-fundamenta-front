"use client";

import { Box, Card, Switch, Typography } from "@mui/material";
import { useIaCotasStore } from "../core/store/useIaCotasStore";
import * as S from "../style";

export default function ConfiguracoesIa() {
  const { configuracoes, alternarConfiguracao } = useIaCotasStore();

  return (
    <Card sx={S.Card}>
      <Typography variant="h3" sx={S.CardTitle}>
        Regras de uso da IA
      </Typography>
      <Typography sx={{ ...S.CardSubtitle, mb: 1 }}>Valem para toda a organização e são aplicadas imediatamente.</Typography>

      <Box sx={S.ConfigGrid}>
        {configuracoes.map((c) => (
          <Box key={c.chave} sx={S.ConfigLinha}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{c.titulo}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{c.descricao}</Typography>
            </Box>
            <Switch checked={c.ativo} onChange={() => alternarConfiguracao(c.chave)} slotProps={{ input: { "aria-label": c.titulo } }} />
          </Box>
        ))}
      </Box>
    </Card>
  );
}
