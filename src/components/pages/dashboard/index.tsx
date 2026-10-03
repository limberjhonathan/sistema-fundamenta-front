"use client";

import { AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";
import PageSlideWrapper from "@/components/shared/PageSlideWrapper";
import { useUser } from "@/context/user/AppProvider";
import { UserRole } from "@/enums";
import DashboardGestor from "./DashboardGestor";
import DashboardFuncionario from "./DashboardFuncionario";
import DashboardMobile from "./DashboardMobile";

/** Escolhe a view do dashboard pelo perfil do usuário e pelo tamanho da tela. */
export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useUser();

  const view = isMobile ? "mobile" : user.role;

  return (
    <AnimatePresence mode="wait">
      <PageSlideWrapper key={view} viewKey={view}>
        {view === "mobile" && <DashboardMobile />}
        {view === UserRole.Gestor && <DashboardGestor />}
        {view === UserRole.Funcionario && <DashboardFuncionario />}
      </PageSlideWrapper>
    </AnimatePresence>
  );
}
