import { Box, Card, Typography } from "@mui/material";
import ManageSearchRounded from "@mui/icons-material/ManageSearchRounded";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function AnaliseGargalos() {
  return (
    <Card sx={{ ...S.Card, display: "flex", flexDirection: "column", minHeight: 320 }}>
      <Typography variant="h3" sx={S.CardTitle}>
        Análise de Gargalos (IA)
      </Typography>
      <Typography sx={S.CardSubtitle}>Insights gerados pela Assistente Fundamenta</Typography>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 1.5, py: 3 }}>
        <IconBox size={88} bg={COLORS.primary[50]} sx={{ borderRadius: 3 }}>
          <ManageSearchRounded />
        </IconBox>
        <Typography variant="h4">Nenhum gargalo crítico</Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[600], maxWidth: 220 }}>
          A IA não identificou obstruções severas nos fluxos de trabalho ativos no momento.
        </Typography>
      </Box>
    </Card>
  );
}
