import { Box, Card } from "@mui/material";
import CustomContainer from "@/components/shared/CustomContainer";
import ProcessosHeader from "./ProcessosHeader";
import ProcessosResumo from "./ProcessosResumo";
import ProcessosFiltersSection from "./ProcessosFiltersSection";
import ProcessosTableContent from "./ProcessosTableContent";
import ProcessosPaginator from "./ProcessosPaginator";
import DicaIa from "./DicaIa";
import * as S from "./style";

export default function ProcessosDashboard() {
  return (
    <CustomContainer>
      <ProcessosHeader />
      <ProcessosResumo />
      <ProcessosFiltersSection />
      <Card sx={S.TableCard}>
        <ProcessosTableContent />
        <ProcessosPaginator />
      </Card>
      <DicaIa />
      <Box sx={S.Footer}>
        © 2024 Fundamenta - Sistema de Gestão de Processos e Inteligência Organizacional. Todos os direitos reservados.
      </Box>
    </CustomContainer>
  );
}
