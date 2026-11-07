"use client";

import { MouseEvent, useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import LockResetOutlined from "@mui/icons-material/LockResetOutlined";
import ForwardToInboxOutlined from "@mui/icons-material/ForwardToInboxOutlined";
import PersonOffOutlined from "@mui/icons-material/PersonOffOutlined";
import HowToRegOutlined from "@mui/icons-material/HowToRegOutlined";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import BlockRounded from "@mui/icons-material/BlockRounded";
import StatusChip from "@/components/shared/StatusChip";
import { UsuarioStatus } from "@/enums";
import { PERFIL_ACESSO, USUARIO_STATUS } from "@/status";
import { COLORS } from "@/styles/colors";
import type { UsuarioSistema } from "@/types/usuario";
import { iniciais } from "@/utils/iniciais";
import { useUsuariosStore } from "../../core/store/useUsuariosStore";
import * as S from "../../style";

const STATUS_ICON = {
  [UsuarioStatus.Ativo]: <CheckCircleOutlineRounded />,
  [UsuarioStatus.Convidado]: <ScheduleRounded />,
  [UsuarioStatus.Inativo]: <BlockRounded />,
};

type UsuarioRowProps = { usuario: UsuarioSistema; selecionado: boolean; onSelecionar: () => void };

export default function UsuarioRow({ usuario, selecionado, onSelecionar }: UsuarioRowProps) {
  const { abrirDialog, alterarStatus } = useUsuariosStore();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const abrir = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const fechar = () => setAnchor(null);

  const inativo = usuario.status === UsuarioStatus.Inativo;
  const perfil = PERFIL_ACESSO[usuario.perfil];

  const acao = (fn: () => void) => () => {
    fn();
    fechar();
  };

  return (
    <TableRow hover selected={selecionado} sx={{ opacity: inativo ? 0.65 : 1 }}>
      <TableCell padding="checkbox">
        <Checkbox size="small" checked={selecionado} onChange={onSelecionar} slotProps={{ input: { "aria-label": `Selecionar ${usuario.nome}` } }} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={S.Avatar(!inativo)}>{iniciais(usuario.nome)}</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={S.UsuarioNome}>{usuario.nome}</Typography>
            <Typography sx={S.UsuarioEmail} noWrap>
              {usuario.email} · {usuario.cargo}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{usuario.departamento}</TableCell>
      <TableCell>
        <Chip size="small" label={perfil.label} sx={S.PerfilChip(perfil)} />
      </TableCell>
      <TableCell>
        <StatusChip status={USUARIO_STATUS[usuario.status]} icon={STATUS_ICON[usuario.status]} />
      </TableCell>
      <TableCell sx={{ color: usuario.status === UsuarioStatus.Convidado ? COLORS.gray[400] : COLORS.gray[700] }}>
        {usuario.ultimoAcesso}
      </TableCell>
      <TableCell align="center">
        <IconButton size="small" onClick={abrir} aria-label={`Ações para ${usuario.nome}`}>
          <MoreHorizRounded fontSize="small" />
        </IconButton>
        <Menu anchorEl={anchor} open={!!anchor} onClose={fechar}>
          <MenuItem onClick={acao(() => abrirDialog(usuario))}>
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            Editar usuário
          </MenuItem>
          {usuario.status === UsuarioStatus.Convidado ? (
            <MenuItem onClick={fechar}>
              <ListItemIcon>
                <ForwardToInboxOutlined fontSize="small" />
              </ListItemIcon>
              Reenviar convite
            </MenuItem>
          ) : (
            <MenuItem onClick={fechar} disabled={inativo}>
              <ListItemIcon>
                <LockResetOutlined fontSize="small" />
              </ListItemIcon>
              Redefinir senha
            </MenuItem>
          )}
          <Divider />
          {inativo ? (
            <MenuItem onClick={acao(() => alterarStatus([usuario.id], UsuarioStatus.Ativo))}>
              <ListItemIcon>
                <HowToRegOutlined fontSize="small" />
              </ListItemIcon>
              Reativar acesso
            </MenuItem>
          ) : (
            <MenuItem onClick={acao(() => alterarStatus([usuario.id], UsuarioStatus.Inativo))} sx={{ color: COLORS.accent.redDark }}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <PersonOffOutlined fontSize="small" />
              </ListItemIcon>
              Desativar acesso
            </MenuItem>
          )}
        </Menu>
      </TableCell>
    </TableRow>
  );
}
