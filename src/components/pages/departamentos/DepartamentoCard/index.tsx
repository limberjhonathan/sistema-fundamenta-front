"use client";

import { MouseEvent, useState } from "react";
import { Avatar, Box, Card, IconButton, LinearProgress, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import ToggleOffOutlined from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlined from "@mui/icons-material/ToggleOnOutlined";
import StatusChip from "@/components/shared/StatusChip";
import { DepartamentoStatus } from "@/enums";
import { DEPARTAMENTO_STATUS } from "@/status";
import { COLORS } from "@/styles/colors";
import type { Departamento } from "@/types/organizacao";
import { iniciais } from "@/utils/iniciais";
import { useDepartamentosStore } from "../core/store/useDepartamentosStore";
import * as S from "../style";

/** Cor da barra de cobertura: verde ≥ 70%, laranja ≥ 40%, vermelho abaixo disso. */
const corCobertura = (v: number) => (v >= 70 ? "success" : v >= 40 ? "warning" : "error");

export default function DepartamentoCard({ departamento: d }: { departamento: Departamento }) {
  const { abrirDetalhe, abrirDialog, alternarStatus } = useDepartamentosStore();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const inativo = d.status === DepartamentoStatus.Inativo;

  const abrirMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
  };
  const acao = (fn: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    fn();
    setAnchor(null);
  };

  return (
    <Card sx={S.DepCard(inativo)} onClick={() => abrirDetalhe(d.id)}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <Box sx={S.Sigla(inativo)}>{d.sigla}</Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={S.DepNome} noWrap>
            {d.nome}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontFamily: "ui-monospace, monospace" }}>
            {d.centroCusto}
          </Typography>
        </Box>
        <StatusChip status={DEPARTAMENTO_STATUS[d.status]} />
        <IconButton size="small" onClick={abrirMenu} aria-label={`Ações para ${d.nome}`} sx={{ mr: -1, mt: -0.5 }}>
          <MoreVertRounded fontSize="small" />
        </IconButton>
        <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)} onClick={(e) => e.stopPropagation()}>
          <MenuItem onClick={acao(() => abrirDetalhe(d.id))}>
            <ListItemIcon>
              <VisibilityOutlined fontSize="small" />
            </ListItemIcon>
            Ver detalhes
          </MenuItem>
          <MenuItem onClick={acao(() => abrirDialog(d))}>
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            Editar
          </MenuItem>
          <MenuItem onClick={acao(() => alternarStatus(d.id))}>
            <ListItemIcon>{inativo ? <ToggleOnOutlined fontSize="small" /> : <ToggleOffOutlined fontSize="small" />}</ListItemIcon>
            {inativo ? "Reativar" : "Desativar"}
          </MenuItem>
        </Menu>
      </Box>

      <Typography sx={S.DepDescricao}>{d.descricao}</Typography>

      <Box sx={S.Metricas}>
        {[
          { label: "Pessoas", valor: d.colaboradores },
          { label: "Processos", valor: d.processos },
          { label: "Cobertura", valor: `${d.cobertura}%` },
        ].map((m) => (
          <Box key={m.label} sx={{ textAlign: "center" }}>
            <Typography sx={S.MetricaValor}>{m.valor}</Typography>
            <Typography sx={S.MetricaLabel}>{m.label}</Typography>
          </Box>
        ))}
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
          <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Cobertura de mapeamento</Typography>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>{d.cobertura}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={d.cobertura} color={corCobertura(d.cobertura)} sx={{ height: 6 }} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={S.GestorAvatar}>{iniciais(d.gestor)}</Avatar>
        <Box>
          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.2 }}>{d.gestor}</Typography>
          <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>Gestor responsável</Typography>
        </Box>
      </Box>
    </Card>
  );
}
