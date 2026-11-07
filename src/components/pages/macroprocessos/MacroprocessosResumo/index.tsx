"use client";

import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import ResumoCards from "@/components/shared/ResumoCards";
import { MATURIDADE_LABEL } from "@/mocks/macroprocessos";
import { COLORS } from "@/styles/colors";
import { useMacroprocessos } from "../core/hooks/useMacroprocessos";

export default function MacroprocessosResumo() {
  const { resumo } = useMacroprocessos();

  return (
    <ResumoCards
      itens={[
        { titulo: "Macroprocessos", valor: resumo.total, icon: <CategoryOutlined />, complemento: "Na cadeia de valor" },
        {
          titulo: "Processos vinculados",
          valor: resumo.vinculados,
          icon: <AccountTreeOutlined />,
          color: COLORS.accent.greenDark,
          bg: COLORS.accent.greenLight,
          complemento: "Organizados por macroprocesso",
        },
        {
          titulo: "Sem processos",
          valor: resumo.semProcessos,
          icon: <ReportProblemOutlined />,
          color: COLORS.accent.orangeDark,
          bg: COLORS.accent.orangeLight,
          complemento: "Lacunas a mapear",
        },
        {
          titulo: "Maturidade média",
          valor: resumo.maturidadeMedia.toFixed(1),
          icon: <TrendingUpRounded />,
          color: COLORS.gray[700],
          bg: COLORS.gray[100],
          complemento: `Nível ${MATURIDADE_LABEL[Math.round(resumo.maturidadeMedia)]}`,
        },
      ]}
    />
  );
}
