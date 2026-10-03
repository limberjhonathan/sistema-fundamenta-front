import { Box, Card, Typography } from "@mui/material";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { COLORS } from "@/styles/colors";
import * as S from "../../style";

export default function NovoComIaAside() {
  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Box sx={S.ContextoCard}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <PsychologyOutlined />
          <Typography variant="h3" sx={{ color: COLORS.white, lineHeight: 1.1 }}>
            Analisando Contexto...
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", mb: 2.5 }}>
          Estou pronta para identificar papéis (RACI) e entradas/saídas (SIPOC) conforme você descreve o processo.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.7 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AutoAwesomeRounded sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: "0.6875rem" }}>IA Sugestão v3.2</Typography>
          </Box>
          <ChevronRightRounded sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      <Card sx={{ p: 2.5, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <InfoOutlined sx={{ fontSize: 18 }} />
          <Typography variant="h3">Dicas de Modelagem</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontSize: "0.875rem", mb: 0.5 }}>
          Seja Específico
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mb: 2 }}>
          Quanto mais detalhes você fornecer na descrição, melhor a IA conseguirá identificar gargalos e sugerir automações.
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "0.875rem", mb: 0.5 }}>
          Nível de Detalhe
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>
          Para processos complexos, tente focar no &quot;Happy Path&quot; (caminho feliz) e deixe que a IA sugira os fluxos alternativos.
        </Typography>
      </Card>

      <Box sx={S.ImagemPlaceholder} />
    </Box>
  );
}
