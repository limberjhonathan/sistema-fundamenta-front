"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import AddLinkRounded from "@mui/icons-material/AddLinkRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import StatusChip from "@/components/shared/StatusChip";
import { MATURIDADE_LABEL } from "@/mocks/macroprocessos";
import { PROCESSO_STATUS, TIPO_MACROPROCESSO } from "@/status";
import { COLORS } from "@/styles/colors";
import type { Macroprocesso } from "@/types/organizacao";
import type { Processo } from "@/types/processo";
import { iniciais } from "@/utils/iniciais";
import { useMacroprocessosStore } from "../core/store/useMacroprocessosStore";
import * as S from "../style";

type MacroprocessoItemProps = { macro: Macroprocesso & { processosDetalhe: Processo[] } };

export default function MacroprocessoItem({ macro }: MacroprocessoItemProps) {
  const { expandidoId, alternarExpandido, abrirDialog } = useMacroprocessosStore();
  const tipo = TIPO_MACROPROCESSO[macro.tipo];

  return (
    <Accordion
      id={`macro-${macro.id}`}
      expanded={expandidoId === macro.id}
      onChange={() => alternarExpandido(macro.id)}
      disableGutters
      sx={S.Accordion}
    >
      <AccordionSummary expandIcon={<ExpandMoreRounded />} sx={S.AccordionResumo}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
            <Typography sx={S.Codigo}>{macro.codigo}</Typography>
            <Chip size="small" label={tipo.label} sx={S.TipoChip(tipo)} />
          </Box>
          <Typography sx={S.MacroNome} noWrap>
            {macro.nome}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, width: 180 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: "0.6875rem", fontWeight: 700, bgcolor: COLORS.primary[50], color: COLORS.primary[700] }}>
            {iniciais(macro.dono)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }} noWrap>
              {macro.dono}
            </Typography>
            <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>Dono do macroprocesso</Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "block" }, width: 90, textAlign: "center" }}>
          <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1 }}>
            {macro.processos.length}
          </Typography>
          <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>processos</Typography>
        </Box>

        <Tooltip title={`Maturidade ${macro.maturidade}/5 — ${MATURIDADE_LABEL[macro.maturidade]}`}>
          <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", alignItems: "center", gap: 0.5, width: 90, mr: 1 }}>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Box key={n} sx={S.MaturidadeDot(n <= macro.maturidade)} />
              ))}
            </Box>
            <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{MATURIDADE_LABEL[macro.maturidade]}</Typography>
          </Box>
        </Tooltip>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", pb: 2, mb: 2, borderBottom: `1px solid ${COLORS.gray[200]}` }}>
          <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[700], flex: "1 1 320px" }}>{macro.descricao}</Typography>
          <Box sx={{ flex: "0 1 auto" }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Departamentos envolvidos
            </Typography>
            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mt: 0.5 }}>
              {macro.departamentos.map((d) => (
                <Chip key={d} size="small" label={d} variant="outlined" />
              ))}
            </Box>
          </Box>
        </Box>

        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          Processos vinculados
        </Typography>

        {macro.processosDetalhe.length === 0 ? (
          <Box sx={{ ...S.SemProcessos, mt: 1 }}>
            <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[600], flex: 1 }}>
              Este macroprocesso ainda não tem processos. Mapeie o primeiro ou peça uma sugestão para a IA.
            </Typography>
            <Button size="small" variant="outlined" startIcon={<AutoAwesomeOutlined />} component={Link} href="/novo-com-ia">
              Criar com IA
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 0.5, mx: -1.5 }}>
            {macro.processosDetalhe.map((p) => (
              <Box key={p.codigo} sx={S.ProcessoLinha}>
                <Typography sx={{ ...S.Codigo, display: { xs: "none", md: "block" } }}>{p.codigo}</Typography>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }} noWrap>
                    {p.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    {p.versao} · Atualizado em {p.atualizadoEm}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.8125rem", display: { xs: "none", md: "block" } }}>{p.responsavel}</Typography>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <StatusChip status={PROCESSO_STATUS[p.status]} />
                </Box>
                <Button size="small" endIcon={<OpenInNewRounded sx={{ fontSize: "14px !important" }} />} component={Link} href="/modelagem">
                  Abrir
                </Button>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
          <Button size="small" variant="outlined" startIcon={<AddLinkRounded />}>
            Vincular processo
          </Button>
          <Button size="small" variant="contained" startIcon={<EditOutlined />} onClick={() => abrirDialog(macro)}>
            Editar
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
