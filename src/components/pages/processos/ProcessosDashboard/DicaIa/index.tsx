"use client";

import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function DicaIa() {
  const [visivel, setVisivel] = useState(true);
  if (!visivel) return null;

  return (
    <Box sx={S.Dica}>
      <IconBox rounded size={36} color={COLORS.white} bg={COLORS.primary[600]}>
        <AutoAwesomeRounded />
      </IconBox>
      <Box>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Dica da Fundamenta IA
        </Typography>
        <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[700], lineHeight: 1.7 }}>
          Identificamos que 3 processos do departamento de <b>Financeiro</b> estão sem atualização há mais de 180 dias.
          Isso pode indicar que eles estão desatualizados em relação às normas regulatórias atuais. Deseja que eu analise
          e sugira atualizações baseadas na legislação vigente?
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Button size="small" sx={{ px: 0, fontWeight: 700 }}>
            Analisar agora
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button size="small" sx={{ color: COLORS.gray[600], fontWeight: 500 }} onClick={() => setVisivel(false)}>
            Ignorar por enquanto
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
