"use client";

import { useMemo } from "react";
import { Box, Chip, Pagination, Typography } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { mockResultadosBusca } from "@/mocks/busca";
import { COLORS } from "@/styles/colors";
import BuscaSearchBar from "./BuscaSearchBar";
import ResumoIa from "./ResumoIa";
import ResultadoCard from "./ResultadoCard";
import BuscaFiltros from "./BuscaFiltros";
import { useBuscaStore } from "./core/store/useBuscaStore";
import * as S from "./style";

export default function BuscaPage() {
  const { termo, tipos, departamentos, pagina, setPagina } = useBuscaStore();

  const resultados = useMemo(
    () =>
      mockResultadosBusca
        .filter((r) => tipos.includes(r.tipo))
        .filter((r) => departamentos.length === 0 || departamentos.includes(r.departamento)),
    [tipos, departamentos],
  );

  return (
    <Box sx={S.Page}>
      <Box sx={S.Main}>
        <BuscaSearchBar />

        <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 3, gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="h2">Resultados da Busca</Typography>
              <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[600] }}>
                Encontramos <b>148 resultados</b> para &quot;<i>{termo}</i>&quot;
              </Typography>
            </Box>
            <Chip
              size="small"
              icon={<InfoOutlined />}
              label="Pesquisa avançada ativa"
              sx={{ bgcolor: COLORS.primary[50], color: COLORS.primary[600], "& .MuiChip-icon": { color: "inherit" } }}
            />
          </Box>

          <ResumoIa termo={termo} />

          {resultados.map((r) => (
            <ResultadoCard key={r.id} resultado={r} />
          ))}
          {resultados.length === 0 && (
            <Typography sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>Nenhum resultado para os filtros selecionados.</Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination count={15} page={pagina} onChange={(_, p) => setPagina(p)} shape="rounded" color="primary" />
          </Box>
        </Box>
      </Box>

      <BuscaFiltros />
    </Box>
  );
}
