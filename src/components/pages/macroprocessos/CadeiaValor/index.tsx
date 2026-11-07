"use client";

import { Box, ButtonBase, Card, Typography } from "@mui/material";
import { TipoMacroprocesso } from "@/enums";
import { TIPO_MACROPROCESSO } from "@/status";
import { BRAND, COLORS } from "@/styles/colors";
import { useMacroprocessos } from "../core/hooks/useMacroprocessos";
import { useMacroprocessosStore } from "../core/store/useMacroprocessosStore";
import * as S from "../style";

/**
 * Mapa da cadeia de valor: gestão no topo, finalísticos em setas no meio (do pedido à entrega)
 * e suporte na base. Clicar em um item abre o macroprocesso na lista abaixo.
 */
export default function CadeiaValor() {
  const { cadeia } = useMacroprocessos();
  const { expandidoId, focar } = useMacroprocessosStore();

  const abrir = (id: string) => {
    focar(id);
    // Aguarda a lista renderizar o item expandido antes de rolar até ele
    requestAnimationFrame(() => document.getElementById(`macro-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const faixa = (tipo: TipoMacroprocesso.Gestao | TipoMacroprocesso.Suporte, escuro: boolean) => (
    <Box sx={S.Faixa(escuro ? BRAND.dark : COLORS.primary[50], escuro ? COLORS.white : COLORS.primary[700])}>
      <Typography sx={S.FaixaTitulo}>Processos de {TIPO_MACROPROCESSO[tipo].label.toLowerCase()}</Typography>
      <Box sx={S.FaixaItens}>
        {cadeia[tipo].map((m) => (
          <ButtonBase key={m.id} sx={S.Pilula(expandidoId === m.id, escuro)} onClick={() => abrir(m.id)}>
            {m.nome}
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );

  return (
    <Card sx={S.CadeiaCard}>
      <Box sx={S.CadeiaHeader}>
        <Box>
          <Typography variant="h3">Cadeia de valor</Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary", mt: 0.25 }}>
            Como os macroprocessos se conectam para entregar valor ao cliente. Clique em um item para ver os detalhes.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {Object.values(TipoMacroprocesso).map((t) => (
            <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "0.75rem", color: COLORS.gray[600] }}>
              <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: TIPO_MACROPROCESSO[t].bg, border: `1px solid ${TIPO_MACROPROCESSO[t].border}` }} />
              {TIPO_MACROPROCESSO[t].label}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={S.CadeiaCorpo}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faixa(TipoMacroprocesso.Gestao, true)}

          <Box sx={{ display: "flex", gap: { xs: 1, sm: 0.5 }, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
            {cadeia[TipoMacroprocesso.Finalistico].map((m, i) => (
              <ButtonBase key={m.id} sx={S.Chevron(expandidoId === m.id, i === 0)} onClick={() => abrir(m.id)}>
                <Box>
                  <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, opacity: 0.7, letterSpacing: "0.06em" }}>
                    ETAPA {i + 1}
                  </Typography>
                  {m.nome}
                </Box>
              </ButtonBase>
            ))}
          </Box>

          {faixa(TipoMacroprocesso.Suporte, false)}
        </Box>

        <Box sx={S.Cliente}>Valor entregue ao cliente</Box>
      </Box>
    </Card>
  );
}
