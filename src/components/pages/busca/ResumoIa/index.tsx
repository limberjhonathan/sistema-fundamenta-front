import { Box, Button, Card, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import SwapVertRounded from "@mui/icons-material/SwapVertRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function ResumoIa({ termo }: { termo: string }) {
  return (
    <Card sx={S.ResumoIa}>
      <AutoAwesomeRounded sx={{ position: "absolute", right: 20, top: 16, fontSize: 64, color: COLORS.gray[100] }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <IconBox size={20} color={COLORS.white} bg={COLORS.primary[600]} sx={{ borderRadius: 1 }}>
          <AutoAwesomeRounded />
        </IconBox>
        <Typography variant="overline" sx={{ fontSize: "0.625rem", color: COLORS.primary[600] }}>
          Resumo por IA
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Visão Geral da Busca
      </Typography>
      <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[600], lineHeight: 1.7, position: "relative" }}>
        Sua busca por <b>&quot;{termo}&quot;</b> abrange principalmente documentos de <b>Governança Corporativa</b> e{" "}
        <b>Recursos Humanos</b>. Identificamos que o processo mais consultado por sua equipe nos últimos 30 dias
        relacionado a este tema é o{" "}
        <Box component="span" sx={{ color: COLORS.primary[600] }}>
          Protocolo de Integração Digital
        </Box>
        .
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
        <Button size="small" startIcon={<SwapVertRounded />} sx={{ fontSize: "0.75rem" }}>
          Comparar versões relacionadas
        </Button>
        <Button size="small" startIcon={<SearchRounded />} sx={{ fontSize: "0.75rem" }}>
          Buscar termos técnicos correlatos
        </Button>
      </Box>
    </Card>
  );
}
