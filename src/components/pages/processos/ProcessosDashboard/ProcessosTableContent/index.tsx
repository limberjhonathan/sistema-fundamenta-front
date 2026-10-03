"use client";

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { PROCESSOS_COLUMNS } from "@/consts/tableColumn/processos";
import { useProcessosTable } from "../core/hooks/useProcessosTable";
import ProcessoRow from "./ProcessoRow";

export default function ProcessosTableContent() {
  const { table } = useProcessosTable();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            {PROCESSOS_COLUMNS.map((col) => (
              <TableCell key={col.key} align={col.align} sx={{ width: col.width }}>
                {col.sortable ? (
                  <TableSortLabel active direction={table.ordenacao} onClick={table.alternarOrdenacao}>
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.linhas.map((p) => (
            <ProcessoRow key={p.codigo} processo={p} />
          ))}
        </TableBody>
      </Table>
      {table.linhas.length === 0 && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>Nenhum processo encontrado com os filtros atuais.</Typography>
        </Box>
      )}
    </TableContainer>
  );
}
