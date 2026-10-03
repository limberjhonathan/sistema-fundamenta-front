"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Chip, CircularProgress, Divider, LinearProgress, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import MemoryOutlined from "@mui/icons-material/MemoryOutlined";
import MonitorHeartOutlined from "@mui/icons-material/MonitorHeartOutlined";
import BoltRounded from "@mui/icons-material/BoltRounded";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import LanOutlined from "@mui/icons-material/LanOutlined";
import CustomContainer from "@/components/shared/CustomContainer";
import IconBox from "@/components/ui/IconBox";
import { useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const ETAPAS = [
  "Analisando requisitos do processo...",
  "Mapeando fluxos e dependências...",
  "Gerando documentação técnica...",
  "Otimizando eficiência operacional...",
  "Finalizando modelo BPMN...",
];

const RODAPE = [
  { icon: <MonitorHeartOutlined />, titulo: "Latência", valor: "Otimizado (~1.2s)" },
  { icon: <BoltRounded />, titulo: "Modelo", valor: "Fundamenta-v4 Pro" },
  { icon: <PsychologyOutlined />, titulo: "Conformidade", valor: "BPMN 2.0 Nativo" },
];

export default function IaGerando() {
  const router = useRouter();
  const reset = useNovoComIaStore((s) => s.reset);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setProgresso((p) => Math.min(100, p + 1)), 60);
    return () => clearInterval(timer);
  }, []);

  const concluido = progresso >= 100;
  const etapaAtual = Math.min(ETAPAS.length - 1, Math.floor(progresso / (100 / ETAPAS.length)));

  const abrirModelagem = () => {
    reset();
    router.push("/modelagem");
  };

  return (
    <CustomContainer sx={{ maxWidth: 820 }}>
      <Box sx={S.Gerando}>
        <Box sx={S.GerandoImagem}>
          <Chip
            size="small"
            icon={<AutoAwesomeRounded />}
            label="GERADO POR IA"
            sx={{ position: "absolute", top: 12, right: 12, bgcolor: COLORS.primary[600], color: COLORS.white, fontSize: "0.625rem", "& .MuiChip-icon": { color: "inherit", fontSize: 12 } }}
          />
          <LanOutlined sx={{ fontSize: 96, color: COLORS.gray[400] }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, color: COLORS.primary[600], mb: 1 }}>
          {concluido ? <CheckCircleRounded sx={{ fontSize: 18 }} /> : <CircularProgress size={16} />}
          <Typography sx={{ fontWeight: 500 }}>{concluido ? "Processo gerado" : "Arquitetando Inteligência"}</Typography>
        </Box>
        <Typography variant="h1" sx={{ fontWeight: 500, mb: 1 }}>
          Fundamenta está criando seu processo
        </Typography>
        <Typography sx={{ color: COLORS.gray[600], maxWidth: 440, mx: "auto", mb: 4 }}>
          Utilizamos modelos avançados de BPM para estruturar fluxos de trabalho eficientes baseados na sua descrição.
        </Typography>

        <Card sx={S.ProgressCard}>
          <Typography variant="overline" sx={{ color: COLORS.gray[700], fontSize: "0.75rem" }}>
            Progresso da geração
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 1.5 }}>
            <Typography sx={{ fontSize: "1.375rem", fontWeight: 600, color: COLORS.primary[600] }}>{progresso}%</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.gray[600] }}>
              <MemoryOutlined sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: "0.75rem" }}>Processamento em Nuvem Ativo</Typography>
            </Box>
          </Box>
          <LinearProgress variant="determinate" value={progresso} sx={{ mb: 3 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
            {ETAPAS.map((e, i) => {
              const feita = i < etapaAtual || concluido;
              const ativa = i === etapaAtual && !concluido;
              return (
                <Box key={e} sx={S.EtapaItem(ativa)}>
                  {feita ? (
                    <CheckCircleRounded sx={{ fontSize: 22, color: COLORS.accent.green }} />
                  ) : ativa ? (
                    <CircularProgress size={18} />
                  ) : (
                    <Box sx={{ width: 22, height: 22, borderRadius: "50%", bgcolor: COLORS.gray[200] }} />
                  )}
                  {e}
                </Box>
              );
            })}
          </Box>

          {concluido && (
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={abrirModelagem}>
              Abrir na Modelagem
            </Button>
          )}
        </Card>

        <Divider sx={{ my: 4, maxWidth: 600, mx: "auto" }} />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", textAlign: "left" }}>
          {RODAPE.map((r) => (
            <Box key={r.titulo} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconBox size={28} color={COLORS.gray[600]} bg={COLORS.gray[200]}>
                {r.icon}
              </IconBox>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>{r.titulo}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{r.valor}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Typography sx={{ mt: 4, fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600] }}>
          &quot;A inteligência artificial ajuda a identificar gargalos operacionais antes mesmo da implementação.&quot;
        </Typography>
      </Box>
    </CustomContainer>
  );
}
