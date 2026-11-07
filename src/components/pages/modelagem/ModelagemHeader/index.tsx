"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import UndoRounded from "@mui/icons-material/UndoRounded";
import RedoRounded from "@mui/icons-material/RedoRounded";
import CloudDoneOutlined from "@mui/icons-material/CloudDoneOutlined";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import SendRounded from "@mui/icons-material/SendRounded";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import KeyboardOutlined from "@mui/icons-material/KeyboardOutlined";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import CodeRounded from "@mui/icons-material/CodeRounded";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ViewSidebarOutlined from "@mui/icons-material/ViewSidebarOutlined";
import { mockColaboradores, mockProcessoModelagem } from "@/mocks/modelagem";
import { COLORS } from "@/styles/colors";
import { iniciais } from "@/utils/iniciais";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore, type ModelagemAba } from "../core/store/useModelagemStore";
import * as S from "../style";

const formatarHora = (data: Date) => data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

type ModelagemHeaderProps = { onAviso: (mensagem: string) => void };

export default function ModelagemHeader({ onAviso }: ModelagemHeaderProps) {
  const { pronto, salvar, desfazer, refazer, baixarArquivo, baixarImagem, restaurarExemplo } = useModelagemAcoes();
  const { aba, setAba, alterado, salvoEm, podeDesfazer, podeRefazer, painelAberto, alternarPainel, setAtalhosAbertos, problemas } =
    useModelagemStore();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const p = mockProcessoModelagem;
  const erros = problemas.filter((x) => x.nivel === "erro").length;
  const textoSalvo = alterado ? "Alterações não salvas" : salvoEm ? `Salvo às ${formatarHora(salvoEm)}` : "Tudo salvo";

  const abrirMenu = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const fecharMenu = () => setAnchor(null);
  const doMenu = (fn: () => void | Promise<void>) => async () => {
    fecharMenu();
    await fn();
  };

  const handleSalvar = async () => {
    const ok = await salvar();
    onAviso(ok ? "Processo salvo neste navegador." : "Não foi possível salvar o processo.");
  };

  const handleEnviar = () =>
    onAviso(erros ? `Corrija ${erros} erro(s) de validação antes de enviar para aprovação.` : "Enviado para aprovação de Ana Silva.");

  return (
    <Box component="header" sx={S.Header}>
      <Tooltip title="Voltar para processos">
        <IconButton component={Link} href="/processos" size="small" sx={{ border: `1px solid ${COLORS.gray[200]}`, borderRadius: 2 }}>
          <ArrowBackRounded fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Identificação do processo */}
      <Box sx={{ minWidth: 0, flexShrink: 1 }}>
        <Box sx={{ ...S.Breadcrumb, display: { xs: "none", sm: "flex" } }}>
          <Link href="/processos">Processos</Link>
          <ChevronRightRounded sx={{ fontSize: 14 }} />
          <span>{p.departamento}</span>
          <ChevronRightRounded sx={{ fontSize: 14 }} />
          <Box component="span" sx={S.Codigo}>
            {p.codigo}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={S.Titulo} noWrap>
            {p.titulo}
          </Typography>
          <Chip
            size="small"
            label={`${p.status} · ${p.versao}`}
            sx={{ height: 20, fontSize: "0.6875rem", fontWeight: 600, bgcolor: COLORS.accent.orangeLight, color: COLORS.accent.orangeDark, display: { xs: "none", lg: "flex" } }}
          />
        </Box>
      </Box>

      {/* Abas centrais */}
      <ToggleButtonGroup
        exclusive
        size="small"
        value={aba}
        onChange={(_, v: ModelagemAba | null) => v && setAba(v)}
        sx={{ ...S.Abas, mx: "auto", display: { xs: "none", md: "flex" } }}
      >
        <ToggleButton value="diagrama">
          <AccountTreeOutlined /> Diagrama
        </ToggleButton>
        <ToggleButton value="xml">
          <CodeRounded /> XML
        </ToggleButton>
        <ToggleButton value="versoes">
          <HistoryRounded /> Versões
        </ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: "auto", md: 0 } }}>
        <Box sx={{ ...S.GrupoIcones, display: { xs: "none", sm: "flex" } }}>
          <Tooltip title="Desfazer (Ctrl+Z)">
            <span>
              <IconButton size="small" onClick={desfazer} disabled={!podeDesfazer}>
                <UndoRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Refazer (Ctrl+Y)">
            <span>
              <IconButton size="small" onClick={refazer} disabled={!podeRefazer}>
                <RedoRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Tooltip title={textoSalvo}>
          <Box sx={{ ...S.SalvoStatus(alterado), display: { xs: "none", sm: "flex" } }}>
            {alterado ? <CloudUploadOutlined /> : <CloudDoneOutlined />}
            {/* Texto só em telas largas; nas demais fica o ícone com a dica */}
            <Box component="span" sx={{ display: "none", "@media (min-width: 1700px)": { display: "inline" } }}>
              {textoSalvo}
            </Box>
          </Box>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, display: { xs: "none", lg: "block" } }} />

        <AvatarGroup
          max={3}
          sx={{ display: { xs: "none", lg: "flex" }, "& .MuiAvatar-root": { width: 28, height: 28, fontSize: "0.6875rem", fontWeight: 700, borderWidth: 2 } }}
        >
          {mockColaboradores.map((c) => (
            <Tooltip key={c.nome} title={`${c.nome}${c.online ? " · editando agora" : ""}`}>
              <Badge
                overlap="circular"
                variant="dot"
                invisible={!c.online}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ "& .MuiBadge-badge": { bgcolor: COLORS.accent.green, border: `2px solid ${COLORS.white}`, width: 10, height: 10, borderRadius: "50%" } }}
              >
                <Avatar sx={{ bgcolor: c.cor, width: 28, height: 28, fontSize: "0.6875rem" }}>{iniciais(c.nome)}</Avatar>
              </Badge>
            </Tooltip>
          ))}
        </AvatarGroup>

        <Tooltip title="Compartilhar">
          <IconButton size="small" sx={{ display: { xs: "none", xl: "inline-flex" } }}>
            <ShareOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveOutlined />}
          onClick={handleSalvar}
          disabled={!pronto}
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          Salvar
        </Button>
        <Button variant="contained" size="small" startIcon={<SendRounded />} onClick={handleEnviar} disabled={!pronto} sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Enviar para aprovação
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            Enviar
          </Box>
        </Button>

        <Tooltip title={painelAberto ? "Ocultar painel" : "Mostrar painel"}>
          <IconButton
            size="small"
            onClick={alternarPainel}
            sx={{ display: { xs: "none", md: "inline-flex" }, color: painelAberto ? COLORS.primary[600] : COLORS.gray[600] }}
          >
            <ViewSidebarOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <IconButton size="small" onClick={abrirMenu} disabled={!pronto} aria-label="Mais opções">
          <MoreHorizRounded fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={!!anchor}
          onClose={fecharMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { minWidth: 240, borderRadius: 2 } } }}
        >
          <MenuItem onClick={doMenu(handleSalvar)} sx={{ display: { sm: "none" } }}>
            <ListItemIcon>
              <SaveOutlined fontSize="small" />
            </ListItemIcon>
            Salvar
          </MenuItem>
          <MenuItem onClick={doMenu(baixarArquivo)}>
            <ListItemIcon>
              <FileDownloadOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Baixar .bpmn" secondary="Abre no Camunda, Bizagi..." />
          </MenuItem>
          <MenuItem onClick={doMenu(baixarImagem)}>
            <ListItemIcon>
              <ImageOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Exportar imagem (SVG)" secondary="Para documentos e apresentações" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={doMenu(() => setAtalhosAbertos(true))}>
            <ListItemIcon>
              <KeyboardOutlined fontSize="small" />
            </ListItemIcon>
            Atalhos de teclado
          </MenuItem>
          <MenuItem
            onClick={doMenu(async () => {
              await restaurarExemplo();
              onAviso("Diagrama de exemplo restaurado.");
            })}
          >
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
