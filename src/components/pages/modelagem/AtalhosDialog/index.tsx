"use client";

import { Fragment } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useModelagemStore } from "../core/store/useModelagemStore";
import { ATALHOS } from "../core/utils/paleta";
import * as S from "../style";

export default function AtalhosDialog() {
  const { atalhosAbertos, setAtalhosAbertos } = useModelagemStore();

  return (
    <Dialog open={atalhosAbertos} onClose={() => setAtalhosAbertos(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ flex: 1 }}>
          Atalhos de teclado
        </Typography>
        <IconButton size="small" onClick={() => setAtalhosAbertos(false)} aria-label="Fechar">
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, pb: 3 }}>
        {ATALHOS.map((g) => (
          <Box key={g.grupo}>
            <Typography sx={S.SecaoTitulo}>{g.grupo}</Typography>
            {g.itens.map((a) => (
              <Box key={a.acao} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 0.75 }}>
                <Typography sx={{ fontSize: "0.8125rem" }}>{a.acao}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {a.teclas.map((t, i) => (
                    <Fragment key={t}>
                      {i > 0 && <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>+</Typography>}
                      <Box sx={S.Tecla}>{t}</Box>
                    </Fragment>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
