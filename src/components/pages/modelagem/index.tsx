"use client";

import { useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import ModelagemHeader from "./ModelagemHeader";
import ModelagemCanvas from "./ModelagemCanvas";
import PainelPropriedades from "./PainelPropriedades";
import ModelagemStatusBar from "./ModelagemStatusBar";
import AtalhosDialog from "./AtalhosDialog";
import { XmlView, VersoesView } from "./ModelagemAlternativas";
import { useModelagemStore } from "./core/store/useModelagemStore";
import { useModelagemAcoes } from "./core/hooks/useModelagemAcoes";
import * as S from "./style";

export default function ModelagemPage() {
  const [aviso, setAviso] = useState<string | null>(null);
  const { aba, painelAberto } = useModelagemStore();
  const { redimensionar, ajustarTela } = useModelagemAcoes();

  // O canvas muda de tamanho ao voltar das outras abas e ao abrir/fechar o painel
  // (espera a transição do grid terminar antes de recalcular e reenquadrar)
  useEffect(() => {
    if (aba !== "diagrama") return;
    const t = setTimeout(() => {
      redimensionar();
      ajustarTela();
    }, 220);
    return () => clearTimeout(t);
  }, [aba, painelAberto, redimensionar, ajustarTela]);

  return (
    <Box sx={S.Page}>
      <ModelagemHeader onAviso={setAviso} />

      <Box sx={S.Body(painelAberto)}>
        <ModelagemCanvas visivel={aba === "diagrama"} />
        {aba === "xml" && <XmlView />}
        {aba === "versoes" && <VersoesView />}
        <PainelPropriedades onAviso={setAviso} />
      </Box>

      <ModelagemStatusBar />
      <AtalhosDialog />

      <Snackbar
        open={!!aviso}
        message={aviso}
        autoHideDuration={3000}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
