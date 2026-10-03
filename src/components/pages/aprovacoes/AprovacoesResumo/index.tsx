import { Box, Card, Typography } from "@mui/material";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import SwapVertRounded from "@mui/icons-material/SwapVertRounded";
import IconBox from "@/components/ui/IconBox";
import { mockAprovacoesResumo } from "@/mocks/aprovacoes";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ITENS = [
  { titulo: "Pendentes", valor: mockAprovacoesResumo.pendentes, icon: <ScheduleRounded />, color: COLORS.accent.orange, bg: COLORS.accent.orangeLight },
  { titulo: "Urgentes", valor: mockAprovacoesResumo.urgentes, icon: <ErrorOutlineRounded />, color: COLORS.accent.red, bg: COLORS.accent.redLight },
  { titulo: "Aprovados (Hoje)", valor: mockAprovacoesResumo.aprovadosHoje, icon: <CheckCircleOutlineRounded />, color: COLORS.accent.green, bg: COLORS.accent.greenLight },
  { titulo: "Tempo Médio", valor: mockAprovacoesResumo.tempoMedio, icon: <SwapVertRounded />, color: COLORS.gray[600], bg: COLORS.gray[100] },
];

export default function AprovacoesResumo() {
  return (
    <Box sx={S.ResumoGrid}>
      {ITENS.map((i) => (
        <Card key={i.titulo} sx={S.ResumoCard}>
          <IconBox size={36} color={i.color} bg={i.bg}>
            {i.icon}
          </IconBox>
          <Box>
            <Typography variant="overline" sx={{ color: COLORS.gray[700] }}>
              {i.titulo}
            </Typography>
            <Typography sx={{ fontFamily: "var(--font-jakarta)", fontSize: "1.375rem", lineHeight: 1 }}>{i.valor}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
