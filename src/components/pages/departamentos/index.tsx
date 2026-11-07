"use client";

import { Box, Button, ButtonBase, Typography } from "@mui/material";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import DepartamentosResumo from "./DepartamentosResumo";
import DepartamentosToolbar from "./DepartamentosToolbar";
import DepartamentoCard from "./DepartamentoCard";
import DepartamentoDetalhes from "./DepartamentoDetalhes";
import DepartamentoFormDialog from "./DepartamentoFormDialog";
import { useDepartamentos } from "./core/hooks/useDepartamentos";
import { useDepartamentosStore } from "./core/store/useDepartamentosStore";
import * as S from "./style";

export default function DepartamentosPage() {
  const { lista } = useDepartamentos();
  const abrirDialog = useDepartamentosStore((s) => s.abrirDialog);

  return (
    <CustomContainer>
      <PageTitle
        eyebrow={{ label: "Administração", icon: <ApartmentOutlined /> }}
        titulo="Departamentos"
        subtitulo="Estruture as áreas da organização, defina gestores e acompanhe quanto de cada área já está mapeado."
        actions={
          <>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
              Exportar organograma
            </Button>
            <Button variant="contained" startIcon={<AddRounded />} onClick={() => abrirDialog()}>
              Novo departamento
            </Button>
          </>
        }
      />

      <DepartamentosResumo />
      <DepartamentosToolbar />

      <Box sx={S.CardsGrid}>
        {lista.map((d) => (
          <DepartamentoCard key={d.id} departamento={d} />
        ))}
        <ButtonBase sx={S.NovoCard} onClick={() => abrirDialog()}>
          <AddRounded />
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>Adicionar departamento</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Crie uma nova área e defina o gestor</Typography>
        </ButtonBase>
      </Box>

      {lista.length === 0 && (
        <Typography sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
          Nenhum departamento encontrado para a busca atual.
        </Typography>
      )}

      <DepartamentoDetalhes />
      <DepartamentoFormDialog />
    </CustomContainer>
  );
}
