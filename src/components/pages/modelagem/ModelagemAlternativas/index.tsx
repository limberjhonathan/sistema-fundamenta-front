"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import { COLORS } from "@/styles/colors";
import { useModelagemAcoes } from "../core/hooks/useModelagemAcoes";

const VERSOES = [
  { versao: "v2.4.1", status: "Draft", autor: "João Duarte", data: "Hoje, 14:32" },
  { versao: "v2.4.0", status: "Publicada", autor: "Mariana Costa", data: "12/05/2024" },
  { versao: "v2.3.0", status: "Arquivada", autor: "Carlos Mendes", data: "02/03/2024" },
];

/** XML BPMN gerado a partir do diagrama atual (somente leitura). */
export function XmlView() {
  const { obterXml, baixarArquivo } = useModelagemAcoes();
  const [xml, setXml] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    obterXml().then(setXml);
  }, [obterXml]);

  const copiar = async () => {
    await navigator.clipboard.writeText(xml);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <Box sx={{ p: 3, overflow: "auto", bgcolor: COLORS.gray[50], minHeight: 0 }}>
      <Box sx={{ display: "flex", gap: 1, mb: 1.5, justifyContent: "flex-end" }}>
        <Button size="small" variant="outlined" startIcon={<ContentCopyRounded />} onClick={copiar} disabled={!xml}>
          {copiado ? "Copiado!" : "Copiar"}
        </Button>
        <Button size="small" variant="outlined" startIcon={<FileDownloadOutlined />} onClick={baixarArquivo} disabled={!xml}>
          Baixar .bpmn
        </Button>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2.5,
          borderRadius: 2,
          bgcolor: COLORS.primary[950],
          color: "#C7F0E8",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
          overflowX: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        {xml || "Carregando..."}
      </Box>
    </Box>
  );
}

export function VersoesView() {
  return (
    <Box sx={{ p: 3, overflow: "auto", bgcolor: COLORS.gray[50], minHeight: 0 }}>
      {VERSOES.map((v) => (
        <Card key={v.versao} sx={{ p: 2, mb: 1.5, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Chip size="small" label={v.versao} sx={{ fontFamily: "ui-monospace, monospace", bgcolor: COLORS.gray[100] }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{v.status}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
              {v.autor} • {v.data}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
