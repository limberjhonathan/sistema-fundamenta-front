import Link from "next/link";
import { Box, Card, LinearProgress, Typography } from "@mui/material";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import IconBox from "@/components/ui/IconBox";
import { mockCreditosIa } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ATALHOS = [
  {
    titulo: "Assistente de IA",
    descricao: "Tire dúvidas sobre processos ou peça ajuda para redigir documentações.",
    href: "/assistente",
    icon: <ChatOutlined />,
    destaque: true,
  },
  {
    titulo: "Portal de Conhecimento",
    descricao: "Explore a base de processos, normas e manuais da organização.",
    href: "/portal",
    icon: <MenuBookOutlined />,
    destaque: false,
  },
];

export default function AtalhosFuncionario() {
  const { usados, total, renovacaoDias } = mockCreditosIa;

  return (
    <Box sx={S.TopGrid}>
      {ATALHOS.map((a) => (
        <Card key={a.href} component={Link} href={a.href} sx={S.AtalhoCard(a.destaque)}>
          <NorthEastRounded sx={{ position: "absolute", top: 20, right: 20, fontSize: 16, color: COLORS.gray[500] }} />
          <IconBox
            size={36}
            color={a.destaque ? COLORS.white : COLORS.gray[700]}
            bg={a.destaque ? COLORS.primary[600] : COLORS.gray[200]}
            sx={{ mb: 3 }}
          >
            {a.icon}
          </IconBox>
          <Typography variant="h4">{a.titulo}</Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[600], mt: 0.5 }}>{a.descricao}</Typography>
        </Card>
      ))}

      <Card sx={{ p: 2.5, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.primary[600], mb: 0.5 }}>
          <BoltRounded sx={{ fontSize: 16 }} />
          <Typography variant="overline">Uso de IA</Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Consumo Mensal
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Créditos utilizados</Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
            {usados} / {total}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={(usados / total) * 100} />
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mt: 1.5 }}>
          Você ainda tem {total - usados} créditos para este mês. Renovação em {renovacaoDias} dias.
        </Typography>
      </Card>
    </Box>
  );
}
