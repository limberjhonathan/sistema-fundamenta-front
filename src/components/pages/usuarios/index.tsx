"use client";

import { Card } from "@mui/material";
import CustomContainer from "@/components/shared/CustomContainer";
import UsuariosHeader from "./UsuariosHeader";
import UsuariosResumo from "./UsuariosResumo";
import UsuariosFiltersSection from "./UsuariosFiltersSection";
import UsuariosTableContent from "./UsuariosTableContent";
import UsuariosPaginator from "./UsuariosPaginator";
import UsuariosLicencas from "./UsuariosLicencas";
import UsuarioFormDialog from "./UsuarioFormDialog";
import * as S from "./style";

export default function UsuariosPage() {
  return (
    <CustomContainer>
      <UsuariosHeader />
      <UsuariosResumo />
      <UsuariosFiltersSection />
      <Card sx={S.TableCard}>
        <UsuariosTableContent />
        <UsuariosPaginator />
      </Card>
      <UsuariosLicencas />
      <UsuarioFormDialog />
    </CustomContainer>
  );
}
