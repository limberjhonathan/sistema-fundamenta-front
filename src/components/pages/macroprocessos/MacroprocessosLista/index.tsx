"use client";

import { Box, Chip, InputAdornment, Tab, Tabs, TextField, Typography } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { TipoMacroprocesso } from "@/enums";
import { TIPO_MACROPROCESSO } from "@/status";
import { COLORS } from "@/styles/colors";
import { useMacroprocessos } from "../core/hooks/useMacroprocessos";
import { useMacroprocessosStore } from "../core/store/useMacroprocessosStore";
import type { FiltroTipo } from "../core/types";
import MacroprocessoItem from "../MacroprocessoItem";
import * as S from "../style";

const ABAS: { value: FiltroTipo; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...Object.values(TipoMacroprocesso).map((t) => ({ value: t, label: TIPO_MACROPROCESSO[t].label })),
];

export default function MacroprocessosLista() {
  const { lista, contagemPorTipo } = useMacroprocessos();
  const { tipo, setTipo, buscaPor, setBuscaPor } = useMacroprocessosStore();

  return (
    <Box>
      <Box sx={S.ListaBar}>
        <Tabs value={tipo} onChange={(_, v: FiltroTipo) => setTipo(v)} variant="scrollable">
          {ABAS.map((a) => (
            <Tab
              key={a.value}
              value={a.value}
              iconPosition="end"
              label={a.label}
              icon={<Chip size="small" label={contagemPorTipo[a.value]} sx={{ height: 18, bgcolor: COLORS.gray[200] }} />}
            />
          ))}
        </Tabs>
        <TextField
          size="small"
          placeholder="Buscar por nome ou código..."
          value={buscaPor}
          onChange={(e) => setBuscaPor(e.target.value)}
          sx={{ pb: 1, minWidth: 260 }}
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
      </Box>

      {tipo !== "todos" && (
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary", mb: 2 }}>{TIPO_MACROPROCESSO[tipo].descricao}.</Typography>
      )}

      {lista.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>Nenhum macroprocesso encontrado.</Typography>
        </Box>
      ) : (
        lista.map((m) => <MacroprocessoItem key={m.id} macro={m} />)
      )}
    </Box>
  );
}
