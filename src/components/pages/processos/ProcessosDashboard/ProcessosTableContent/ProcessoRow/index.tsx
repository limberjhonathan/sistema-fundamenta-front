"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import { Chip, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import StatusChip from "@/components/shared/StatusChip";
import { ProcessoStatus } from "@/enums";
import { PROCESSO_STATUS } from "@/status";
import type { Processo } from "@/types/processo";
import * as S from "../../style";

const STATUS_ICON = {
  [ProcessoStatus.Publicado]: <CheckCircleOutlineRounded />,
  [ProcessoStatus.EmAprovacao]: <ScheduleRounded />,
  [ProcessoStatus.Rascunho]: <EditOutlined />,
  [ProcessoStatus.Obsoleto]: <Inventory2Outlined />,
};

export default function ProcessoRow({ processo }: { processo: Processo }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const abrir = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const fechar = () => setAnchor(null);

  return (
    <TableRow hover>
      <TableCell>
        <Typography sx={S.Codigo}>{processo.codigo}</Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{processo.titulo}</Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Atualizado em: {processo.atualizadoEm}</Typography>
      </TableCell>
      <TableCell>{processo.departamento}</TableCell>
      <TableCell>{processo.responsavel}</TableCell>
      <TableCell>
        <StatusChip status={PROCESSO_STATUS[processo.status]} icon={STATUS_ICON[processo.status]} />
      </TableCell>
      <TableCell>
        <Chip size="small" label={processo.versao} sx={S.VersaoChip} />
      </TableCell>
      <TableCell align="center">
        <IconButton size="small" onClick={abrir} aria-label="Ações">
          <MoreHorizRounded fontSize="small" />
        </IconButton>
        <Menu anchorEl={anchor} open={!!anchor} onClose={fechar}>
          <MenuItem component={Link} href="/modelagem" onClick={fechar}>
            Abrir na modelagem
          </MenuItem>
          <MenuItem onClick={fechar}>Ver histórico</MenuItem>
          <MenuItem onClick={fechar}>Duplicar</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}
