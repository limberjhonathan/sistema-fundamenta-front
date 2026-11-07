"use client";

import { Button } from "@mui/material";
import FormatListBulletedOutlined from "@mui/icons-material/FormatListBulletedOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import MacroprocessosResumo from "./MacroprocessosResumo";
import CadeiaValor from "./CadeiaValor";
import MacroprocessosLista from "./MacroprocessosLista";
import MacroprocessoFormDialog from "./MacroprocessoFormDialog";
import { useMacroprocessosStore } from "./core/store/useMacroprocessosStore";

export default function MacroprocessosPage() {
  const abrirDialog = useMacroprocessosStore((s) => s.abrirDialog);

  return (
    <CustomContainer>
      <PageTitle
        eyebrow={{ label: "Administração", icon: <FormatListBulletedOutlined /> }}
        titulo="Macroprocessos"
        subtitulo="Organize os processos em grandes blocos da cadeia de valor e veja onde ainda há lacunas de mapeamento."
        actions={
          <>
            <Button variant="outlined" startIcon={<AutoAwesomeOutlined />}>
              Sugerir com IA
            </Button>
            <Button variant="contained" startIcon={<AddRounded />} onClick={() => abrirDialog()}>
              Novo macroprocesso
            </Button>
          </>
        }
      />

      <MacroprocessosResumo />
      <CadeiaValor />
      <MacroprocessosLista />
      <MacroprocessoFormDialog />
    </CustomContainer>
  );
}
