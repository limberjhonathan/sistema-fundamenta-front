import Link from "next/link";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import IconBox from "@/components/ui/IconBox";
import { mockTarefasGestao } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function TarefasGestao() {
  return (
    <Card sx={{ ...S.Card, height: "fit-content" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
        <Box>
          <Typography variant="h3" sx={S.CardTitle}>
            Minhas Tarefas de Gestão
          </Typography>
          <Typography sx={S.CardSubtitle}>Itens que requerem sua atenção imediata</Typography>
        </Box>
        <Button size="small" component={Link} href="/aprovacoes" sx={{ fontWeight: 600 }}>
          VER TODAS
        </Button>
      </Box>

      {mockTarefasGestao.map((t) => {
        const emAnalise = t.status === "Em Análise";
        return (
          <Box key={t.id} sx={S.TaskItem}>
            <IconBox
              rounded
              size={32}
              color={emAnalise ? COLORS.accent.orange : COLORS.accent.red}
              bg={emAnalise ? COLORS.accent.orangeLight : COLORS.accent.redLight}
            >
              <DescriptionOutlined />
            </IconBox>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{t.titulo}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                {t.departamento} • Vence: {t.vence}
              </Typography>
            </Box>
            <Chip size="small" label={t.status} sx={S.NeutralChip} />
          </Box>
        );
      })}
    </Card>
  );
}
