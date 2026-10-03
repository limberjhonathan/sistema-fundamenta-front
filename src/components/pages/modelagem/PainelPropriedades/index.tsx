"use client";

import { useState } from "react";
import { Box, Chip, TextField, Typography } from "@mui/material";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import TouchAppOutlined from "@mui/icons-material/TouchAppOutlined";
import { COLORS } from "@/styles/colors";
import { useModelagemStore, type ElementoSelecionado } from "../core/store/useModelagemStore";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import { ehAtividade, nomeDoTipo } from "../core/utils/bpmnTipos";
import * as S from "../style";

const SUGESTOES = [
  { titulo: "Melhoria de Fluxo", texto: "O tempo médio de 'Analisar Documentação' é de 4h. Recomendo usar integração com OCR para reduzir para 15min." },
  { titulo: "Conformidade", texto: "Falta um evento de erro para o caso do Score Serasa ser negativo." },
];

const DICAS = [
  { acao: "Adicionar elemento", como: "Arraste da paleta à esquerda para o canvas" },
  { acao: "Ligar elementos", como: "Selecione um elemento e use a seta do menu ao lado dele" },
  { acao: "Renomear", como: "Dê duplo clique no elemento ou edite aqui no painel" },
  { acao: "Desfazer / Refazer", como: "Ctrl+Z / Ctrl+Y" },
  { acao: "Apagar", como: "Selecione e pressione Delete" },
];

/** Campos editáveis do elemento; remontado (via key) a cada novo elemento selecionado. */
function CamposElemento({ elemento }: { elemento: ElementoSelecionado }) {
  const { renomear, documentar } = useModelagemAcoes();
  const [nome, setNome] = useState(elemento.nome);
  const [documentacao, setDocumentacao] = useState(elemento.documentacao);

  const aplicarNome = () => nome !== elemento.nome && renomear(elemento.id, nome);
  const aplicarDocumentacao = () => documentacao !== elemento.documentacao && documentar(elemento.id, documentacao);

  return (
    <>
      <Box sx={S.PainelSecao}>
        <Chip size="small" label={nomeDoTipo(elemento.tipo)} sx={{ mb: 2, bgcolor: COLORS.primary[50], color: COLORS.primary[600] }} />
        <Typography sx={S.Label}>ID do Elemento</Typography>
        <TextField
          fullWidth
          size="small"
          value={elemento.id}
          slotProps={{ input: { readOnly: true, sx: { bgcolor: COLORS.gray[100], fontFamily: "ui-monospace, monospace" } } }}
          sx={{ mb: 2.5 }}
        />
        <Typography sx={S.Label}>Nome</Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Sem nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={aplicarNome}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              aplicarNome();
            }
          }}
        />
      </Box>

      {ehAtividade(elemento.tipo) && (
        <Box sx={S.PainelSecao}>
          <Typography variant="overline" sx={{ display: "block", mb: 1, color: COLORS.gray[700] }}>
            Configurações de IA
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.25,
              borderRadius: 1.5,
              bgcolor: COLORS.primary[50],
              border: `1px solid ${COLORS.primary[100]}`,
              color: COLORS.primary[600],
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <AutoAwesomeOutlined sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: "0.875rem" }}>Automação Sugerida</Typography>
            </Box>
            <Chip size="small" label="92% Match" sx={{ height: 20, fontSize: "0.625rem", bgcolor: COLORS.primary[600], color: COLORS.white }} />
          </Box>
          <Typography sx={{ fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600], mt: 1 }}>
            Esta tarefa pode ser automatizada usando processamento de linguagem natural (NLP).
          </Typography>
        </Box>
      )}

      <Box sx={S.PainelSecao}>
        <Typography variant="overline" sx={{ display: "block", mb: 1, color: COLORS.gray[700] }}>
          Documentação
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Descreva como esta etapa deve ser executada..."
          value={documentacao}
          onChange={(e) => setDocumentacao(e.target.value)}
          onBlur={aplicarDocumentacao}
        />
      </Box>
    </>
  );
}

export default function PainelPropriedades() {
  const selecionado = useModelagemStore((s) => s.selecionado);

  return (
    <Box component="aside" sx={S.Painel}>
      <Box sx={{ ...S.PainelSecao, py: 1.5 }}>
        <Typography variant="overline" sx={{ fontSize: "0.8125rem" }}>
          Propriedades
        </Typography>
      </Box>

      {selecionado ? (
        <CamposElemento key={selecionado.id + selecionado.nome + selecionado.documentacao} elemento={selecionado} />
      ) : (
        <Box sx={S.PainelSecao}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: COLORS.gray[600] }}>
            <TouchAppOutlined sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: "0.875rem" }}>Selecione um elemento para editar.</Typography>
          </Box>
          <Typography variant="overline" sx={{ display: "block", mb: 1, color: COLORS.gray[700] }}>
            Como usar
          </Typography>
          {DICAS.map((d) => (
            <Box key={d.acao} sx={{ mb: 1.25 }}>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>{d.acao}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{d.como}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ px: 2, py: 2, mt: "auto", bgcolor: COLORS.gray[50] }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
          <ChatBubbleOutlineRounded sx={{ fontSize: 16 }} />
          <Typography variant="overline">Sugestões da IA</Typography>
        </Box>
        {SUGESTOES.map((s) => (
          <Box key={s.titulo} sx={{ p: 1.25, mb: 1, borderRadius: 1.5, bgcolor: COLORS.white, border: `1px solid ${COLORS.gray[200]}` }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>{s.titulo}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{s.texto}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
