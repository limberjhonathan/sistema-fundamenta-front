"use client";

import { MouseEvent, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import { COLORS } from "@/styles/colors";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../core/store/useModelagemStore";
import * as S from "../style";

export type ModelagemAba = "diagrama" | "xml" | "versoes";

type ModelagemToolbarProps = {
  aba: ModelagemAba;
  onAba: (aba: ModelagemAba) => void;
  onAviso: (mensagem: string) => void;
};

export default function ModelagemToolbar({ aba, onAba, onAviso }: ModelagemToolbarProps) {
  const { pronto, salvar, baixarArquivo, restaurarExemplo } = useModelagemAcoes();
  const alterado = useModelagemStore((s) => s.alterado);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const abrirMenu = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const fecharMenu = () => setAnchor(null);

  const handleSalvar = async () => {
    const ok = await salvar();
    onAviso(ok ? "Processo salvo neste navegador." : "Não foi possível salvar o processo.");
  };

  const handleRestaurar = async () => {
    fecharMenu();
    await restaurarExemplo();
    onAviso("Diagrama de exemplo restaurado.");
  };

  return (
    <Box sx={S.Toolbar}>
      <Typography variant="h4" sx={{ maxWidth: 220, lineHeight: 1.25 }}>
        Solicitação de Crédito Imobiliário
      </Typography>
      <Chip
        size="small"
        label="Em Modelagem"
        variant="outlined"
        sx={{ color: COLORS.accent.orangeDark, borderColor: COLORS.accent.orange, bgcolor: COLORS.accent.orangeLight, borderRadius: 999 }}
      />
      <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: "none", lg: "block" } }} />

      <ToggleButtonGroup exclusive size="small" value={aba} onChange={(_, v: ModelagemAba | null) => v && onAba(v)} sx={S.ViewToggle}>
        <ToggleButton value="diagrama">Diagrama</ToggleButton>
        <ToggleButton value="xml">XML BPMN</ToggleButton>
        <ToggleButton value="versoes">Versões</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
        <Button startIcon={<HistoryRounded />} sx={{ color: COLORS.gray[900], display: { xs: "none", lg: "inline-flex" } }} onClick={() => onAba("versoes")}>
          Histórico
        </Button>
        <Button startIcon={<ShareOutlined />} sx={{ color: COLORS.gray[900], display: { xs: "none", lg: "inline-flex" } }}>
          Compartilhar
        </Button>
        <Button variant={alterado ? "contained" : "outlined"} startIcon={<SaveOutlined />} onClick={handleSalvar} disabled={!pronto}>
          Salvar Processo
        </Button>
        <IconButton onClick={abrirMenu} disabled={!pronto} sx={{ border: `1px solid ${COLORS.gray[200]}`, borderRadius: 2 }}>
          <MoreVertRounded fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={!!anchor}
          onClose={fecharMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              fecharMenu();
              baixarArquivo();
            }}
          >
            <ListItemIcon>
              <FileDownloadOutlined fontSize="small" />
            </ListItemIcon>
            Baixar arquivo .bpmn
          </MenuItem>
          <MenuItem onClick={handleRestaurar}>
            <ListItemIcon>
              <RestartAltRounded fontSize="small" />
            </ListItemIcon>
            Restaurar diagrama de exemplo
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
