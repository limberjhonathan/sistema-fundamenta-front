"use client";

import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { AcaoPermissao, ModuloSistema } from "@/enums";
import { ACAO_LABEL, MODULO_LABEL, PERFIL_ACESSO } from "@/status";
import { COLORS } from "@/styles/colors";
import { usePermissoes } from "../core/hooks/usePermissoes";
import * as S from "../style";

const TOTAL = Object.values(AcaoPermissao).length;

/** Visão lado a lado: quanto de cada módulo cada perfil acessa. */
export default function CompararPerfis() {
  const { perfis } = usePermissoes();

  return (
    <Card sx={S.EditorCard}>
      <Box sx={S.EditorHeader}>
        <Box>
          <Typography variant="h3">Comparar perfis</Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            Quantidade de ações liberadas por módulo. Passe o mouse para ver quais.
          </Typography>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              <TableCell>Módulo</TableCell>
              {perfis.map((p) => (
                <TableCell key={p.perfil} align="center">
                  {PERFIL_ACESSO[p.perfil].label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(ModuloSistema).map((m) => (
              <TableRow key={m} hover>
                <TableCell>
                  <Typography sx={S.ModuloNome}>{MODULO_LABEL[m].label}</Typography>
                </TableCell>
                {perfis.map((p) => {
                  const acoes = p.permissoes[m];
                  return (
                    <TableCell key={p.perfil} align="center">
                      <Tooltip title={acoes.length ? acoes.map((a) => ACAO_LABEL[a]).join(", ") : "Sem acesso"}>
                        <Box sx={S.CompararCelula(acoes.length / TOTAL)}>
                          {acoes.length === 0 ? "—" : acoes.length === TOTAL ? "Total" : `${acoes.length}/${TOTAL}`}
                        </Box>
                      </Tooltip>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${COLORS.gray[200]}`, display: "flex", gap: 2, flexWrap: "wrap", fontSize: "0.75rem", color: "text.secondary" }}>
        {[
          { label: "Sem acesso", pct: 0 },
          { label: "Parcial", pct: 0.4 },
          { label: "Maior parte", pct: 0.6 },
          { label: "Total", pct: 1 },
        ].map((l) => (
          <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{ ...S.CompararCelula(l.pct), minWidth: 14, height: 14, p: 0 }} />
            {l.label}
          </Box>
        ))}
      </Box>
    </Card>
  );
}
