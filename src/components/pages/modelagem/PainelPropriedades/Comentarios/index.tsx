"use client";

import { useState } from "react";
import { Avatar, Box, Chip, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SendRounded from "@mui/icons-material/SendRounded";
import { mockComentarios } from "@/mocks/modelagem";
import { mockUser } from "@/mocks/user";
import { COLORS } from "@/styles/colors";
import { iniciais } from "@/utils/iniciais";
import { useModelagemStore } from "../../core/store/useModelagemStore";
import * as S from "../../style";

/** Conversa da equipe sobre o processo; o comentário é vinculado ao elemento selecionado. */
export default function Comentarios() {
  const selecionado = useModelagemStore((s) => s.selecionado);
  const [lista, setLista] = useState(mockComentarios);
  const [texto, setTexto] = useState("");

  const enviar = () => {
    if (!texto.trim()) return;
    setLista((l) => [
      { id: `c${Date.now()}`, autor: mockUser.nome, quando: "Agora", texto: texto.trim(), elemento: selecionado?.nome || "Processo" },
      ...l,
    ]);
    setTexto("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.gray[200]}` }}>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder={selecionado?.nome ? `Comentar em “${selecionado.nome}”...` : "Comentar no processo..."}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
          sx={S.Campo}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={enviar} disabled={!texto.trim()} aria-label="Enviar comentário">
                    <SendRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ px: 2 }}>
        {lista.map((c) => (
          <Box key={c.id} sx={S.ComentarioCard}>
            <Avatar sx={{ width: 30, height: 30, fontSize: "0.6875rem", fontWeight: 700, bgcolor: COLORS.primary[50], color: COLORS.primary[700] }}>
              {iniciais(c.autor)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>{c.autor}</Typography>
                <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{c.quando}</Typography>
              </Box>
              <Chip size="small" label={c.elemento} sx={{ height: 18, fontSize: "0.625rem", my: 0.5, bgcolor: COLORS.gray[100] }} />
              <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[700], lineHeight: 1.5 }}>{c.texto}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
