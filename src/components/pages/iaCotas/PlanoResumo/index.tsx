"use client";

import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import { BRAND } from "@/styles/colors";
import { formatarNumero, useIaCotas } from "../core/hooks/useIaCotas";
import * as S from "../style";

/** Banner do plano: créditos usados no ciclo, projeção e números-chave. */
export default function PlanoResumo() {
  const { plano } = useIaCotas();

  return (
    <Box sx={S.PlanoBanner}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Chip label={plano.nome} size="small" sx={{ bgcolor: BRAND.lime, color: BRAND.dark, fontWeight: 700 }} />
          <Typography sx={{ fontSize: "0.8125rem", opacity: 0.75 }}>
            Renova em {plano.renovacao} · faltam {plano.diasParaRenovar} dias
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.8125rem", opacity: 0.75, mb: 0.5 }}>Créditos usados neste ciclo</Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
          <Typography sx={S.PlanoValor}>{formatarNumero(plano.usados)}</Typography>
          <Typography sx={{ opacity: 0.6 }}>/ {formatarNumero(plano.creditosMes)}</Typography>
          <Typography sx={{ ml: "auto", fontFamily: "var(--font-space-grotesk)", fontSize: "1.25rem", color: BRAND.lime }}>
            {Math.round(plano.pct * 100)}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={plano.pct * 100} sx={S.PlanoBarra} />
        <Typography sx={{ fontSize: "0.8125rem", mt: 1.5, opacity: 0.85 }}>
          {plano.excede ? "⚠ " : ""}Projeção para o ciclo: <b>{formatarNumero(plano.projecao)} créditos</b>
          {plano.excede ? " — acima do plano. Considere ajustar as cotas ou comprar créditos." : " — dentro do plano."}
        </Typography>
      </Box>

      <Box sx={S.PlanoInfo}>
        {[
          { label: "Requisições no mês", valor: formatarNumero(plano.requisicoes) },
          { label: "Horas economizadas", valor: `${plano.horasEconomizadas}h` },
          { label: "Média diária", valor: formatarNumero(Math.round(plano.usados / (30 - plano.diasParaRenovar))) },
          {
            label: "Vs. mês anterior",
            valor: (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                <TrendingUpRounded sx={{ fontSize: 20, color: BRAND.lime }} />
                {plano.variacaoMes}
              </Box>
            ),
          },
        ].map((i) => (
          <Box key={i.label}>
            <Typography sx={{ fontSize: "0.6875rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {i.label}
            </Typography>
            <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.375rem", fontWeight: 600 }}>{i.valor}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
