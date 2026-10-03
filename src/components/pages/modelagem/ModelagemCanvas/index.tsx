"use client";

import { useRef } from "react";
import { Box, CircularProgress, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import FitScreenRounded from "@mui/icons-material/FitScreenRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import { useBpmnModeler } from "../core/hooks/useBpmnModeler";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../core/store/useModelagemStore";
import * as S from "../style";

export default function ModelagemCanvas({ visivel }: { visivel: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useBpmnModeler(containerRef);

  const zoomAtual = useModelagemStore((s) => s.zoom);
  const { pronto, zoom, ajustarTela } = useModelagemAcoes();

  return (
    // Fica montado (só oculto) nas outras abas para não perder o diagrama
    <Box sx={{ ...S.Canvas, display: visivel ? "block" : "none" }}>
      <Box ref={containerRef} sx={S.BpmnContainer} />

      {!pronto && (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <CircularProgress size={28} />
        </Box>
      )}

      <Box sx={S.Zoom}>
        <Tooltip title="Aproximar">
          <IconButton size="small" onClick={() => zoom(0.1)}>
            <AddRounded fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontSize: "0.75rem", width: 40, textAlign: "center" }}>{zoomAtual}%</Typography>
        <Tooltip title="Afastar">
          <IconButton size="small" onClick={() => zoom(-0.1)}>
            <RemoveRounded fontSize="small" />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Enquadrar diagrama">
          <IconButton size="small" onClick={ajustarTela}>
            <FitScreenRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={S.SugestaoFlutuante}>
        <IconBox rounded size={30} bg={COLORS.primary[50]}>
          <AutoAwesomeOutlined />
        </IconBox>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Fundamenta AI</Typography>
          <Typography noWrap sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>
            Sugestão: Adicionar um Gateway de decisão após a análise
          </Typography>
        </Box>
        <ChevronRightRounded fontSize="small" />
      </Box>
    </Box>
  );
}
