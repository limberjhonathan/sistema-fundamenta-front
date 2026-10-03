"use client";

import { useEffect, useState } from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import NearMeOutlined from "@mui/icons-material/NearMeOutlined";
import { COLORS } from "@/styles/colors";
import ModelagemToolbar, { type ModelagemAba } from "./ModelagemToolbar";
import ModelagemCanvas from "./ModelagemCanvas";
import PainelPropriedades from "./PainelPropriedades";
import { XmlView, VersoesView } from "./ModelagemAlternativas";
import { useModelagemStore } from "./core/store/useModelagemStore";
import { useModelagemAcoes } from "./core/hooks/useModelagemAcoes";
import * as S from "./style";

const formatarHora = (data: Date) => data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function ModelagemPage() {
  const [aba, setAba] = useState<ModelagemAba>("diagrama");
  const [aviso, setAviso] = useState<string | null>(null);
  const { alterado, salvoEm } = useModelagemStore();
  const { redimensionar } = useModelagemAcoes();

  // O canvas fica oculto nas outras abas; ao voltar, recalcula o tamanho
  useEffect(() => {
    if (aba === "diagrama") redimensionar();
  }, [aba, redimensionar]);

  const statusSalvamento = alterado
    ? "Alterações não salvas"
    : salvoEm
      ? `Salvo às ${formatarHora(salvoEm)}`
      : "Nenhuma alteração";

  return (
    <Box sx={S.Page}>
      <ModelagemToolbar aba={aba} onAba={setAba} onAviso={setAviso} />

      <Box sx={S.Body}>
        <ModelagemCanvas visivel={aba === "diagrama"} />
        {aba === "xml" && <XmlView />}
        {aba === "versoes" && <VersoesView />}
        <PainelPropriedades />
      </Box>

      <Box sx={S.StatusBar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: COLORS.accent.green }} />
          Sistema Online
        </Box>
        <Typography sx={{ fontSize: "inherit", display: { xs: "none", sm: "block" } }}>Versão 2.4.1 (Draft)</Typography>
        <Typography
          sx={{
            fontSize: "inherit",
            ml: "auto",
            display: { xs: "none", sm: "block" },
            color: alterado ? COLORS.accent.orangeDark : "inherit",
          }}
        >
          {statusSalvamento}
        </Typography>
        <Button size="small" startIcon={<NearMeOutlined sx={{ fontSize: "14px !important" }} />} sx={{ fontSize: "0.75rem", ml: { xs: "auto", sm: 0 } }}>
          Enviar para Aprovação
        </Button>
      </Box>

      <Snackbar
        open={!!aviso}
        message={aviso}
        autoHideDuration={2500}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
