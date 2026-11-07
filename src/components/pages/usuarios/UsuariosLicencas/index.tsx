"use client";

import { Box, Button, Card, LinearProgress, Typography } from "@mui/material";
import WorkspacePremiumOutlined from "@mui/icons-material/WorkspacePremiumOutlined";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import { useUsuarios } from "../core/hooks/useUsuarios";
import * as S from "../style";

/** Rodapé com o uso das licenças do plano. */
export default function UsuariosLicencas() {
  const { resumo } = useUsuarios();
  const pct = Math.round((resumo.licencasUsadas / resumo.licencasTotal) * 100);

  return (
    <Card sx={S.LicencasCard}>
      <IconBox size={44} color={COLORS.white} bg={COLORS.primary[600]}>
        <WorkspacePremiumOutlined />
      </IconBox>
      <Box sx={{ flex: 1, minWidth: 220 }}>
        <Typography variant="h5">Licenças do plano</Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[600], mb: 1 }}>
          Usuários ativos e convites pendentes consomem licença. Usuários inativos liberam a vaga.
        </Typography>
        <LinearProgress variant="determinate" value={pct} color={pct >= 90 ? "warning" : "primary"} />
      </Box>
      <Box sx={{ textAlign: "right", minWidth: 110 }}>
        <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1 }}>
          {resumo.licencasUsadas}/{resumo.licencasTotal}
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{pct}% em uso</Typography>
      </Box>
      <Button variant="outlined">Ampliar plano</Button>
    </Card>
  );
}
