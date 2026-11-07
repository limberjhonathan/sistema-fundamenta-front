"use client";

import { Card, FormControlLabel, InputAdornment, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import SortRounded from "@mui/icons-material/SortRounded";
import { useDepartamentosStore } from "../core/store/useDepartamentosStore";
import type { OrdenacaoDepartamento } from "../core/types";
import * as S from "../style";

const ORDENACOES: { value: OrdenacaoDepartamento; label: string }[] = [
  { value: "nome", label: "Nome (A–Z)" },
  { value: "processos", label: "Mais processos" },
  { value: "colaboradores", label: "Mais colaboradores" },
  { value: "cobertura", label: "Maior cobertura" },
];

export default function DepartamentosToolbar() {
  const { buscaPor, setBuscaPor, ordenacao, setOrdenacao, mostrarInativos, setMostrarInativos } = useDepartamentosStore();

  return (
    <Card sx={S.Toolbar}>
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por nome, sigla ou gestor..."
        value={buscaPor}
        onChange={(e) => setBuscaPor(e.target.value)}
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
        value={ordenacao}
        onChange={(e) => setOrdenacao(e.target.value as OrdenacaoDepartamento)}
        startAdornment={<SortRounded sx={{ fontSize: 18, mr: 1, color: "text.secondary" }} />}
        sx={{ minWidth: 210, "& .MuiSelect-select": { fontSize: "0.875rem" } }}
      >
        {ORDENACOES.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      <FormControlLabel
        sx={{ m: 0, whiteSpace: "nowrap" }}
        control={<Switch size="small" checked={mostrarInativos} onChange={(e) => setMostrarInativos(e.target.checked)} />}
        label={<Typography sx={{ fontSize: "0.875rem", ml: 1 }}>Mostrar inativos</Typography>}
      />
    </Card>
  );
}
