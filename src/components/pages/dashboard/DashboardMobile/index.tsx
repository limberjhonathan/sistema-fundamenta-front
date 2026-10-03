import Link from "next/link";
import { Box, Button, Card, Chip, LinearProgress, Typography } from "@mui/material";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import IconBox from "@/components/ui/IconBox";
import StatusChip from "@/components/shared/StatusChip";
import AreaChart from "@/components/shared/AreaChart";
import { useUser } from "@/context/user/AppProvider";
import { PROCESSO_STATUS } from "@/status";
import { mockAtividadeSemanal, mockProcessosRecentes } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "./style";

const KPIS = [
  { titulo: "Processos Ativos", valor: "42", variacao: "+12%", icon: <AccountTreeOutlined />, color: COLORS.primary[600] },
  { titulo: "Aprovações Pendentes", valor: "08", variacao: "-2", icon: <FactCheckOutlined />, color: COLORS.accent.orange },
  { titulo: "Tempo Médio", valor: "4.2d", variacao: "-15%", icon: <ScheduleRounded />, color: COLORS.accent.green },
];

export default function DashboardMobile() {
  const { user } = useUser();

  return (
    <CustomContainer>
      <Typography variant="h2">Olá, {user.primeiroNome}</Typography>
      <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>Aqui está o resumo dos processos hoje.</Typography>

      <Box sx={S.Kpis}>
        {KPIS.map((k) => (
          <Card key={k.titulo} sx={S.KpiCard}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <IconBox size={26} color={k.color}>
                {k.icon}
              </IconBox>
              <Chip size="small" label={k.variacao} sx={S.VariacaoChip} />
            </Box>
            <Typography sx={{ fontSize: "0.625rem", textTransform: "uppercase", color: COLORS.gray[600] }} noWrap>
              {k.titulo}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "1.125rem" }}>{k.valor}</Typography>
          </Card>
        ))}
      </Box>

      <Box sx={S.Banner}>
        <Chip
          size="small"
          label="IA Ativa"
          sx={{ position: "absolute", top: 12, right: 12, bgcolor: COLORS.accent.green, color: COLORS.white, height: 18, fontSize: "0.625rem" }}
        />
        <AutoAwesomeRounded sx={{ position: "absolute", right: 16, top: 34, fontSize: 56, opacity: 0.15 }} />
        <IconBox size={32} color={COLORS.white} bg="rgba(255,255,255,0.15)" sx={{ mb: 1.5 }}>
          <ChatOutlined />
        </IconBox>
        <Typography variant="h5" sx={{ color: COLORS.white }}>
          Assistente Fundamenta
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", opacity: 0.85, mb: 2 }}>Como posso ajudar na sua gestão de processos hoje?</Typography>
        <Button
          fullWidth
          component={Link}
          href="/assistente"
          sx={{ bgcolor: COLORS.white, color: COLORS.primary[600], "&:hover": { bgcolor: COLORS.gray[100] } }}
        >
          Nova Conversa
        </Button>
      </Box>

      <Typography sx={S.SectionTitle}>Atividade Semanal</Typography>
      <Card sx={{ ...S.ListCard, p: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <TrendingUpRounded sx={{ fontSize: 16, color: COLORS.primary[600] }} />
          <Typography sx={{ fontSize: "0.75rem" }}>Desempenho da Equipe</Typography>
        </Box>
        <AreaChart labels={mockAtividadeSemanal.dias} valores={mockAtividadeSemanal.valores} height={180} />
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={S.SectionTitle}>Processos Recentes</Typography>
        <Button size="small" component={Link} href="/processos" sx={{ mt: -1.5 }}>
          Ver Todos
        </Button>
      </Box>
      <Card sx={S.ListCard}>
        {mockProcessosRecentes.map((p) => (
          <Box key={p.titulo} sx={S.ListItem}>
            <IconBox size={32} color={COLORS.gray[600]}>
              <AccountTreeOutlined />
            </IconBox>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{p.titulo}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.25 }}>
                <StatusChip status={PROCESSO_STATUS[p.status]} />
                <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{p.quando}</Typography>
              </Box>
            </Box>
            <ChevronRightRounded sx={{ color: COLORS.gray[500] }} />
          </Box>
        ))}
      </Card>

      <Typography sx={S.SectionTitle}>Tarefas Pendentes</Typography>
      <Card sx={S.ListCard}>
        <Box sx={{ ...S.ListItem, alignItems: "flex-start" }}>
          <ErrorOutlineRounded sx={{ fontSize: 20, color: COLORS.accent.orange }} />
          <Box>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Aprovar SIPOC: Logística Reversa</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}>Enviado por Ricardo Silva há 45 min</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" variant="contained">
                Aprovar
              </Button>
              <Button size="small" variant="outlined">
                Detalhes
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ ...S.ListItem, alignItems: "flex-start" }}>
          <CheckCircleOutlineRounded sx={{ fontSize: 20, color: COLORS.accent.green }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Revisar Matriz RACI: Compras</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}>Gerado via IA Assistente</Typography>
            <Button fullWidth size="small" variant="outlined">
              Abrir Documento
            </Button>
          </Box>
        </Box>
      </Card>

      <Box sx={S.Cota}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <AutoAwesomeRounded sx={{ fontSize: 14, color: COLORS.primary[600] }} />
            <Typography variant="overline">Cota de IA Mensal</Typography>
          </Box>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>72%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={72} />
        <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary", textAlign: "center", mt: 1 }}>
          Você utilizou 7.200 de 10.000 tokens disponíveis este mês.
        </Typography>
      </Box>
    </CustomContainer>
  );
}
