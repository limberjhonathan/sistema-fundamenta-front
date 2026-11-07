"use client";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import GppGoodOutlined from "@mui/icons-material/GppGoodOutlined";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import { PERFIL_ACESSO } from "@/status";
import { BRAND } from "@/styles/colors";
import PerfisLista from "./PerfisLista";
import MatrizPermissoes from "./MatrizPermissoes";
import CompararPerfis from "./CompararPerfis";
import { usePermissoes } from "./core/hooks/usePermissoes";
import { PermissoesAba, usePermissoesStore } from "./core/store/usePermissoesStore";
import * as S from "./style";

export default function PermissoesPage() {
  const { alterados } = usePermissoes();
  const { aba, setAba, descartar, salvar } = usePermissoesStore();

  return (
    <CustomContainer>
      <PageTitle
        eyebrow={{ label: "Administração", icon: <GppGoodOutlined /> }}
        titulo="Permissões"
        subtitulo="Defina o que cada perfil pode ver e fazer em cada módulo do Fundamenta."
        actions={
          <Button variant="outlined" startIcon={<HistoryRounded />}>
            Log de alterações
          </Button>
        }
      />

      <Box sx={S.Layout}>
        <PerfisLista />

        <Box sx={{ minWidth: 0 }}>
          <Tabs value={aba} onChange={(_, v: PermissoesAba) => setAba(v)} sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tab value={PermissoesAba.Editar} label="Editar perfil" />
            <Tab value={PermissoesAba.Comparar} label="Comparar perfis" />
          </Tabs>
          {aba === PermissoesAba.Editar ? <MatrizPermissoes /> : <CompararPerfis />}
        </Box>
      </Box>

      {alterados.length > 0 && (
        <Box sx={S.SalvarBar}>
          <ReportProblemOutlined sx={{ color: BRAND.lime }} />
          <Typography sx={{ fontSize: "0.875rem", flex: 1, minWidth: 200 }}>
            Alterações não salvas em <b>{alterados.map((p) => PERFIL_ACESSO[p].label).join(", ")}</b>. Elas valem a partir
            do próximo login dos usuários.
          </Typography>
          <Button onClick={descartar} sx={{ color: "rgba(255,255,255,0.8)" }}>
            Descartar
          </Button>
          <Button variant="contained" color="secondary" onClick={salvar}>
            Salvar permissões
          </Button>
        </Box>
      )}
    </CustomContainer>
  );
}
