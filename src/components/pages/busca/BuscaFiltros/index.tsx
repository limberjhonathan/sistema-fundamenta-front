"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Button, Checkbox, Chip, FormControlLabel, MenuItem, Select, Typography } from "@mui/material";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ManageSearchRounded from "@mui/icons-material/ManageSearchRounded";
import IconBox from "@/components/ui/IconBox";
import { mockPodeInteressar, mockTagsPopulares, mockTiposFiltro } from "@/mocks/busca";
import { COLORS } from "@/styles/colors";
import { useBuscaStore } from "../core/store/useBuscaStore";
import * as S from "../style";

const DEPARTAMENTOS = ["Recursos Humanos", "Tecnologia", "Financeiro", "Jurídico", "Operações"];

const checkboxSx = { "& .MuiFormControlLabel-label": { fontSize: "0.875rem" }, my: -0.25 };

export default function BuscaFiltros() {
  const { tipos, departamentos, alternarTipo, alternarDepartamento, limparFiltros } = useBuscaStore();
  const [data, setData] = useState("qualquer");

  return (
    <Box component="aside" sx={S.Filtros}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <FilterAltOutlined sx={{ fontSize: 18 }} />
          <Typography variant="h5">Filtros Avançados</Typography>
        </Box>
        <Button size="small" onClick={limparFiltros} sx={{ fontSize: "0.75rem" }}>
          Limpar tudo
        </Button>
      </Box>

      <Box sx={S.FiltroSecao}>
        <Typography sx={S.FiltroTitulo}>Filtrar por tipo</Typography>
        {mockTiposFiltro.map((t) => (
          <Box key={t.tipo} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              sx={checkboxSx}
              control={<Checkbox size="small" checked={tipos.includes(t.tipo)} onChange={() => alternarTipo(t.tipo)} />}
              label={t.label}
            />
            <Typography sx={S.Contador}>{t.total}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={S.FiltroSecao}>
        <Typography sx={S.FiltroTitulo}>Departamentos</Typography>
        {DEPARTAMENTOS.map((d) => (
          <FormControlLabel
            key={d}
            sx={{ ...checkboxSx, display: "flex" }}
            control={<Checkbox size="small" checked={departamentos.includes(d)} onChange={() => alternarDepartamento(d)} />}
            label={d}
          />
        ))}
        <Button size="small" sx={{ px: 0, fontSize: "0.75rem" }}>
          Ver todos os 12 departamentos
        </Button>
      </Box>

      <Box sx={S.FiltroSecao}>
        <Typography sx={S.FiltroTitulo}>Data de modificação</Typography>
        <Select fullWidth size="small" value={data} onChange={(e) => setData(e.target.value)}>
          <MenuItem value="qualquer">Qualquer momento</MenuItem>
          <MenuItem value="7d">Últimos 7 dias</MenuItem>
          <MenuItem value="30d">Últimos 30 dias</MenuItem>
          <MenuItem value="ano">Este ano</MenuItem>
        </Select>
      </Box>

      <Box sx={S.FiltroSecao}>
        <Typography sx={S.FiltroTitulo}>Tags populares</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {mockTagsPopulares.map((t) => (
            <Chip key={t} size="small" label={t} variant="outlined" clickable sx={{ bgcolor: COLORS.white, borderRadius: 999 }} />
          ))}
        </Box>
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: COLORS.gray[100] }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: COLORS.primary[600], mb: 0.75 }}>
            <AutoAwesomeRounded sx={{ fontSize: 14 }} />
            <Typography variant="overline">Sugestão da IA</Typography>
          </Box>
          <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mb: 1.5 }}>
            Parece que você está buscando por processos de onboarding. Gostaria de ver o guia comparativo de ferramentas
            de integração?
          </Typography>
          <Button fullWidth size="small" variant="outlined">
            Ver sugestão
          </Button>
        </Box>
      </Box>

      <Typography sx={S.FiltroTitulo}>Pode interessar</Typography>
      {mockPodeInteressar.map((p) => (
        <Box key={p} sx={{ display: "flex", gap: 1, mb: 1.25 }}>
          <IconBox size={22} color={COLORS.gray[500]} sx={{ borderRadius: 1 }}>
            <SearchRounded />
          </IconBox>
          <Box>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>{p}</Typography>
            <Typography sx={{ fontSize: "0.5625rem", fontWeight: 600, color: COLORS.gray[500] }}>PORTAL DE CONHECIMENTO</Typography>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: COLORS.gray[100], textAlign: "center" }}>
        <IconBox size={64} bg={COLORS.white} sx={{ mx: "auto", mb: 1.5, borderRadius: 2 }}>
          <ManageSearchRounded />
        </IconBox>
        <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700 }}>Não achou o que procurava?</Typography>
        <Typography sx={{ fontSize: "0.6875rem", color: COLORS.gray[600], mb: 1.5 }}>
          Tente usar palavras-chave mais genéricas ou peça ajuda ao Assistente IA.
        </Typography>
        <Button fullWidth size="small" component={Link} href="/assistente" sx={{ bgcolor: COLORS.white, fontSize: "0.75rem" }}>
          Falar com Assistente
        </Button>
      </Box>
    </Box>
  );
}
