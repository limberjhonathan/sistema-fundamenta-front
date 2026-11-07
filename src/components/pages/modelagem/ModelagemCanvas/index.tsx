"use client";

import { useRef, useState } from "react";
import { Box, ButtonBase, CircularProgress, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import FitScreenRounded from "@mui/icons-material/FitScreenRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { mockSugestoesIa } from "@/mocks/modelagem";
import { BRAND } from "@/styles/colors";
import ModelagemPaleta from "../ModelagemPaleta";
import { useBpmnModeler } from "../core/hooks/useBpmnModeler";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../core/store/useModelagemStore";
import * as S from "../style";

const NOME_FERRAMENTA = {
  hand: "Mover tela",
  lasso: "Selecionar área",
  space: "Abrir/fechar espaço",
  "global-connect": "Conectar elementos",
};

export default function ModelagemCanvas({ visivel }: { visivel: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useBpmnModeler(containerRef);

  const { zoom: zoomAtual, ferramenta, setPainelAba } = useModelagemStore();
  const { pronto, zoom, zoomReal, ajustarTela, focar } = useModelagemAcoes();
  const [sugestaoVisivel, setSugestaoVisivel] = useState(true);
  const sugestao = mockSugestoesIa[0];

  const abrirSugestao = () => {
    if (sugestao.elementoId) focar(sugestao.elementoId);
    setPainelAba("ia");
  };

  return (
    // Fica montado (só oculto) nas outras abas para não perder o diagrama
    <Box sx={{ ...S.Canvas, display: visivel ? "block" : "none" }}>
      <Box ref={containerRef} sx={S.BpmnContainer} />

      {!pronto && (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <CircularProgress size={28} />
            <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>Carregando o editor...</Typography>
          </Box>
        </Box>
      )}

      <ModelagemPaleta />

      {ferramenta && (
        <Box sx={S.Ferramenta}>
          <b>{NOME_FERRAMENTA[ferramenta]}</b>
          <Box component="span" sx={{ opacity: 0.7 }}>
            Esc para sair
          </Box>
        </Box>
      )}

      {pronto && sugestaoVisivel && (
        <Box sx={S.SugestaoIa}>
          <Box sx={S.SugestaoIaIcone}>
            <AutoAwesomeRounded />
          </Box>
          <ButtonBase onClick={abrirSugestao} sx={{ minWidth: 0, flex: 1, justifyContent: "flex-start", textAlign: "left", gap: 1 }}>
            <Typography noWrap sx={{ fontSize: "0.8125rem" }}>
              <Box component="b" sx={{ color: BRAND.lime }}>
                {mockSugestoesIa.length} sugestões da IA
              </Box>{" "}
              · {sugestao.titulo}
            </Typography>
            <ArrowForwardRounded sx={{ fontSize: 16, flexShrink: 0 }} />
          </ButtonBase>
          <IconButton size="small" onClick={() => setSugestaoVisivel(false)} sx={{ color: "rgba(255,255,255,0.6)" }} aria-label="Dispensar">
            <CloseRounded sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {pronto && (
        <Box sx={S.Zoom}>
          <Tooltip title="Afastar">
            <IconButton size="small" onClick={() => zoom(-0.1)}>
              <RemoveRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Voltar para 100%">
            <ButtonBase sx={S.ZoomValor} onClick={zoomReal}>
              {zoomAtual}%
            </ButtonBase>
          </Tooltip>
          <Tooltip title="Aproximar">
            <IconButton size="small" onClick={() => zoom(0.1)}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          <Tooltip title="Enquadrar diagrama">
            <IconButton size="small" onClick={ajustarTela}>
              <FitScreenRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
