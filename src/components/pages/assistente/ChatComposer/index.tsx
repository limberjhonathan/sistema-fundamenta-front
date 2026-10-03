"use client";

import { FormEvent, useState } from "react";
import { Box, Chip, IconButton, InputBase, Typography } from "@mui/material";
import AttachFileRounded from "@mui/icons-material/AttachFileRounded";
import MicNoneRounded from "@mui/icons-material/MicNoneRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import { mockSugestoesRapidas } from "@/mocks/assistente";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export default function ChatComposer({ onEnviar }: { onEnviar: (texto: string) => void }) {
  const [texto, setTexto] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onEnviar(texto);
    setTexto("");
  };

  return (
    <Box sx={S.Composer}>
      <Box sx={{ display: "flex", gap: 1, mb: 1.25, flexWrap: "wrap" }}>
        {mockSugestoesRapidas.map((s) => (
          <Chip key={s} label={s} variant="outlined" onClick={() => onEnviar(s)} sx={{ bgcolor: COLORS.white, fontWeight: 500, borderRadius: 999 }} />
        ))}
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={S.ComposerBox}>
        <IconButton size="small">
          <AttachFileRounded fontSize="small" />
        </IconButton>
        <InputBase
          fullWidth
          placeholder="Pergunte sobre processos, manuais ou normas..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          sx={{ fontSize: "0.9375rem" }}
        />
        <IconButton size="small">
          <MicNoneRounded fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          type="submit"
          disabled={!texto.trim()}
          sx={{ bgcolor: texto.trim() ? COLORS.primary[600] : COLORS.gray[100], color: COLORS.white, borderRadius: 1.5, "&:hover": { bgcolor: COLORS.primary[700] } }}
        >
          <SendRounded fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1.25, color: COLORS.gray[500] }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ScheduleRounded sx={{ fontSize: 12 }} />
          <Typography variant="overline" sx={{ fontSize: "0.625rem" }}>
            Respostas em tempo real
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <VerifiedUserOutlined sx={{ fontSize: 12, color: COLORS.accent.green }} />
          <Typography variant="overline" sx={{ fontSize: "0.625rem" }}>
            Dados criptografados
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
