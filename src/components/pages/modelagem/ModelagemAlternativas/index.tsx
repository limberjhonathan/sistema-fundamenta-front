"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import CompareArrowsRounded from "@mui/icons-material/CompareArrowsRounded";
import RestoreRounded from "@mui/icons-material/RestoreRounded";
import { mockVersoes } from "@/mocks/modelagem";
import { COLORS } from "@/styles/colors";
import { iniciais } from "@/utils/iniciais";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";
import * as S from "../style";

const COR_STATUS: Record<string, { bg: string; color: string }> = {
  Rascunho: { bg: COLORS.accent.orangeLight, color: COLORS.accent.orangeDark },
  Publicada: { bg: COLORS.accent.greenLight, color: COLORS.accent.greenDark },
  Arquivada: { bg: COLORS.gray[100], color: COLORS.gray[600] },
};

/** XML BPMN gerado a partir do diagrama atual (somente leitura), com numeração de linhas. */
export function XmlView() {
  const { obterXml, baixarArquivo } = useModelagemAcoes();
  const [xml, setXml] = useState("");
  const [copiado, setCopiado] = useState(false);
  const linhas = xml ? xml.split("\n") : [];

  useEffect(() => {
    obterXml().then(setXml);
  }, [obterXml]);

  const copiar = async () => {
    await navigator.clipboard.writeText(xml);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <Box sx={S.Alternativa}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Box sx={{ mr: "auto" }}>
          <Typography variant="h4">XML BPMN 2.0</Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
            {linhas.length} linhas · compatível com Camunda, Bizagi e outras ferramentas BPMN
          </Typography>
        </Box>
        <Button size="small" variant="outlined" startIcon={<ContentCopyRounded />} onClick={copiar} disabled={!xml}>
          {copiado ? "Copiado!" : "Copiar"}
        </Button>
        <Button size="small" variant="contained" startIcon={<FileDownloadOutlined />} onClick={baixarArquivo} disabled={!xml}>
          Baixar .bpmn
        </Button>
      </Box>
      <Box sx={S.XmlBloco}>
        <Box sx={S.XmlLinhas}>
          {linhas.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </Box>
        <Box component="pre" sx={{ m: 0, py: 2.5, px: 2, whiteSpace: "pre" }}>
          {xml || "Carregando..."}
        </Box>
      </Box>
    </Box>
  );
}

/** Linha do tempo das versões do processo. */
export function VersoesView() {
  return (
    <Box sx={S.Alternativa}>
      <Box sx={{ maxWidth: 820, mx: "auto" }}>
        <Typography variant="h4">Histórico de versões</Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary", mb: 3 }}>
          Cada envio para aprovação gera uma versão. A versão publicada é a que aparece no Portal.
        </Typography>

        {mockVersoes.map((v) => (
          <Box key={v.versao} sx={S.VersaoLinha(!!v.atual)}>
            <Box className="ponto" />
            <Card sx={{ flex: 1, p: 2, borderRadius: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: "0.875rem" }}>{v.versao}</Typography>
                  <Chip size="small" label={v.status} sx={{ height: 20, fontSize: "0.6875rem", fontWeight: 600, ...COR_STATUS[v.status] }} />
                  {v.atual && <Chip size="small" label="Você está aqui" variant="outlined" sx={{ height: 20, fontSize: "0.6875rem" }} />}
                </Box>
                <Typography sx={{ fontSize: "0.875rem" }}>{v.resumo}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: COLORS.primary[50],
                      color: COLORS.primary[700],
                      fontSize: "0.5625rem",
                      fontWeight: 700,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {iniciais(v.autor)}
                  </Box>
                  <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    {v.autor} · {v.data}
                  </Typography>
                </Box>
              </Box>
              {!v.atual && (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<CompareArrowsRounded />}>
                    Comparar
                  </Button>
                  <Button size="small" startIcon={<RestoreRounded />}>
                    Restaurar
                  </Button>
                </Box>
              )}
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
