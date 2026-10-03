"use client";

import { Box, Pagination, Typography } from "@mui/material";
import { useProcessosTable } from "../core/hooks/useProcessosTable";
import * as S from "../style";

export default function ProcessosPaginator() {
  const { table, pagination } = useProcessosTable();

  return (
    <Box sx={S.PaginatorBar}>
      <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
        Mostrando <b>{table.linhas.length}</b> de <b>{pagination.total}</b> processos
      </Typography>
      <Pagination
        size="small"
        shape="rounded"
        count={pagination.totalPaginas}
        page={pagination.pagina}
        onChange={(_, p) => pagination.setPagina(p)}
      />
    </Box>
  );
}
