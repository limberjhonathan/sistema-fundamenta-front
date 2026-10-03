"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import NearMeOutlined from "@mui/icons-material/NearMeOutlined";
import { COLORS } from "@/styles/colors";
import ModelagemToolbar, { type ModelagemAba } from "./ModelagemToolbar";
import ModelagemCanvas from "./ModelagemCanvas";
import PainelPropriedades from "./PainelPropriedades";
import { XmlView, VersoesView } from "./ModelagemAlternativas";
import * as S from "./style";

export default function ModelagemPage() {
  const [aba, setAba] = useState<ModelagemAba>("diagrama");
  const [selecionada, setSelecionada] = useState(true);

  return (
    <Box sx={S.Page}>
      <ModelagemToolbar aba={aba} onAba={setAba} />

      <Box sx={S.Body}>
        {aba === "diagrama" && <ModelagemCanvas selecionada={selecionada} onSelecionar={setSelecionada} />}
        {aba === "xml" && <XmlView />}
        {aba === "versoes" && <VersoesView />}
        <PainelPropriedades selecionada={selecionada} />
      </Box>

      <Box sx={S.StatusBar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: COLORS.accent.green }} />
          Sistema Online
        </Box>
        <Typography sx={{ fontSize: "inherit", display: { xs: "none", sm: "block" } }}>Versão 2.4.1 (Draft)</Typography>
        <Typography sx={{ fontSize: "inherit", ml: "auto", display: { xs: "none", sm: "block" } }}>Última alteração: há 2 minutos</Typography>
        <Button size="small" startIcon={<NearMeOutlined sx={{ fontSize: "14px !important" }} />} sx={{ fontSize: "0.75rem", ml: { xs: "auto", sm: 0 } }}>
          Enviar para Aprovação
        </Button>
      </Box>
    </Box>
  );
}
