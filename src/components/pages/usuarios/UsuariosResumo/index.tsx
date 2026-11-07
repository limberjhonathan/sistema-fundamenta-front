"use client";

import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import HowToRegOutlined from "@mui/icons-material/HowToRegOutlined";
import MarkEmailUnreadOutlined from "@mui/icons-material/MarkEmailUnreadOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import ResumoCards from "@/components/shared/ResumoCards";
import { COLORS } from "@/styles/colors";
import { useUsuarios } from "../core/hooks/useUsuarios";

export default function UsuariosResumo() {
  const { resumo } = useUsuarios();
  const disponiveis = resumo.licencasTotal - resumo.licencasUsadas;

  return (
    <ResumoCards
      itens={[
        { titulo: "Total de usuários", valor: resumo.total, icon: <PeopleOutlined />, complemento: "Cadastrados na organização" },
        {
          titulo: "Ativos",
          valor: resumo.ativos,
          icon: <HowToRegOutlined />,
          color: COLORS.accent.greenDark,
          bg: COLORS.accent.greenLight,
          complemento: `${Math.round((resumo.ativos / resumo.total) * 100)}% da base`,
        },
        {
          titulo: "Convites pendentes",
          valor: resumo.convidados,
          icon: <MarkEmailUnreadOutlined />,
          color: COLORS.accent.orangeDark,
          bg: COLORS.accent.orangeLight,
          complemento: "Aguardando primeiro acesso",
        },
        {
          titulo: "Licenças disponíveis",
          valor: disponiveis,
          icon: <BadgeOutlined />,
          color: COLORS.gray[700],
          bg: COLORS.gray[100],
          complemento: `${resumo.licencasUsadas} de ${resumo.licencasTotal} em uso`,
        },
      ]}
    />
  );
}
