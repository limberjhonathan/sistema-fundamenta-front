import { Box, Card, Typography } from "@mui/material";
import MonitorHeartOutlined from "@mui/icons-material/MonitorHeartOutlined";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import IconBox from "@/components/ui/IconBox";
import { mockKpisGestor } from "@/mocks/dashboard";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ICONES = {
  pulse: <MonitorHeartOutlined />,
  clock: <ScheduleRounded />,
  check: <CheckCircleOutlineRounded />,
  alert: <ErrorOutlineRounded />,
};

export default function GestorKpis() {
  return (
    <Box sx={S.KpiGrid}>
      {mockKpisGestor.map((kpi) => (
        <Card key={kpi.titulo} sx={S.Card}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Typography sx={S.KpiTitle}>{kpi.titulo}</Typography>
            <IconBox size={30} bg={COLORS.primary[50]}>
              {ICONES[kpi.icone]}
            </IconBox>
          </Box>
          <Typography sx={S.KpiValue}>{kpi.valor}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.75 }}>
            <Box sx={{ display: "flex", alignItems: "center", color: COLORS.accent.green, fontSize: "0.6875rem", fontWeight: 600 }}>
              <NorthEastRounded sx={{ fontSize: 12 }} />
              {kpi.variacao}
            </Box>
            <Typography sx={{ fontSize: "0.6875rem", color: COLORS.gray[600], lineHeight: 1.3 }}>{kpi.descricao}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
