"use client";

import { MouseEvent, useState } from "react";
import { Box, Button, Chip, CircularProgress, Collapse, IconButton, LinearProgress, Tooltip, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import IconBox from "@/components/ui/IconBox";
import { ICONE_ANEXO } from "@/components/shared/UploadArea/icones";
import { AnexoStatus } from "@/enums";
import { TIPO_ANEXO } from "@/status";
import { COLORS } from "@/styles/colors";
import type { Anexo } from "@/types/anexo";
import { formatarDuracao, formatarTamanho } from "@/utils/anexo";
import * as S from "./style";

type AnexoItemProps = {
  anexo: Anexo;
  onRemover?: (anexo: Anexo) => void;
  onTentarNovamente?: (anexo: Anexo) => void;
};

/** Só a troca de status é anunciada ao leitor de tela — o progresso em % seria ruído. */
const ANUNCIO: Record<AnexoStatus, string> = {
  [AnexoStatus.Enviando]: "Enviando",
  [AnexoStatus.Analisando]: "IA lendo o arquivo",
  [AnexoStatus.Lido]: "Lido pela IA",
  [AnexoStatus.Erro]: "Erro na leitura",
};

const parar =(fn: () => void) => (e: MouseEvent) => {
  e.stopPropagation();
  fn();
};

/** Uma linha da lista de anexos: o que é o arquivo, em que ponto está a leitura e o que a IA entendeu dele. */
export default function AnexoItem({ anexo, onRemover, onTentarNovamente }: AnexoItemProps) {
  const [aberto, setAberto] = useState(false);
  const tipo = TIPO_ANEXO[anexo.tipo];
  const lido = anexo.status === AnexoStatus.Lido && !!anexo.resumoIa;
  const alternar = () => lido && setAberto((v) => !v);

  const detalhes = [tipo.label, formatarTamanho(anexo.tamanho), anexo.duracao ? formatarDuracao(anexo.duracao) : null].filter(Boolean);

  const meta = () => {
    switch (anexo.status) {
      case AnexoStatus.Enviando:
        return (
          <>
            <Box sx={S.Meta}>
              <span>Enviando</span>
              <span className="ponto" />
              <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {anexo.progresso}%
              </Box>
            </Box>
            <LinearProgress variant="determinate" value={anexo.progresso} sx={S.Barra} aria-label={`Enviando ${anexo.nome}`} />
          </>
        );
      case AnexoStatus.Analisando:
        return (
          <>
            <Box sx={{ ...S.Meta, color: COLORS.primary[700] }}>
              <AutoAwesomeOutlined sx={{ fontSize: 13 }} />
              <span>{tipo.leitura}</span>
            </Box>
            <LinearProgress sx={S.Barra} aria-label={`IA lendo ${anexo.nome}`} />
          </>
        );
      case AnexoStatus.Erro:
        return <Box sx={{ ...S.Meta, color: COLORS.accent.redDark }}>{anexo.erro ?? "Falha ao ler o arquivo."}</Box>;
      default:
        return (
          <Box sx={S.Meta}>
            {detalhes.map((d, i) => (
              <Box key={d} component="span" sx={{ display: "contents" }}>
                {i > 0 && <span className="ponto" />}
                <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                  {d}
                </Box>
              </Box>
            ))}
            {anexo.resumoIa?.destaques[0] && (
              <Box component="span" sx={{ display: { xs: "none", sm: "contents" } }}>
                <span className="ponto" />
                <Box component="span" sx={{ color: COLORS.primary[700], fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {anexo.resumoIa.destaques[0]}
                </Box>
              </Box>
            )}
          </Box>
        );
    }
  };

  const indicador = () => {
    switch (anexo.status) {
      case AnexoStatus.Lido:
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.accent.greenDark, fontSize: "0.75rem", fontWeight: 600 }}>
            <CheckCircleRounded sx={{ fontSize: 18 }} />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Lido
            </Box>
          </Box>
        );
      case AnexoStatus.Erro:
        return onTentarNovamente ? (
          <Button size="small" color="error" startIcon={<ReplayRounded />} onClick={parar(() => onTentarNovamente(anexo))} sx={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
            Tentar novamente
          </Button>
        ) : (
          <ErrorOutlineRounded sx={{ fontSize: 18, color: COLORS.accent.red }} />
        );
      default:
        return <CircularProgress size={16} thickness={5} sx={{ color: COLORS.primary[500] }} />;
    }
  };

  return (
    <Box>
      <Box sx={S.Linha(lido, aberto)} onClick={alternar}>
        {anexo.previewUrl ? (
          <Box component="img" src={anexo.previewUrl} alt="" sx={S.Miniatura} />
        ) : (
          <IconBox size={40} color={tipo.color} bg={tipo.bg}>
            {ICONE_ANEXO[anexo.tipo]}
          </IconBox>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap title={anexo.nome} sx={{ fontSize: "0.875rem", fontWeight: 600, color: COLORS.gray[900], mb: 0.25 }}>
            {anexo.nome}
          </Typography>
          {meta()}
          <Box component="span" aria-live="polite" sx={S.SoLeitor}>
            {ANUNCIO[anexo.status]}
          </Box>
        </Box>

        {indicador()}

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
          {onRemover && (
            <Tooltip title="Remover">
              <IconButton className="acoes" size="small" aria-label={`Remover ${anexo.nome}`} onClick={parar(() => onRemover(anexo))} sx={{ color: COLORS.gray[500] }}>
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {lido && (
            <IconButton
              size="small"
              aria-expanded={aberto}
              aria-label={aberto ? "Ocultar o que a IA leu" : "Ver o que a IA leu"}
              onClick={parar(alternar)}
              sx={{ color: COLORS.gray[500] }}
            >
              <ExpandMoreRounded sx={{ transform: aberto ? "rotate(180deg)" : "none", transition: "transform 200ms ease" }} />
            </IconButton>
          )}
        </Box>
      </Box>

      {anexo.resumoIa && (
        <Collapse in={aberto} unmountOnExit>
          <Box sx={S.Resumo}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75, color: COLORS.primary[700] }}>
              <AutoAwesomeOutlined sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>O que a IA entendeu</Typography>
            </Box>
            <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.55, color: COLORS.gray[700], mb: 1.25 }}>{anexo.resumoIa.texto}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {anexo.resumoIa.destaques.map((d) => (
                <Chip key={d} label={d} size="small" sx={S.Destaque} />
              ))}
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
