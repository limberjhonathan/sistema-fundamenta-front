"use client";

import { Card, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterAltOffOutlined from "@mui/icons-material/FilterAltOffOutlined";
import { PerfilAcesso, UsuarioStatus } from "@/enums";
import { PERFIL_ACESSO, USUARIO_STATUS } from "@/status";
import { DEPARTAMENTOS } from "@/mocks/processos";
import { useUsuarios } from "../core/hooks/useUsuarios";
import * as S from "../style";

export default function UsuariosFiltersSection() {
  const { filters } = useUsuarios();
  const { valores, setFilter, limpar } = filters;

  return (
    <Card sx={S.FiltersBar}>
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por nome ou e-mail..."
        value={valores.buscaPor}
        onChange={(e) => setFilter("buscaPor", e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <Select
        size="small"
        displayEmpty
        value={valores.perfil}
        onChange={(e) => setFilter("perfil", e.target.value as PerfilAcesso | "")}
        sx={S.FilterSelect}
      >
        <MenuItem value="">Todos os perfis</MenuItem>
        {Object.values(PerfilAcesso).map((p) => (
          <MenuItem key={p} value={p}>
            {PERFIL_ACESSO[p].label}
          </MenuItem>
        ))}
      </Select>
      <Select
        size="small"
        displayEmpty
        value={valores.status}
        onChange={(e) => setFilter("status", e.target.value as UsuarioStatus | "")}
        sx={S.FilterSelect}
      >
        <MenuItem value="">Todos os status</MenuItem>
        {Object.values(UsuarioStatus).map((s) => (
          <MenuItem key={s} value={s}>
            {USUARIO_STATUS[s].label}
          </MenuItem>
        ))}
      </Select>
      <Select
        size="small"
        displayEmpty
        value={valores.departamento}
        onChange={(e) => setFilter("departamento", e.target.value)}
        sx={S.FilterSelect}
      >
        <MenuItem value="">Todos departamentos</MenuItem>
        {DEPARTAMENTOS.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title="Limpar filtros">
        <IconButton onClick={limpar}>
          <FilterAltOffOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
