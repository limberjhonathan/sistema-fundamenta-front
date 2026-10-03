import { Box, Card, Chip, Typography } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import StarBorderRounded from "@mui/icons-material/StarBorderRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import IconBox from "@/components/ui/IconBox";
import { mockDocumentacaoExterna, mockMaisVistos } from "@/mocks/portal";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function PortalLinks() {
  return (
    <Box sx={S.LinksGrid}>
      <Card sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
          <IconBox rounded size={32} color={COLORS.gray[600]}>
            <InfoOutlined />
          </IconBox>
          <Box>
            <Typography variant="h5">Documentação Externa</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
              Links úteis para portais governamentais e normas técnicas.
            </Typography>
          </Box>
        </Box>
        {mockDocumentacaoExterna.map((d) => (
          <Box key={d} sx={S.LinkItem}>
            {d}
            <OpenInNewRounded sx={{ fontSize: 15, color: COLORS.gray[500] }} />
          </Box>
        ))}
      </Card>

      <Card sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
          <IconBox rounded size={32} color={COLORS.gray[600]}>
            <StarBorderRounded />
          </IconBox>
          <Box>
            <Typography variant="h5">Processos Mais Vistos</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
              Os manuais mais consultados pela equipe nesta semana.
            </Typography>
          </Box>
        </Box>
        {mockMaisVistos.map((m) => (
          <Box key={m.titulo} sx={S.LinkItem}>
            {m.titulo}
            <Chip size="small" label={`${m.acessos} acessos`} variant="outlined" sx={{ height: 20, fontSize: "0.625rem", borderRadius: 999 }} />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
