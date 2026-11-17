"use client";

import { Fragment } from "react";
import { Box, Divider, Typography } from "@mui/material";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import { AnimatePresence, motion } from "framer-motion";
import AnexoItem from "@/components/shared/AnexoItem";
import { AnexoStatus } from "@/enums";
import { COLORS } from "@/styles/colors";
import type { Anexo } from "@/types/anexo";
import { formatarTamanho } from "@/utils/anexo";

type AnexoListaProps = {
  anexos: Anexo[];
  onRemover?: (anexo: Anexo) => void;
  onTentarNovamente?: (anexo: Anexo) => void;
  /** Esconde o cabeçalho de progresso (ex.: na revisão). */
  semCabecalho?: boolean;
};

/** Lista de anexos num bloco único, com o progresso geral da leitura pela IA no cabeçalho. */
export default function AnexoLista({ anexos, onRemover, onTentarNovamente, semCabecalho = false }: AnexoListaProps) {
  if (!anexos.length) return null;

  const lidos = anexos.filter((a) => a.status === AnexoStatus.Lido).length;
  const comErro = anexos.filter((a) => a.status === AnexoStatus.Erro).length;
  const emLeitura = anexos.length - lidos - comErro;
  const total = anexos.reduce((s, a) => s + a.tamanho, 0);
  const pct = Math.round((lidos / anexos.length) * 100);

  const resumo = emLeitura
    ? `IA lendo ${emLeitura} ${emLeitura === 1 ? "arquivo" : "arquivos"}…`
    : comErro
      ? `${lidos} lidos · ${comErro} com erro`
      : anexos.length === 1
        ? "Pronto para usar"
        : `Todos os ${anexos.length} prontos para usar`;

  return (
    <Box sx={{ border: `1px solid ${COLORS.gray[200]}`, borderRadius: 3, bgcolor: COLORS.white, overflow: "hidden" }}>
      {!semCabecalho && (
        <Box sx={{ px: 2, py: 1.25, bgcolor: COLORS.gray[50], borderBottom: `1px solid ${COLORS.gray[200]}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: COLORS.gray[900] }}>
              {anexos.length} {anexos.length === 1 ? "arquivo" : "arquivos"}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[500] }}>{formatarTamanho(total)}</Typography>
            <Box sx={{ flex: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: emLeitura ? COLORS.primary[700] : comErro ? COLORS.accent.redDark : COLORS.accent.greenDark,
              }}
            >
              <AutoAwesomeOutlined sx={{ fontSize: 14 }} />
              {resumo}
            </Box>
          </Box>
          {/* Progresso geral: só aparece enquanto há leitura em andamento */}
          <Box sx={{ height: 3, mt: emLeitura ? 1 : 0, borderRadius: 3, bgcolor: COLORS.gray[200], overflow: "hidden", opacity: emLeitura ? 1 : 0, transition: "all 200ms ease" }}>
            <Box sx={{ height: "100%", width: `${pct}%`, bgcolor: COLORS.primary[500], transition: "width 400ms ease" }} />
          </Box>
        </Box>
      )}

      <AnimatePresence initial={false}>
        {anexos.map((a, i) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <Fragment>
              {i > 0 && <Divider sx={{ borderColor: COLORS.gray[100] }} />}
              <AnexoItem anexo={a} onRemover={onRemover} onTentarNovamente={onTentarNovamente} />
            </Fragment>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
