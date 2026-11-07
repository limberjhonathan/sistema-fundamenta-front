"use client";

import { Fragment } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { useModelagemStore } from "../core/store/useModelagemStore";
import { GRUPOS_PALETA, type ItemPaleta } from "../core/utils/paleta";
import * as S from "../style";

function Dica({ item }: { item: ItemPaleta }) {
  return (
    <Box sx={S.PaletaTooltip}>
      <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>
        {item.titulo}
        {item.tipo === "ferramenta" && item.atalho && (
          <Box component="span" sx={{ ml: 1, opacity: 0.6, fontFamily: "ui-monospace, monospace" }}>
            {item.atalho}
          </Box>
        )}
      </Typography>
      {item.tipo === "criar" && (
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.8 }}>{item.descricao}. Clique ou arraste para o canvas.</Typography>
      )}
    </Box>
  );
}

/** Paleta vertical própria: ferramentas e elementos BPMN agrupados, com ícones oficiais do bpmn-font. */
export default function ModelagemPaleta() {
  const { pronto, ativarFerramenta, criar } = useModelagemAcoes();
  const ferramenta = useModelagemStore((s) => s.ferramenta);

  if (!pronto) return null;

  return (
    <Box sx={S.Paleta} role="toolbar" aria-label="Paleta de elementos BPMN">
      {GRUPOS_PALETA.map((grupo, gi) => (
        <Fragment key={grupo.titulo}>
          {gi > 0 && <Box sx={S.PaletaSeparador} />}
          {grupo.itens.map((item) => {
            const ativo = item.tipo === "ferramenta" && ferramenta === item.ferramenta;
            const acionar = (e: React.MouseEvent | React.DragEvent) => {
              if (item.tipo === "ferramenta") ativarFerramenta(item.ferramenta, e.nativeEvent as MouseEvent);
              else criar(item.bpmn, e.nativeEvent);
            };
            return (
              <Tooltip key={item.id} title={<Dica item={item} />} placement="right" arrow>
                <Box
                  role="button"
                  aria-label={item.titulo}
                  aria-pressed={item.tipo === "ferramenta" ? ativo : undefined}
                  draggable={item.tipo === "criar"}
                  onClick={acionar}
                  onDragStart={item.tipo === "criar" ? acionar : undefined}
                  sx={S.PaletaItem(ativo)}
                >
                  <i className={item.icone} />
                </Box>
              </Tooltip>
            );
          })}
        </Fragment>
      ))}
    </Box>
  );
}
