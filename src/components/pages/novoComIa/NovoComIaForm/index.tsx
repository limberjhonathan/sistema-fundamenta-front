"use client";

import { Box, Button, Card, Chip, Divider, Step, StepIconProps, StepLabel, Stepper, Typography } from "@mui/material";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import BoltRounded from "@mui/icons-material/BoltRounded";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import TuneRounded from "@mui/icons-material/TuneRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import IconBox from "@/components/ui/IconBox";
import { NovoComIaEtapa, NovoComIaView, useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { COLORS } from "@/styles/colors";
import EtapaBasico from "./EtapaBasico";
import EtapaEstrategia from "./EtapaEstrategia";
import EtapaRevisao from "./EtapaRevisao";
import NovoComIaAside from "./NovoComIaAside";
import * as S from "../style";

const ETAPAS = [
  { label: "Básico", icon: <DescriptionOutlined />, titulo: "1. Identidade do Processo", subtitulo: "Defina o nome e o escopo inicial da atividade." },
  { label: "Estratégia", icon: <TuneRounded />, titulo: "2. Estratégia e Contexto", subtitulo: "Explique objetivo, gatilhos e sistemas envolvidos." },
  { label: "Revisão", icon: <CheckCircleOutlineRounded />, titulo: "3. Revisão", subtitulo: "Confira os dados antes de a IA gerar o fluxo BPMN." },
];

function StepIcon({ active, completed, icon }: StepIconProps) {
  const ligado = active || completed;
  return (
    <IconBox
      rounded
      size={32}
      color={ligado ? COLORS.white : COLORS.gray[600]}
      bg={ligado ? COLORS.primary[600] : COLORS.gray[100]}
      sx={{ border: ligado ? "none" : `1px solid ${COLORS.gray[200]}` }}
    >
      {ETAPAS[Number(icon) - 1].icon}
    </IconBox>
  );
}

export default function NovoComIaForm() {
  const { etapa, setEtapa, setView, dados } = useNovoComIaStore();
  const atual = ETAPAS[etapa];
  const ultima = etapa === NovoComIaEtapa.Revisao;
  const podeAvancar = etapa !== NovoComIaEtapa.Basico || (dados.nome.trim() && dados.descricao.trim());

  const avancar = () => (ultima ? setView(NovoComIaView.Gerando) : setEtapa(etapa + 1));

  return (
    <CustomContainer sx={{ maxWidth: 1080 }}>
      <PageTitle
        eyebrow={{ label: "Criação Assistida", icon: <AutoAwesomeOutlined /> }}
        titulo="Novo Processo com Inteligência Artificial"
        subtitulo="Utilize nossa IA treinada em BPMN 2.0 e metodologias Lean para estruturar seus fluxos de trabalho corporativos em minutos."
        actions={
          <Chip
            icon={<BoltRounded />}
            label="IA Ativa"
            variant="outlined"
            sx={{ color: COLORS.primary[600], borderColor: COLORS.primary[100], bgcolor: COLORS.primary[50], borderRadius: 999, "& .MuiChip-icon": { color: "inherit" } }}
          />
        }
      />

      <Stepper alternativeLabel activeStep={etapa} sx={S.Stepper}>
        {ETAPAS.map((e) => (
          <Step key={e.label}>
            <StepLabel slots={{ stepIcon: StepIcon }}>{e.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={S.Columns}>
        <Box>
          <Card sx={S.FormCard}>
            <Box sx={S.FormCardHeader}>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {atual.titulo}
              </Typography>
              <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>{atual.subtitulo}</Typography>
            </Box>
            <Box sx={{ p: 2.5 }}>
              {etapa === NovoComIaEtapa.Basico && <EtapaBasico />}
              {etapa === NovoComIaEtapa.Estrategia && <EtapaEstrategia />}
              {etapa === NovoComIaEtapa.Revisao && <EtapaRevisao />}
            </Box>
          </Card>

          <Divider sx={{ my: 2.5 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" startIcon={<ArrowBackRounded />} disabled={etapa === NovoComIaEtapa.Basico} onClick={() => setEtapa(etapa - 1)}>
              Voltar
            </Button>
            <Button variant="contained" endIcon={ultima ? <AutoAwesomeOutlined /> : <ArrowForwardRounded />} disabled={!podeAvancar} onClick={avancar} sx={{ px: 4 }}>
              {ultima ? "Gerar Processo" : "Próximo"}
            </Button>
          </Box>
        </Box>

        <NovoComIaAside />
      </Box>
    </CustomContainer>
  );
}
