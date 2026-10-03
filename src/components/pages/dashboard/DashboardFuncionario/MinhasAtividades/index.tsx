import { Box, Button, Card, Chip, Typography } from "@mui/material";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import IconBox from "@/components/ui/IconBox";
import StatusChip from "@/components/shared/StatusChip";
import { Prioridade } from "@/enums";
import { PRIORIDADE } from "@/status";
import { mockAtividades } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import type { Atividade } from "@/types/processo";
import * as S from "../style";

function iconeAtividade(a: Atividade) {
  if (a.concluida) return { icon: <CheckCircleOutlineRounded />, color: COLORS.accent.green, bg: COLORS.accent.greenLight };
  if (a.prioridade === Prioridade.Alta) return { icon: <ErrorOutlineRounded />, color: COLORS.accent.red, bg: COLORS.accent.redLight };
  return { icon: <ScheduleRounded />, color: COLORS.accent.orange, bg: COLORS.accent.orangeLight };
}

export default function MinhasAtividades() {
  return (
    <Box>
      <Box sx={S.SectionHeader}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={S.SectionTitle}>Minhas Atividades</Typography>
          <Chip size="small" label={mockAtividades.length} sx={{ height: 18, bgcolor: COLORS.gray[200] }} />
        </Box>
        <Button size="small">Ver tudo</Button>
      </Box>

      {mockAtividades.map((a) => {
        const { icon, color, bg } = iconeAtividade(a);
        return (
          <Card key={a.id} sx={S.AtividadeItem}>
            <IconBox rounded size={30} color={color} bg={bg}>
              {icon}
            </IconBox>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 500 }}>{a.titulo}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.25 }}>
                <AccessTimeRounded sx={{ fontSize: 13, color: COLORS.gray[500] }} />
                <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Prazo: {a.prazo}</Typography>
                <StatusChip status={PRIORIDADE[a.prioridade]} />
              </Box>
            </Box>
            <Button size="small" sx={{ whiteSpace: "nowrap" }}>
              Ver Detalhes
            </Button>
          </Card>
        );
      })}
    </Box>
  );
}
