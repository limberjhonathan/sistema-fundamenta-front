import Link from "next/link";
import { Button } from "@mui/material";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import PageTitle from "@/components/shared/PageTitle";
import { COLORS } from "@/styles/colors";

export default function ProcessosHeader() {
  return (
    <PageTitle
      titulo="Gerenciamento de Processos"
      subtitulo="Consulte, edite e acompanhe o ciclo de vida dos processos da Fundamenta."
      actions={
        <>
          <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
            Exportar
          </Button>
          <Button variant="contained" startIcon={<AddRounded />} component={Link} href="/modelagem">
            Novo Processo
          </Button>
          <Button
            variant="contained"
            startIcon={<AutoAwesomeOutlined />}
            component={Link}
            href="/novo-com-ia"
            sx={{ bgcolor: COLORS.primary[500], "&:hover": { bgcolor: COLORS.primary[600] } }}
          >
            Criar com IA
          </Button>
        </>
      }
    />
  );
}
