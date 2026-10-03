"use client";

import { Box, Button, Chip, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import { COLORS } from "@/styles/colors";
import { AprovacoesAba, useAprovacoesStore } from "../core/store/useAprovacoesStore";
import { useAprovacoes } from "../core/hooks/useAprovacoes";
import * as S from "../style";

export default function AprovacoesTabs() {
  const { aba, setAba, buscaPor, setBuscaPor } = useAprovacoesStore();
  const { totalPendentes } = useAprovacoes();

  return (
    <Box sx={S.TabsBar}>
      <Tabs value={aba} onChange={(_, v: AprovacoesAba) => setAba(v)} variant="scrollable">
        <Tab
          value={AprovacoesAba.Pendentes}
          iconPosition="end"
          icon={<Chip size="small" label={totalPendentes} sx={{ height: 18, bgcolor: COLORS.gray[200] }} />}
          label="Pendentes"
        />
        <Tab value={AprovacoesAba.MeuHistorico} label="Meu Histórico" />
        <Tab value={AprovacoesAba.EmObservacao} label="Em Observação" />
      </Tabs>

      <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
        <TextField
          size="small"
          placeholder="Buscar por nome ou ID..."
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
        <Button variant="outlined" startIcon={<FilterAltOutlined />}>
          Filtros
        </Button>
      </Box>
    </Box>
  );
}
