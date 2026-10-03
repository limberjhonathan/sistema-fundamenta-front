import { Box, Card, Chip, IconButton, LinearProgress, Typography } from "@mui/material";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { TipoConteudo } from "@/enums";
import { COLORS } from "@/styles/colors";
import type { ResultadoBusca } from "@/types/processo";
import * as S from "../style";

const TIPO = {
  [TipoConteudo.Processo]: { label: "PROCESSO", icon: <AccountTreeOutlined />, borda: COLORS.primary[700], escuro: true },
  [TipoConteudo.Documento]: { label: "DOCUMENTO", icon: <DescriptionOutlined />, borda: COLORS.accent.green, escuro: false },
  [TipoConteudo.Portal]: { label: "PORTAL", icon: <MenuBookOutlined />, borda: COLORS.gray[300], escuro: false },
  [TipoConteudo.IaInsights]: { label: "IA INSIGHT", icon: <AutoAwesomeRounded />, borda: COLORS.primary[500], escuro: true },
};

export default function ResultadoCard({ resultado: r }: { resultado: ResultadoBusca }) {
  const tipo = TIPO[r.tipo];

  return (
    <Card sx={S.ResultadoCard(tipo.borda)}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 0.75, mb: 0.75 }}>
          <Chip size="small" icon={tipo.icon} label={tipo.label} sx={S.TipoTag(tipo.escuro)} />
          {r.comIa && <Chip size="small" icon={<AutoAwesomeRounded />} label="IA" variant="outlined" sx={{ ...S.TipoTag(false), bgcolor: COLORS.primary[50] }} />}
        </Box>
        <Box sx={{ textAlign: "right", minWidth: 110 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "0.6875rem", color: COLORS.gray[600] }}>Relevância</Typography>
            <LinearProgress variant="determinate" value={r.relevancia} sx={{ flex: 1, height: 4, bgcolor: "transparent" }} />
          </Box>
          <Typography sx={{ fontSize: "0.625rem", color: COLORS.gray[500] }}>ID: {r.id}</Typography>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ fontSize: "1.125rem", mb: 0.75 }}>
        {r.titulo}
      </Typography>
      <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[600], lineHeight: 1.6, mb: 1.5 }}>{r.descricao}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Box sx={S.Meta}>
          <LayersOutlined />
          {r.departamento}
        </Box>
        <Box sx={S.Meta}>
          <ScheduleRounded />
          {r.atualizado}
        </Box>
        <Box sx={S.Meta}>
          <PersonOutlineRounded />
          {r.autor}
        </Box>
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.75 }}>
          {r.tags.map((t) => (
            <Chip key={t} size="small" label={t} sx={S.HashTag} />
          ))}
          <IconButton size="small">
            <ChevronRightRounded fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
