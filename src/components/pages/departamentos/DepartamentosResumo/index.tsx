"use client";

import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import DonutLargeOutlined from "@mui/icons-material/DonutLargeOutlined";
import ResumoCards from "@/components/shared/ResumoCards";
import { COLORS } from "@/styles/colors";
import { useDepartamentos } from "../core/hooks/useDepartamentos";

export default function DepartamentosResumo() {
  const { resumo } = useDepartamentos();

  return (
    <ResumoCards
      itens={[
        {
          titulo: "Departamentos ativos",
          valor: resumo.ativos,
          icon: <ApartmentOutlined />,
          complemento: resumo.inativos ? `${resumo.inativos} inativo(s)` : "Nenhum inativo",
        },
        {
          titulo: "Colaboradores",
          valor: resumo.colaboradores,
          icon: <GroupsOutlined />,
          color: COLORS.gray[700],
          bg: COLORS.gray[100],
          complemento: "Somando todas as áreas",
        },
        {
          titulo: "Processos mapeados",
          valor: resumo.processos,
          icon: <AccountTreeOutlined />,
          color: COLORS.accent.greenDark,
          bg: COLORS.accent.greenLight,
          complemento: "Vinculados a departamentos",
        },
        {
          titulo: "Cobertura média",
          valor: `${resumo.coberturaMedia}%`,
          icon: <DonutLargeOutlined />,
          color: COLORS.accent.orangeDark,
          bg: COLORS.accent.orangeLight,
          complemento: "Atividades já documentadas",
        },
      ]}
    />
  );
}
