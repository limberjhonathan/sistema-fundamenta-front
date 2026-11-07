"use client";

import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import PersonOffOutlined from "@mui/icons-material/PersonOffOutlined";
import HowToRegOutlined from "@mui/icons-material/HowToRegOutlined";
import { UsuarioStatus } from "@/enums";
import { USUARIOS_COLUMNS } from "@/consts/tableColumn/usuarios";
import { useUsuarios } from "../core/hooks/useUsuarios";
import { useUsuariosStore } from "../core/store/useUsuariosStore";
import UsuarioRow from "./UsuarioRow";
import * as S from "../style";

export default function UsuariosTableContent() {
  const { table, selecao } = useUsuarios();
  const alterarStatus = useUsuariosStore((s) => s.alterarStatus);

  return (
    <>
      {selecao.ids.length > 0 && (
        <Box sx={S.BulkBar}>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, mr: "auto" }}>
            {selecao.ids.length} {selecao.ids.length === 1 ? "usuário selecionado" : "usuários selecionados"}
          </Typography>
          <Button size="small" startIcon={<HowToRegOutlined />} onClick={() => alterarStatus(selecao.ids, UsuarioStatus.Ativo)}>
            Ativar
          </Button>
          <Button size="small" startIcon={<PersonOffOutlined />} onClick={() => alterarStatus(selecao.ids, UsuarioStatus.Inativo)}>
            Desativar
          </Button>
          <Button size="small" onClick={selecao.limpar} sx={{ opacity: 0.7 }}>
            Limpar seleção
          </Button>
        </Box>
      )}

      <TableContainer>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  size="small"
                  checked={selecao.todosNaPagina}
                  indeterminate={selecao.algunsNaPagina}
                  onChange={(e) => selecao.alternarPagina(e.target.checked)}
                  slotProps={{ input: { "aria-label": "Selecionar todos da página" } }}
                />
              </TableCell>
              {USUARIOS_COLUMNS.map((col) => (
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
            {table.linhas.map((u) => (
              <UsuarioRow
                key={u.id}
                usuario={u}
                selecionado={selecao.ids.includes(u.id)}
                onSelecionar={() => selecao.alternar(u.id)}
              />
            ))}
          </TableBody>
        </Table>
        {table.linhas.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary" }}>Nenhum usuário encontrado com os filtros atuais.</Typography>
          </Box>
        )}
      </TableContainer>
    </>
  );
}
