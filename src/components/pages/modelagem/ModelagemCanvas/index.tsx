"use client";

import { useState } from "react";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import NearMeOutlined from "@mui/icons-material/NearMeOutlined";
import PanToolOutlined from "@mui/icons-material/PanToolOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import RadioButtonUncheckedRounded from "@mui/icons-material/RadioButtonUncheckedRounded";
import CropSquareRounded from "@mui/icons-material/CropSquareRounded";
import NorthEastRounded from "@mui/icons-material/NorthEastRounded";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import StorageOutlined from "@mui/icons-material/StorageOutlined";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import FitScreenRounded from "@mui/icons-material/FitScreenRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const FERRAMENTAS = [
  { label: "Selecionar", icon: <NearMeOutlined /> },
  { label: "Mover", icon: <PanToolOutlined /> },
  { label: "Sugestão IA", icon: <AutoAwesomeOutlined />, destaque: true },
  null,
  { label: "Evento", icon: <RadioButtonUncheckedRounded /> },
  { label: "Tarefa", icon: <CropSquareRounded /> },
  { label: "Fluxo", icon: <NorthEastRounded /> },
  { label: "Gateway", icon: <PlayArrowOutlined /> },
  { label: "Dados", icon: <StorageOutlined /> },
  { label: "Raia", icon: <PersonAddAltOutlined /> },
];

type ModelagemCanvasProps = { selecionada: boolean; onSelecionar: (v: boolean) => void };

export default function ModelagemCanvas({ selecionada, onSelecionar }: ModelagemCanvasProps) {
  const [zoom, setZoom] = useState(100);
  const [ferramenta, setFerramenta] = useState(0);

  return (
    <Box sx={S.Canvas} onClick={() => onSelecionar(false)}>
      <Box sx={S.Tools} onClick={(e) => e.stopPropagation()}>
        {FERRAMENTAS.map((f, i) =>
          f ? (
            <Tooltip key={f.label} title={f.label} placement="right">
              <IconButton
                size="small"
                onClick={() => setFerramenta(i)}
                sx={{
                  borderRadius: 1.5,
                  color: f.destaque ? COLORS.primary[500] : COLORS.gray[700],
                  bgcolor: ferramenta === i ? COLORS.gray[100] : "transparent",
                }}
              >
                {f.icon}
              </IconButton>
            </Tooltip>
          ) : (
            <Divider key={`div-${i}`} sx={{ my: 0.5 }} />
          ),
        )}
      </Box>

      {/* Diagrama estático de exemplo */}
      <Box sx={{ position: "absolute", inset: 0, transform: `scale(${zoom / 100})`, transformOrigin: "30% 35%", transition: "transform .2s" }}>
        <Box
          sx={{
            position: "absolute",
            top: 200,
            left: 90,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `2px solid ${COLORS.accent.green}`,
            bgcolor: COLORS.white,
            display: "grid",
            placeItems: "center",
          }}
        >
          <PlayArrowOutlined sx={{ fontSize: 14, color: COLORS.accent.green }} />
        </Box>
        <Box sx={{ position: "absolute", top: 213, left: 118, width: 102, height: 2, bgcolor: COLORS.gray[900] }} />
        <Box sx={{ position: "absolute", top: 213, left: 356, width: 120, height: 2, bgcolor: COLORS.gray[900] }} />

        <Box sx={{ position: "absolute", top: 110, left: 236, width: 2, height: 46, bgcolor: COLORS.gray[600] }} />
        <Box sx={{ position: "absolute", top: 110, left: 236, width: 30, height: 2, bgcolor: COLORS.gray[600] }} />
        <Typography sx={{ position: "absolute", top: 80, left: 246, width: 140, fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600] }}>
          Verificar validade do RG/CPF em até 48h
        </Typography>

        <Box
          sx={{ ...S.Tarefa(selecionada), top: 178, left: 220 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelecionar(true);
          }}
        >
          Analisar Documentação de Crédito
          <AutoAwesomeOutlined sx={{ position: "absolute", top: -10, right: -6, fontSize: 16, color: COLORS.primary[500] }} />
          <InfoOutlined sx={{ position: "absolute", bottom: 4, left: 4, fontSize: 12, color: COLORS.gray[500] }} />
        </Box>
      </Box>

      <Box sx={S.Zoom} onClick={(e) => e.stopPropagation()}>
        <IconButton size="small" onClick={() => setZoom((z) => Math.min(200, z + 10))}>
          <AddRounded fontSize="small" />
        </IconButton>
        <Typography sx={{ fontSize: "0.75rem", width: 40, textAlign: "center" }}>{zoom}%</Typography>
        <IconButton size="small" onClick={() => setZoom((z) => Math.max(50, z - 10))}>
          <RemoveRounded fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton size="small" onClick={() => setZoom(100)}>
          <FitScreenRounded fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={S.SugestaoFlutuante} onClick={(e) => e.stopPropagation()}>
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

      <Box sx={S.Minimap}>
        <Box sx={{ width: 64, height: 40, border: `2px solid ${COLORS.primary[600]}`, borderRadius: 0.5 }} />
      </Box>
    </Box>
  );
}
