import Link from "next/link";
import { Box, Button } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import { useUser } from "@/context/user/AppProvider";
import AtalhosFuncionario from "./AtalhosFuncionario";
import MinhasAtividades from "./MinhasAtividades";
import AcessosRecentes from "./AcessosRecentes";
import ResumoFuncionario from "./ResumoFuncionario";
import * as S from "./style";

export default function DashboardFuncionario() {
  const { user } = useUser();

  return (
    <CustomContainer>
      <PageTitle
        titulo={`Olá, ${user.primeiroNome}!`}
        subtitulo="Bem-vindo ao seu painel de trabalho Fundamenta."
        actions={
          <>
            <Button variant="outlined" startIcon={<SearchRounded />} component={Link} href="/busca">
              Buscar Processo
            </Button>
            <Button variant="contained" startIcon={<AddRounded />} component={Link} href="/novo-com-ia">
              Novo Processo
            </Button>
          </>
        }
      />

      <AtalhosFuncionario />

      <Box sx={S.Columns}>
        <MinhasAtividades />
        <AcessosRecentes />
      </Box>

      <ResumoFuncionario />
    </CustomContainer>
  );
}
