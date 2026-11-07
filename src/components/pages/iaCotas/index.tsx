"use client";

import { Box, Button } from "@mui/material";
import MemoryOutlined from "@mui/icons-material/MemoryOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import AddShoppingCartRounded from "@mui/icons-material/AddShoppingCartRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import PlanoResumo from "./PlanoResumo";
import ConsumoDiario from "./ConsumoDiario";
import ConsumoRecurso from "./ConsumoRecurso";
import CotasDepartamento from "./CotasDepartamento";
import TopConsumidores from "./TopConsumidores";
import ConfiguracoesIa from "./ConfiguracoesIa";
import CotaDialog from "./CotaDialog";
import * as S from "./style";

export default function IaCotasPage() {
  return (
    <CustomContainer>
      <PageTitle
        eyebrow={{ label: "Administração", icon: <MemoryOutlined /> }}
        titulo="IA e cotas"
        subtitulo="Acompanhe o consumo de créditos de IA, distribua cotas entre os departamentos e defina as regras de uso."
        actions={
          <>
            <Button variant="outlined" startIcon={<ReceiptLongOutlined />}>
              Faturas
            </Button>
            <Button variant="contained" startIcon={<AddShoppingCartRounded />}>
              Comprar créditos
            </Button>
          </>
        }
      />

      <PlanoResumo />

      <Box sx={S.Grid}>
        <ConsumoDiario />
        <ConsumoRecurso />
      </Box>

      <Box sx={S.Grid}>
        <CotasDepartamento />
        <TopConsumidores />
      </Box>

      <ConfiguracoesIa />
      <CotaDialog />
    </CustomContainer>
  );
}
