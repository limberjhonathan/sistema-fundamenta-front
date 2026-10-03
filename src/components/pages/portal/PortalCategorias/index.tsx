import { Box, Button, Card, Chip, Typography } from "@mui/material";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import StarBorderRounded from "@mui/icons-material/StarBorderRounded";
import IconBox from "@/components/ui/IconBox";
import { mockCategoriasPortal } from "@/mocks/portal";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ICONES = [<MenuBookOutlined key="rh" />, <TrendingUpRounded key="ops" />, <DescriptionOutlined key="fin" />];

export default function PortalCategorias() {
  return (
    <>
      {mockCategoriasPortal.map((cat, i) => (
        <Box key={cat.nome}>
          <Box sx={S.CategoriaHeader}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconBox size={32} color={COLORS.primary[600]}>
                {ICONES[i]}
              </IconBox>
              <Typography sx={{ fontFamily: "var(--font-jakarta)", fontSize: "1.0625rem", fontWeight: 500 }}>{cat.nome}</Typography>
            </Box>
            <Button size="small" endIcon={<ChevronRightRounded />} sx={{ fontWeight: 500 }}>
              Ver categoria completa
            </Button>
          </Box>

          <Box sx={S.ArtigosGrid}>
            {cat.artigos.map((a) => (
              <Card key={a.titulo} sx={S.ArtigoCard}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Chip size="small" label={a.categoria} sx={S.CategoriaTag} />
                  {a.novo && (
                    <Chip
                      size="small"
                      label="NOVO"
                      sx={{ height: 18, fontSize: "0.5625rem", bgcolor: COLORS.accent.green, color: COLORS.white, borderRadius: 999 }}
                    />
                  )}
                </Box>
                <Typography sx={{ fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.2, mb: 1 }}>
                  {a.titulo}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    color: COLORS.gray[600],
                    mb: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {a.descricao}
                </Typography>
                <Box sx={{ mt: "auto", pt: 1.25, borderTop: `1px solid ${COLORS.gray[200]}`, display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.gray[600] }}>
                    <ScheduleRounded sx={{ fontSize: 12 }} />
                    <Typography sx={{ fontSize: "0.6875rem" }}>{a.atualizado}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, color: COLORS.accent.orange }}>
                    <StarBorderRounded sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: "0.6875rem", fontWeight: 600 }}>{a.nota}</Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}
