"use client";

import { useState } from "react";
import { Box, Chip, MenuItem, Switch, TextField, Tooltip, Typography } from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import NotesRounded from "@mui/icons-material/NotesRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import { COLORS } from "@/styles/colors";
import { useModelagemAcoes } from "../../core/hooks/useModelagemAcoes";
import { METADADOS_VAZIOS, useModelagemStore, type ElementoSelecionado } from "../../core/store/useModelagemStore";
import { TIPOS_GATEWAY, TIPOS_TAREFA, ehAtividade, ehGateway, iconeDoTipo, nomeDoTipo } from "../../core/utils/bpmnTipos";
import * as S from "../../style";

/** Campos do elemento selecionado; remontado (via key) a cada novo elemento. */
export default function PropriedadesElemento({ elemento }: { elemento: ElementoSelecionado }) {
  const { renomear, documentar, substituirTipo } = useModelagemAcoes();
  const { metadados, setMetadados } = useModelagemStore();
  const [nome, setNome] = useState(elemento.nome);
  const [documentacao, setDocumentacao] = useState(elemento.documentacao);

  const meta = { ...METADADOS_VAZIOS, ...metadados[elemento.id] };
  const atividade = ehAtividade(elemento.tipo);
  const tiposTroca = atividade && elemento.tipo !== "bpmn:SubProcess" ? TIPOS_TAREFA : ehGateway(elemento.tipo) ? TIPOS_GATEWAY : null;

  const aplicarNome = () => nome !== elemento.nome && renomear(elemento.id, nome);
  const aplicarDocumentacao = () => documentacao !== elemento.documentacao && documentar(elemento.id, documentacao);

  return (
    <>
      <Box sx={S.ElementoCabecalho}>
        <Box sx={S.ElementoIcone}>
          <i className={iconeDoTipo(elemento.tipo)} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.primary[600] }}>
            {nomeDoTipo(elemento.tipo)}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.3 }} noWrap>
            {elemento.nome || "Sem nome"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={S.IdChip} noWrap>
              {elemento.id}
            </Typography>
            <Tooltip title="Copiar ID">
              <ContentCopyRounded
                sx={{ fontSize: 12, color: COLORS.gray[400], cursor: "pointer" }}
                onClick={() => navigator.clipboard.writeText(elemento.id)}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box sx={S.PainelSecao}>
        <Typography sx={S.SecaoTitulo}>
          <TuneRounded /> Geral
        </Typography>

        <Typography sx={S.Label}>Nome</Typography>
        <TextField
          fullWidth
          size="small"
          multiline
          placeholder="Dê um nome claro, com verbo no infinitivo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={aplicarNome}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              aplicarNome();
            }
          }}
          sx={{ ...S.Campo, mb: 2 }}
        />

        {tiposTroca && (
          <>
            <Typography sx={S.Label}>Tipo</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={elemento.tipo}
              onChange={(e) => substituirTipo(elemento.id, e.target.value)}
              sx={{ ...S.Campo, mb: 2 }}
              slotProps={{
                select: {
                  renderValue: (v) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <i className={iconeDoTipo(v as string)} style={{ fontSize: 18 }} />
                      {nomeDoTipo(v as string)}
                    </Box>
                  ),
                },
              }}
            >
              {tiposTroca.map((t) => (
                <MenuItem key={t} value={t} sx={{ gap: 1, fontSize: "0.8125rem" }}>
                  <i className={iconeDoTipo(t)} style={{ fontSize: 18 }} />
                  {nomeDoTipo(t)}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        <Box sx={S.InfoLinha}>
          <span>Responsável (raia)</span>
          <span>{elemento.raia ?? "Sem raia"}</span>
        </Box>
      </Box>

      {atividade && (
        <Box sx={S.PainelSecao}>
          <Typography sx={S.SecaoTitulo}>
            <ScheduleRounded /> Execução
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
            <Box>
              <Typography sx={S.Label}>Prazo (SLA)</Typography>
              <TextField
                size="small"
                placeholder="Ex.: 24h úteis"
                value={meta.sla}
                onChange={(e) => setMetadados(elemento.id, { sla: e.target.value })}
                sx={S.Campo}
              />
            </Box>
            <Box>
              <Typography sx={S.Label}>Sistema</Typography>
              <TextField
                size="small"
                placeholder="Ex.: ERP"
                value={meta.sistema}
                onChange={(e) => setMetadados(elemento.id, { sistema: e.target.value })}
                sx={S.Campo}
              />
            </Box>
          </Box>

          <Box sx={S.AutomacaoCard(meta.automatizavel)}>
            <AutoAwesomeOutlined sx={{ fontSize: 18, color: COLORS.primary[600], mt: 0.25 }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>Candidata à automação</Typography>
                {meta.automatizavel && (
                  <Chip size="small" label="IA: 92%" sx={{ height: 18, fontSize: "0.625rem", fontWeight: 700, bgcolor: COLORS.primary[600], color: COLORS.white }} />
                )}
              </Box>
              <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>
                Marque para incluir esta etapa no mapa de automações do departamento.
              </Typography>
            </Box>
            <Switch
              size="small"
              checked={meta.automatizavel}
              onChange={(e) => setMetadados(elemento.id, { automatizavel: e.target.checked })}
              slotProps={{ input: { "aria-label": "Candidata à automação" } }}
            />
          </Box>
        </Box>
      )}

      <Box sx={S.PainelSecao}>
        <Typography sx={S.SecaoTitulo}>
          <NotesRounded /> Documentação
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder="Como esta etapa deve ser executada, regras e exceções..."
          value={documentacao}
          onChange={(e) => setDocumentacao(e.target.value)}
          onBlur={aplicarDocumentacao}
          sx={S.Campo}
        />
        <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary", mt: 0.75 }}>
          Vai para o XML BPMN e aparece no Portal para quem consulta o processo.
        </Typography>
      </Box>
    </>
  );
}
