"use client";

import { Box, Button, Typography } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import TouchAppOutlined from "@mui/icons-material/TouchAppOutlined";
import KeyboardOutlined from "@mui/icons-material/KeyboardOutlined";
import { mockProcessoModelagem } from "@/mocks/modelagem";
import { BRAND, COLORS } from "@/styles/colors";
import { useModelagemStore } from "../../core/store/useModelagemStore";
import * as S from "../../style";

/** Painel quando nada está selecionado: dados do processo, números do diagrama e dicas. */
export default function PropriedadesProcesso() {
  const { contagem, problemas, metadados, setAtalhosAbertos } = useModelagemStore();
  const p = mockProcessoModelagem;
  const automatizaveis = Object.values(metadados).filter((m) => m.automatizavel).length;

  return (
    <>
      <Box sx={S.ElementoCabecalho}>
        <Box sx={S.ElementoIcone}>
          <i className="bpmn-icon-participant" />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.primary[600] }}>
            Processo
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.3 }}>{p.titulo}</Typography>
          <Typography sx={S.IdChip}>{p.codigo}</Typography>
        </Box>
      </Box>

      <Box sx={S.PainelSecao}>
        <Typography sx={S.SecaoTitulo}>
          <InfoOutlined /> Informações
        </Typography>
        {[
          ["Departamento", p.departamento],
          ["Macroprocesso", p.macroprocesso],
          ["Dono do processo", p.dono],
          ["Versão em edição", p.versao],
          ["Versão publicada", p.versaoPublicada],
        ].map(([label, valor]) => (
          <Box key={label} sx={S.InfoLinha}>
            <span>{label}</span>
            <span>{valor}</span>
          </Box>
        ))}
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mt: 1.5, lineHeight: 1.5 }}>
          <b>Objetivo:</b> {p.objetivo}
        </Typography>
      </Box>

      <Box sx={S.PainelSecao}>
        <Typography sx={S.SecaoTitulo}>
          <InsightsOutlined /> Este diagrama
        </Typography>
        <Box sx={S.Metricas}>
          {[
            { label: "Atividades", valor: contagem.atividades },
            { label: "Decisões", valor: contagem.gateways },
            { label: "Eventos", valor: contagem.eventos },
            { label: "Automatizáveis", valor: automatizaveis, destaque: true },
          ].map((m) => (
            <Box key={m.label} sx={{ ...S.Metrica, ...(m.destaque && { bgcolor: BRAND.dark, color: COLORS.white, borderColor: BRAND.dark }) }}>
              <Typography sx={{ ...S.MetricaValor, ...(m.destaque && { color: BRAND.lime }) }}>{m.valor}</Typography>
              <Typography sx={{ fontSize: "0.6875rem", opacity: 0.75 }}>{m.label}</Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={{ fontSize: "0.75rem", color: problemas.length ? COLORS.accent.orangeDark : COLORS.accent.greenDark, mt: 1.5 }}>
          {problemas.length ? `${problemas.length} ponto(s) de atenção na validação — veja no rodapé.` : "Sem problemas de validação."}
        </Typography>
      </Box>

      <Box sx={S.PainelSecao}>
        <Typography sx={S.SecaoTitulo}>
          <TouchAppOutlined /> Como editar
        </Typography>
        {[
          ["Adicionar", "Clique em um item da paleta e depois no canvas, ou arraste."],
          ["Conectar", "Selecione o elemento e arraste a seta do menu ao lado dele."],
          ["Trocar tipo", "Use o ícone de chave no menu do elemento, ou o campo Tipo aqui."],
          ["Renomear", "Duplo clique no elemento ou edite neste painel."],
        ].map(([acao, como]) => (
          <Box key={acao} sx={{ mb: 1.25 }}>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>{acao}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{como}</Typography>
          </Box>
        ))}
        <Button size="small" startIcon={<KeyboardOutlined />} onClick={() => setAtalhosAbertos(true)} sx={{ px: 0 }}>
          Ver todos os atalhos
        </Button>
      </Box>
    </>
  );
}
