"use client";

import {
  Box,
  Card,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import StatusChip from "@/components/shared/StatusChip";
import { COTAS_COLUMNS } from "@/consts/tableColumn/cotas";
import { SituacaoCota } from "@/enums";
import { SITUACAO_COTA } from "@/status";
import { COLORS } from "@/styles/colors";
import { formatarNumero, useIaCotas } from "../core/hooks/useIaCotas";
import { useIaCotasStore } from "../core/store/useIaCotasStore";
import * as S from "../style";

const COR_BARRA = { [SituacaoCota.Normal]: "primary", [SituacaoCota.Atencao]: "warning", [SituacaoCota.Esgotada]: "error" } as const;

export default function CotasDepartamento() {
  const { cotas, limiteDistribuido, plano } = useIaCotas();
  const abrirCota = useIaCotasStore((s) => s.abrirCota);

  return (
    <Card sx={{ ...S.Card, p: 0 }}>
      <Box sx={{ ...S.CardHeader, px: 2.5, pt: 2.5, mb: 1 }}>
        <Box>
          <Typography variant="h3" sx={S.CardTitle}>
            Cotas por departamento
          </Typography>
          <Typography sx={S.CardSubtitle}>
            {formatarNumero(limiteDistribuido)} de {formatarNumero(plano.creditosMes)} créditos distribuídos entre as áreas
          </Typography>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 620 }}>
          <TableHead>
            <TableRow>
              {COTAS_COLUMNS.map((col) => (
                <TableCell key={col.key} align={col.align} sx={{ width: col.width }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cotas.map((c) => (
              <TableRow key={c.departamento} hover>
                <TableCell sx={{ fontWeight: 600 }}>{c.departamento}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{formatarNumero(c.usado)} usados</Typography>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>{Math.round(c.pct * 100)}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={Math.min(100, c.pct * 100)} color={COR_BARRA[c.situacao]} sx={{ height: 6 }} />
                </TableCell>
                <TableCell align="right" sx={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600 }}>
                  {formatarNumero(c.limite)}
                </TableCell>
                <TableCell>
                  <StatusChip status={SITUACAO_COTA[c.situacao]} />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Ajustar limite">
                    <IconButton size="small" onClick={() => abrirCota(c.departamento)} aria-label={`Ajustar limite de ${c.departamento}`}>
                      <TuneRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
