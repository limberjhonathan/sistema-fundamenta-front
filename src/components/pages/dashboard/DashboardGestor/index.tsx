import Link from "next/link";
import { Box, Button } from "@mui/material";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import GestorKpis from "./GestorKpis";
import EficienciaChart from "./EficienciaChart";
import DistribuicaoSetor from "./DistribuicaoSetor";
import TarefasGestao from "./TarefasGestao";
import AnaliseGargalos from "./AnaliseGargalos";
import ResumoGestor from "./ResumoGestor";
import * as S from "./style";

export default function DashboardGestor() {
  return (
    <CustomContainer>
      <PageTitle
        titulo="Dashboard do Gestor"
        subtitulo="Visão consolidada dos processos, KPIs e tarefas críticas da organização."
        actions={
          <>
            <Button variant="outlined" startIcon={<CalendarTodayOutlined sx={{ fontSize: "16px !important" }} />}>
              Outubro, 2023
            </Button>
            <Button variant="contained" startIcon={<AddRounded />} component={Link} href="/novo-com-ia">
              Novo Processo
            </Button>
          </>
        }
      />

      <GestorKpis />

      <Box sx={S.Row}>
        <EficienciaChart />
        <DistribuicaoSetor />
      </Box>

      <Box sx={{ ...S.Row, mb: 0 }}>
        <TarefasGestao />
        <AnaliseGargalos />
      </Box>

      <ResumoGestor />
    </CustomContainer>
  );
}
