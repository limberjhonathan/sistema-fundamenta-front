"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Chip, Divider, InputBase, Typography } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import BookmarksOutlined from "@mui/icons-material/BookmarksOutlined";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import IconBox from "@/components/ui/IconBox";
import { mockSugestoesPortal } from "@/mocks/portal";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function PortalHero() {
  const router = useRouter();
  const [busca, setBusca] = useState("");

  const pesquisar = (e: FormEvent) => {
    e.preventDefault();
    router.push("/busca");
  };

  return (
    <>
      <Box sx={S.Hero}>
        <Typography variant="h1" sx={{ color: COLORS.white }}>
          Portal de Conhecimento
        </Typography>
        <Typography sx={{ mt: 0.5, maxWidth: 520, color: "rgba(255,255,255,0.85)", fontSize: "1.05rem" }}>
          Explore, aprenda e gerencie os processos fundamentais da nossa organização.
        </Typography>

        <Box component="form" onSubmit={pesquisar} sx={S.HeroSearch}>
          <SearchRounded sx={{ color: COLORS.gray[500] }} />
          <InputBase
            fullWidth
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="O que você deseja encontrar hoje? (ex: Reembolso, Onboarding...)"
            sx={{ fontSize: "0.875rem" }}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: COLORS.primary[800] }}>
            Pesquisar
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: "0.75rem", opacity: 0.85 }}>Sugestões:</Typography>
          {mockSugestoesPortal.map((s) => (
            <Chip key={s} label={s} clickable onClick={() => setBusca(s)} sx={S.SugestaoChip} />
          ))}
        </Box>
      </Box>

      <Box sx={S.InfoBar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <IconBox size={28}>
            <BookmarksOutlined />
          </IconBox>
          <Box>
            <Typography sx={{ fontSize: "0.5625rem", fontWeight: 600, color: COLORS.gray[500] }}>SEUS FAVORITOS</Typography>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>12 Processos</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <IconBox size={28} color={COLORS.accent.green} bg={COLORS.accent.greenLight}>
            <ScheduleRounded />
          </IconBox>
          <Box>
            <Typography sx={{ fontSize: "0.5625rem", fontWeight: 600, color: COLORS.gray[500] }}>ÚLTIMA LEITURA</Typography>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>Onboarding TI</Typography>
          </Box>
        </Box>
        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button size="small" variant="outlined" startIcon={<FilterAltOutlined />}>
            Filtrar Tudo
          </Button>
          <Button size="small" variant="outlined" startIcon={<LocalOfferOutlined />}>
            Tags Populares
          </Button>
        </Box>
      </Box>
    </>
  );
}
