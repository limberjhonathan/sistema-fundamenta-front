"use client";

import { useState } from "react";
import { Box, Button, ButtonBase, Popover, Typography } from "@mui/material";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import KeyboardOutlined from "@mui/icons-material/KeyboardOutlined";
import { mockProcessoModelagem } from "@/mocks/modelagem";
import { COLORS } from "@/styles/colors";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../core/store/useModelagemStore";
import * as S from "../style";

/** Rodapé do editor: validação ao vivo, contagem de elementos, versão e atalhos. */
export default function ModelagemStatusBar() {
  const { problemas, contagem, setAtalhosAbertos, setAba } = useModelagemStore();
  const { focar } = useModelagemAcoes();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const erros = problemas.filter((p) => p.nivel === "erro").length;
  const avisos = problemas.length - erros;
  const resumo = erros ? `${erros} erro(s)` : avisos ? `${avisos} aviso(s)` : "Diagrama válido";

  return (
    <Box sx={S.StatusBar}>
      <Button
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={erros ? <ErrorOutlineRounded /> : avisos ? <ReportProblemOutlined /> : <CheckCircleOutlineRounded />}
        sx={S.ValidacaoBotao(erros, avisos)}
      >
        {resumo}
        {erros > 0 && avisos > 0 && ` · ${avisos} aviso(s)`}
      </Button>

      <Typography sx={{ fontSize: "inherit", display: { xs: "none", md: "block" } }}>
        {contagem.atividades} atividades · {contagem.gateways} decisões · {contagem.eventos} eventos · {contagem.fluxos} fluxos
      </Typography>

      <Typography sx={{ fontSize: "inherit", ml: "auto", display: { xs: "none", sm: "block" } }}>
        {mockProcessoModelagem.versao} (rascunho) · publicada: {mockProcessoModelagem.versaoPublicada}
      </Typography>

      <Button size="small" startIcon={<KeyboardOutlined />} onClick={() => setAtalhosAbertos(true)} sx={{ ml: { xs: "auto", sm: 0 } }}>
        Atalhos
      </Button>

      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { width: 380, maxHeight: 420, borderRadius: 3, mb: 1 } } }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.gray[200]}` }}>
          <Typography variant="h5">Validação do diagrama</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            Boas práticas BPMN verificadas a cada alteração. Clique para ir até o elemento.
          </Typography>
        </Box>
        {problemas.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <CheckCircleOutlineRounded sx={{ color: COLORS.accent.green, fontSize: 32 }} />
            <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>Nenhum problema encontrado.</Typography>
          </Box>
        ) : (
          <Box sx={{ p: 0.75 }}>
            {problemas.map((p, i) => (
              <ButtonBase
                key={i}
                sx={S.ProblemaItem}
                onClick={() => {
                  if (p.elementoId) {
                    setAba("diagrama");
                    focar(p.elementoId);
                  }
                  setAnchor(null);
                }}
              >
                {p.nivel === "erro" ? (
                  <ErrorOutlineRounded sx={{ fontSize: 18, color: COLORS.accent.red, mt: 0.125 }} />
                ) : (
                  <ReportProblemOutlined sx={{ fontSize: 18, color: COLORS.accent.orange, mt: 0.125 }} />
                )}
                <Typography sx={{ fontSize: "0.8125rem" }}>{p.mensagem}</Typography>
              </ButtonBase>
            ))}
          </Box>
        )}
      </Popover>
    </Box>
  );
}
