import { Box, Card, Typography } from "@mui/material";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import IconBox from "@/components/ui/IconBox";
import { mockResumoGestor } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ICONES = {
  target: { icon: <TrackChangesRounded />, color: COLORS.accent.greenDark, bg: COLORS.accent.greenLight },
  bolt: { icon: <BoltRounded />, color: COLORS.primary[600], bg: COLORS.accent.cyanLight },
  history: { icon: <HistoryRounded />, color: COLORS.accent.orangeDark, bg: COLORS.accent.orangeLight },
};

export default function ResumoGestor() {
  return (
    <Box sx={S.ResumoGrid}>
      {mockResumoGestor.map((item, i) => {
        const { icon, color, bg } = ICONES[item.icone];
        return (
          <Card key={item.titulo} sx={{ ...S.Card, display: "flex", alignItems: "center", gap: 2 }}>
            <IconBox size={40} color={color} bg={bg}>
              {icon}
            </IconBox>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{item.titulo}</Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography sx={{ fontFamily: "var(--font-jakarta)", fontSize: "1.375rem", fontWeight: 700 }}>
                  {item.valor}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: i === 0 ? COLORS.accent.greenDark : "text.secondary" }}>
                  {item.complemento}
                </Typography>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
