import { Box, Card, Typography } from "@mui/material";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconBox from "@/components/ui/IconBox";
import { mockProcessosResumo } from "@/mocks/processos";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ITENS = [
  { titulo: "Total de Processos", valor: mockProcessosResumo.total, icon: <AccountTreeOutlined />, color: COLORS.gray[700] },
  { titulo: "Ativos/Publicados", valor: mockProcessosResumo.ativos, icon: <CheckCircleOutlineRounded />, color: COLORS.accent.green },
  { titulo: "Aguardando Aprovação", valor: mockProcessosResumo.aguardandoAprovacao, icon: <ScheduleRounded />, color: COLORS.accent.orange },
  { titulo: "Rascunhos em Edição", valor: mockProcessosResumo.rascunhos, icon: <EditOutlined />, color: COLORS.gray[600] },
];

export default function ProcessosResumo() {
  return (
    <Box sx={S.ResumoGrid}>
      {ITENS.map((i) => (
        <Card key={i.titulo} sx={S.ResumoCard}>
          <Box>
            <Typography variant="overline" sx={{ color: COLORS.gray[600] }}>
              {i.titulo}
            </Typography>
            <Typography sx={S.ResumoValor}>{i.valor}</Typography>
          </Box>
          <IconBox size={38} color={i.color}>
            {i.icon}
          </IconBox>
        </Card>
      ))}
    </Box>
  );
}
