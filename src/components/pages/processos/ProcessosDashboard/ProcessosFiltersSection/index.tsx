"use client";

import { Card, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterAltOffOutlined from "@mui/icons-material/FilterAltOffOutlined";
import { ProcessoStatus } from "@/enums";
import { PROCESSO_STATUS } from "@/status";
import { DEPARTAMENTOS } from "@/mocks/processos";
import { useProcessosTable } from "../core/hooks/useProcessosTable";
import * as S from "../style";

export default function ProcessosFiltersSection() {
  const { filters } = useProcessosTable();
  const { valores, setFilter, limpar } = filters;

  return (
    <Card sx={S.FiltersBar}>
      <TextField
        fullWidth
        size="small"
        placeholder="Filtrar por código ou título do processo..."
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
        value={valores.status}
        onChange={(e) => setFilter("status", e.target.value as ProcessoStatus | "")}
        sx={S.FilterSelect}
      >
        <MenuItem value="">Todos os Status</MenuItem>
        {Object.values(ProcessoStatus).map((s) => (
          <MenuItem key={s} value={s}>
            {PROCESSO_STATUS[s].label}
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
        <MenuItem value="">Todos Departamentos</MenuItem>
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
