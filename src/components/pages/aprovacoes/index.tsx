"use client";

import { Box, Button, Typography } from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import NoteAddOutlined from "@mui/icons-material/NoteAddOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import AprovacoesResumo from "./AprovacoesResumo";
import AprovacoesTabs from "./AprovacoesTabs";
import AprovacaoCard from "./AprovacaoCard";
import { useAprovacoes } from "./core/hooks/useAprovacoes";
import * as S from "./style";

export default function AprovacoesPage() {
  const { lista, decisoes, decidir } = useAprovacoes();

  return (
    <CustomContainer>
      <PageTitle
        eyebrow={{ label: "Gestão de Workflow", icon: <FactCheckOutlined /> }}
        titulo="Fila de Aprovações"
        subtitulo="Revise e aprove as solicitações de alteração ou criação de processos organizacionais pendentes de validação."
        actions={
          <>
            <Button variant="outlined" startIcon={<HistoryRounded />}>
              Ver Histórico
            </Button>
            <Button variant="contained" startIcon={<NoteAddOutlined />}>
              Aprovação em Lote
            </Button>
          </>
        }
      />

      <AprovacoesResumo />
      <AprovacoesTabs />

      {lista.length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>Nenhuma solicitação nesta aba.</Typography>
        </Box>
      ) : (
        <Box sx={S.CardsGrid}>
          {lista.map((a) => (
            <AprovacaoCard key={a.id} aprovacao={a} decisao={decisoes[a.id]} onDecidir={(d) => decidir(a.id, d)} />
          ))}
        </Box>
      )}
    </CustomContainer>
  );
}
