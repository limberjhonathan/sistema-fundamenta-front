"use client";

import { FormEvent, useState } from "react";
import { Box, Button, InputBase, MenuItem, Select, Typography } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import { mockBuscasRecentes } from "@/mocks/busca";
import { COLORS } from "@/styles/colors";
import { useBuscaStore } from "../core/store/useBuscaStore";
import * as S from "../style";

export default function BuscaSearchBar() {
  const { termo, setTermo } = useBuscaStore();
  const [valor, setValor] = useState(termo);
  const [ordem, setOrdem] = useState("relevancia");

  const pesquisar = (e: FormEvent) => {
    e.preventDefault();
    if (valor.trim()) setTermo(valor.trim());
  };

  return (
    <Box sx={S.SearchArea}>
      <Box component="form" onSubmit={pesquisar} sx={S.SearchBox}>
        <SearchRounded sx={{ color: COLORS.gray[500] }} />
        <InputBase fullWidth value={valor} onChange={(e) => setValor(e.target.value)} placeholder="O que você procura?" />
        <Button type="submit" variant="contained">
          Pesquisar
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
        <HistoryRounded sx={{ fontSize: 14, color: COLORS.gray[500] }} />
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Recentes:</Typography>
        {mockBuscasRecentes.map((r, i) => (
          <Typography
            key={r}
            onClick={() => {
              setValor(r);
              setTermo(r);
            }}
            sx={{ fontSize: "0.75rem", color: COLORS.gray[600], cursor: "pointer", "&:hover": { color: COLORS.primary[600] } }}
          >
            {r}
            {i < mockBuscasRecentes.length - 1 && ","}
          </Typography>
        ))}

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>Ordenar por:</Typography>
          <Select
            variant="standard"
            disableUnderline
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
            sx={{ fontSize: "0.75rem", fontWeight: 600 }}
          >
            <MenuItem value="relevancia">Relevância</MenuItem>
            <MenuItem value="recentes">Mais recentes</MenuItem>
            <MenuItem value="acessados">Mais acessados</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}
