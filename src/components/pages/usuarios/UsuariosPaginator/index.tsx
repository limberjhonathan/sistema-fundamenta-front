"use client";

import { Box, Pagination, Typography } from "@mui/material";
import { useUsuarios } from "../core/hooks/useUsuarios";
import * as S from "../style";

export default function UsuariosPaginator() {
  const { table, pagination } = useUsuarios();

  return (
    <Box sx={S.PaginatorBar}>
      <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
        Mostrando <b>{table.linhas.length}</b> de <b>{pagination.total}</b> usuários
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
