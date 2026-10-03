import { Box, Card, Typography } from "@mui/material";
import { mockResumoFuncionario } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function ResumoFuncionario() {
  return (
    <Box sx={S.ResumoGrid}>
      {mockResumoFuncionario.map((r) => (
        <Card key={r.titulo} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="overline" sx={{ color: COLORS.gray[600] }}>
            {r.titulo}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "1.375rem",
                fontWeight: r.destaque ? 700 : 500,
                color: r.destaque ? COLORS.accent.green : "text.primary",
              }}
            >
              {r.valor}
            </Typography>
            {r.medalha && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: COLORS.accent.gold }} />}
          </Box>
        </Card>
      ))}
    </Box>
  );
}
