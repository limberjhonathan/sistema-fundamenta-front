"use client";

import { useState } from "react";
import { Box, Button, Chip, LinearProgress, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CenterFocusStrongOutlined from "@mui/icons-material/CenterFocusStrongOutlined";
import { mockSugestoesIa, type SugestaoIa } from "@/mocks/modelagem";
import { BRAND, COLORS } from "@/styles/colors";
import { useModelagemAcoes } from "../../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../../core/store/useModelagemStore";
import * as S from "../../style";

const COR_CATEGORIA: Record<SugestaoIa["categoria"], { bg: string; color: string }> = {
  Automação: { bg: COLORS.primary[50], color: COLORS.primary[700] },
  Conformidade: { bg: COLORS.accent.orangeLight, color: COLORS.accent.orangeDark },
  "Melhoria de fluxo": { bg: "#F1FBE3", color: COLORS.gray[900] },
};

/** Sugestões da IA sobre o diagrama (mock): focar o elemento, aceitar ou dispensar. */
export default function SugestoesIa({ onAviso }: { onAviso: (m: string) => void }) {
  const { focar } = useModelagemAcoes();
  const setAba = useModelagemStore((st) => st.setAba);

  const localizar = (id: string) => {
    setAba("diagrama");
    // Espera o canvas voltar a ficar visível antes de rolar até o elemento
    setTimeout(() => focar(id), 250);
  };
  const [dispensadas, setDispensadas] = useState<string[]>([]);
  const lista = mockSugestoesIa.filter((s) => !dispensadas.includes(s.id));

  const resolver = (s: SugestaoIa, aceita: boolean) => {
    setDispensadas((d) => [...d, s.id]);
    onAviso(aceita ? `Sugestão “${s.titulo}” adicionada às tarefas do processo.` : "Sugestão dispensada.");
  };

  return (
    <>
      <Box sx={{ ...S.PainelSecao, bgcolor: BRAND.dark, color: COLORS.white, borderColor: BRAND.dark }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
          <AutoAwesomeRounded sx={{ fontSize: 18, color: BRAND.lime }} />
          <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600 }}>Análise da Fundamenta IA</Typography>
        </Box>
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
          Revisamos o fluxo procurando gargalos, riscos de conformidade e etapas automatizáveis.
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<AutoAwesomeRounded />}
          sx={{ mt: 1.5 }}
          onClick={() => {
            setDispensadas([]);
            onAviso("Análise atualizada.");
          }}
        >
          Analisar novamente
        </Button>
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {lista.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckRounded sx={{ color: COLORS.accent.green, fontSize: 32 }} />
            <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>Tudo revisado por aqui.</Typography>
          </Box>
        )}
        {lista.map((s) => (
          <Box key={s.id} sx={S.SugestaoCard}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip size="small" label={s.categoria} sx={{ height: 20, fontSize: "0.6875rem", fontWeight: 700, ...COR_CATEGORIA[s.categoria] }} />
              <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary", ml: "auto" }}>{s.confianca}% de confiança</Typography>
            </Box>
            <LinearProgress variant="determinate" value={s.confianca} sx={{ height: 3 }} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{s.titulo}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], lineHeight: 1.55 }}>{s.texto}</Typography>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: COLORS.primary[700] }}>Impacto: {s.impacto}</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
              {s.elementoId && (
                <Button size="small" startIcon={<CenterFocusStrongOutlined />} onClick={() => localizar(s.elementoId!)} sx={{ px: 1, whiteSpace: "nowrap" }}>
                  Localizar
                </Button>
              )}
              <Box sx={{ flex: 1 }} />
              <Button size="small" sx={{ color: COLORS.gray[600] }} onClick={() => resolver(s, false)}>
                Dispensar
              </Button>
              <Button size="small" variant="contained" onClick={() => resolver(s, true)}>
                Aceitar
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
