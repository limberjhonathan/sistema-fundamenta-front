import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function PortalCtaIa() {
  return (
    <Box sx={S.CtaIa}>
      <Box sx={{ maxWidth: 460 }}>
        <Typography variant="overline" sx={{ fontSize: "0.625rem" }}>
          Novo: Fundamenta AI
        </Typography>
        <Typography variant="h3" sx={{ color: COLORS.white, mt: 0.5, mb: 1 }}>
          Ainda não encontrou o que precisava?
        </Typography>
        <Typography sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", mb: 2.5, lineHeight: 1.6 }}>
          Nosso assistente de inteligência artificial pode analisar todos os documentos e responder suas dúvidas em
          segundos. Experimente a busca semântica guiada por IA.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" endIcon={<ArrowForwardRounded />} component={Link} href="/assistente" sx={{ bgcolor: COLORS.primary[600] }}>
            Falar com Assistente
          </Button>
          <Button sx={{ color: COLORS.white }}>Saiba mais</Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          placeItems: "center",
          width: 116,
          height: 116,
          borderRadius: 1,
          bgcolor: "rgba(255,255,255,0.9)",
          color: "#8B5CF6",
          mr: 4,
        }}
      >
        <PsychologyOutlined sx={{ fontSize: 72 }} />
      </Box>
    </Box>
  );
}
