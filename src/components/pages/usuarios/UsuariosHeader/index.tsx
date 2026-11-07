"use client";

import { Button } from "@mui/material";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import PersonAddAlt1Outlined from "@mui/icons-material/PersonAddAlt1Outlined";
import PageTitle from "@/components/shared/PageTitle";
import { useUsuariosStore } from "../core/store/useUsuariosStore";

export default function UsuariosHeader() {
  const abrirDialog = useUsuariosStore((s) => s.abrirDialog);

  return (
    <PageTitle
      eyebrow={{ label: "Administração", icon: <PeopleOutlined /> }}
      titulo="Usuários"
      subtitulo="Convide pessoas, defina o perfil de acesso de cada uma e acompanhe quem está usando o Fundamenta."
      actions={
        <>
          <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
            Exportar
          </Button>
          <Button variant="contained" startIcon={<PersonAddAlt1Outlined />} onClick={() => abrirDialog()}>
            Convidar usuário
          </Button>
        </>
      }
    />
  );
}
