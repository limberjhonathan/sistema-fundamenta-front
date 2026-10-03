import Link from "next/link";
import { Box, Button, Card, Chip, IconButton, Typography } from "@mui/material";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import { mockAcessosRecentes } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function AcessosRecentes() {
  return (
    <Box>
      <Box sx={S.SectionHeader}>
        <Typography sx={S.SectionTitle}>Acessos Recentes</Typography>
        <IconButton size="small" component={Link} href="/portal">
          <ChevronRightRounded />
        </IconButton>
      </Box>

      {mockAcessosRecentes.map((a) => (
        <Card key={a.titulo} sx={S.AcessoCard}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Chip size="small" label={a.categoria} sx={S.CategoriaChip} />
            <BookmarkBorderRounded sx={{ fontSize: 18, color: a.favorito ? COLORS.accent.orange : COLORS.gray[500] }} />
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>{a.titulo}</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mb: 1.5 }}>Atualizado em {a.atualizado}</Typography>
          <Button fullWidth size="small" variant="outlined">
            Visualizar
          </Button>
        </Card>
      ))}

      <Box sx={{ ...S.GuiaCard, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Box sx={{ p: 0.75, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.15)", display: "grid" }}>
            <MenuBookOutlined sx={{ fontSize: 18 }} />
          </Box>
          <Typography variant="h5" sx={{ color: COLORS.white }}>
            Guia Rápido
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.8125rem", mb: 2, lineHeight: 1.6 }}>
          Aprenda a modelar processos em menos de 5 minutos utilizando nosso assistente inteligente.
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          sx={{ color: COLORS.white, borderColor: "rgba(255,255,255,0.7)", bgcolor: "transparent", "&:hover": { bgcolor: "rgba(255,255,255,0.08)", borderColor: COLORS.white } }}
        >
          Começar Tutorial
        </Button>
      </Box>
    </Box>
  );
}
