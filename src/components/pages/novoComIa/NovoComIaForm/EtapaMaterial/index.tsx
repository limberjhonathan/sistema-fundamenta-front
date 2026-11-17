"use client";

import { useState } from "react";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import UploadArea from "@/components/shared/UploadArea";
import AnexoLista from "@/components/shared/AnexoLista";
import { useAnexos } from "@/components/shared/UploadArea/core/hooks/useAnexos";
import { useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { COLORS } from "@/styles/colors";
import type { Anexo } from "@/types/anexo";
import * as S from "../../style";

type Removido = { anexo: Anexo; indice: number };

function Opcional() {
  return (
    <Box component="span" sx={S.Opcional}>
      Opcional
    </Box>
  );
}

/** Etapa opcional: arquivos e anotações que a IA lê como base para montar o processo. */
export default function EtapaMaterial() {
  const { dados, setCampo, setAnexos } = useNovoComIaStore();
  const { adicionar, remover, restaurar, descartar, tentarNovamente } = useAnexos(setAnexos);
  const [removido, setRemovido] = useState<Removido | null>(null);
  const temArquivos = dados.anexos.length > 0;

  const handleRemover = (anexo: Anexo) => {
    if (removido) descartar(removido.anexo); // a remoção anterior vira definitiva
    setRemovido(remover(anexo, dados.anexos));
  };

  const fecharAviso = (desfazer: boolean) => {
    if (!removido) return;
    if (desfazer) restaurar(removido);
    else descartar(removido.anexo);
    setRemovido(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography sx={{ ...S.Label, mb: 0 }}>Arquivos</Typography>
        <Opcional />
      </Box>

      <Box sx={{ display: "grid", gap: 1.5 }}>
        <AnexoLista anexos={dados.anexos} onRemover={handleRemover} onTentarNovamente={tentarNovamente} />
        <UploadArea onArquivos={adicionar} compacto={temArquivos} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3, mb: 1 }}>
        <Typography sx={{ ...S.Label, mb: 0 }}>Anotações para a IA</Typography>
        <Opcional />
      </Box>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder={'Contexto que não está nos arquivos. Ex: "No vídeo, ignore a parte do sistema antigo" ou "a aba 2 da planilha está desatualizada".'}
        value={dados.anotacoes}
        onChange={(e) => setCampo("anotacoes", e.target.value)}
      />
      <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[500], mt: 1 }}>
        Sem arquivos? Tudo bem — a IA usa a descrição da etapa anterior.
      </Typography>

      <Snackbar
        open={!!removido}
        autoHideDuration={5000}
        onClose={(_, motivo) => motivo !== "clickaway" && fecharAviso(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={removido ? `"${removido.anexo.nome}" removido` : ""}
        action={
          <Button size="small" onClick={() => fecharAviso(true)} sx={{ color: COLORS.accent.lime, fontWeight: 700 }}>
            Desfazer
          </Button>
        }
        slotProps={{ content: { sx: { bgcolor: COLORS.gray[900], borderRadius: 2, "& .MuiSnackbarContent-message": { maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } } } }}
      />
    </>
  );
}
