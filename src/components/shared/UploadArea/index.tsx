"use client";

import { DragEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import IconBox from "@/components/ui/IconBox";
import { TipoAnexo } from "@/enums";
import { TIPO_ANEXO } from "@/status";
import { COLORS } from "@/styles/colors";
import { ACCEPT_ANEXOS, EXTENSOES, LIMITE_MB, validarArquivo } from "@/utils/anexo";
import { ICONE_ANEXO } from "./icones";
import * as S from "./style";

type UploadAreaProps = {
  /** Recebe só os arquivos válidos; os inválidos são avisados pela própria área. */
  onArquivos: (files: File[]) => void;
  /** Versão em uma linha, para quando já existem arquivos na lista. */
  compacto?: boolean;
  disabled?: boolean;
};

function TabelaFormatos() {
  return (
    <Box sx={{ p: 0.5, display: "grid", gap: 0.75, minWidth: 240 }}>
      {Object.values(TipoAnexo).map((t) => (
        <Box key={t} sx={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 1, fontSize: "0.75rem" }}>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {TIPO_ANEXO[t].label}
          </Box>
          <Box component="span" sx={{ opacity: 0.75 }}>
            {EXTENSOES[t].slice(0, 4).join(", ").toUpperCase()}
          </Box>
          <Box component="span" sx={{ opacity: 0.75, textAlign: "right" }}>
            {LIMITE_MB[t]} MB
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Entrada de arquivos para a IA ler: arrastar e soltar, clicar para escolher ou colar (Ctrl+V).
 * Valida formato e tamanho e avisa o que foi recusado sem bloquear os demais.
 */
export default function UploadArea({ onArquivos, compacto = false, disabled = false }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const profundidadeDrag = useRef(0);
  const [arrastando, setArrastando] = useState(false);
  const [erros, setErros] = useState<string[]>([]);

  const receber = (files: File[]) => {
    if (!files.length || disabled) return;
    const resultado = files.map((file) => ({ file, erro: validarArquivo(file) }));
    setErros(resultado.flatMap((r) => (r.erro ? [r.erro] : [])));
    const validos = resultado.filter((r) => !r.erro).map((r) => r.file);
    if (validos.length) onArquivos(validos);
  };

  // Colar arquivos (ex.: print da tela) em qualquer lugar da página enquanto a área estiver visível
  const receberRef = useRef(receber);
  useEffect(() => {
    receberRef.current = receber;
  });
  useEffect(() => {
    if (disabled) return;
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (!files.length) return;
      // Excel/Word colocam texto + imagem no clipboard: num campo de texto, o texto tem prioridade
      const alvo = e.target as HTMLElement | null;
      const editavel = alvo?.closest("input, textarea, [contenteditable='true']");
      if (editavel && e.clipboardData?.types.includes("text/plain")) return;
      e.preventDefault();
      receberRef.current(files);
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [disabled]);

  const abrir = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrir();
    }
  };

  // Contador evita o "pisca" do destaque quando o cursor passa sobre elementos filhos
  const dragProps = {
    onDragEnter: (e: DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      profundidadeDrag.current += 1;
      setArrastando(true);
    },
    onDragOver: (e: DragEvent) => e.preventDefault(),
    onDragLeave: () => {
      profundidadeDrag.current = Math.max(0, profundidadeDrag.current - 1);
      if (!profundidadeDrag.current) setArrastando(false);
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      profundidadeDrag.current = 0;
      setArrastando(false);
      receber(Array.from(e.dataTransfer.files));
    },
  };

  const areaProps = {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled,
    "aria-label": "Adicionar arquivos para a IA ler",
    onClick: abrir,
    onKeyDown: handleKey,
    ...dragProps,
  };

  const infoFormatos = (
    <Tooltip title={<TabelaFormatos />} arrow placement="top">
      <IconButton
        size="small"
        aria-label="Formatos aceitos e limites"
        onClick={(e) => e.stopPropagation()}
        sx={{ color: COLORS.gray[400], "&:hover": { color: COLORS.gray[700] } }}
      >
        <InfoOutlined sx={{ fontSize: 18 }} />
      </IconButton>
    </Tooltip>
  );

  return (
    <Box>
      {compacto ? (
        <Box {...areaProps} sx={S.AreaCompacta(arrastando, disabled)}>
          <IconBox size={32} bg={COLORS.primary[50]}>
            <AddRounded />
          </IconBox>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: COLORS.gray[900] }}>
              {arrastando ? "Solte para adicionar" : "Adicionar mais arquivos"}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[500], display: { xs: "none", sm: "block" } }}>
              Arraste, clique ou cole com <Box component="kbd" sx={S.Kbd}>Ctrl</Box> + <Box component="kbd" sx={S.Kbd}>V</Box>
            </Typography>
          </Box>
          {infoFormatos}
        </Box>
      ) : (
        <Box {...areaProps} sx={S.Area(arrastando, disabled)}>
          <motion.div animate={{ y: arrastando ? -4 : 0, scale: arrastando ? 1.06 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
            <IconBox rounded size={52} bg={arrastando ? COLORS.white : COLORS.primary[50]} sx={{ mx: "auto", mb: 2 }}>
              <CloudUploadOutlined />
            </IconBox>
          </motion.div>
          <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: COLORS.gray[900] }}>
            {arrastando ? "Solte para a IA ler" : "Arraste seus arquivos para cá"}
          </Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: COLORS.gray[500], mt: 0.5 }}>
            ou{" "}
            <Box component="span" sx={S.Link}>
              escolha no computador
            </Box>
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              {" "}· cole com <Box component="kbd" sx={S.Kbd}>Ctrl</Box> + <Box component="kbd" sx={S.Kbd}>V</Box>
            </Box>
          </Typography>

          <Box sx={S.Formatos}>
            {Object.values(TipoAnexo).map((t) => (
              <Box key={t} sx={S.Formato}>
                <Box component="span" sx={{ display: "flex", color: TIPO_ANEXO[t].color }}>
                  {ICONE_ANEXO[t]}
                </Box>
                {TIPO_ANEXO[t].label}
              </Box>
            ))}
            <Box sx={{ ...S.Formato, gap: 0 }}>{infoFormatos}</Box>
          </Box>
        </Box>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept={ACCEPT_ANEXOS}
        onChange={(e) => {
          receber(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />

      {erros.length > 0 && (
        <Box role="alert" sx={S.Erros}>
          <WarningAmberRounded sx={{ fontSize: 20, mt: "1px" }} />
          <Box sx={{ flex: 1, fontSize: "0.8125rem" }}>
            <Box sx={{ fontWeight: 600 }}>
              {erros.length === 1 ? "1 arquivo não foi adicionado" : `${erros.length} arquivos não foram adicionados`}
            </Box>
            <Box component="ul" sx={{ m: 0, mt: 0.25, pl: 2.25, color: COLORS.gray[700] }}>
              {erros.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </Box>
          </Box>
          <IconButton size="small" aria-label="Fechar aviso" onClick={() => setErros([])} sx={{ color: "inherit", mt: -0.5, mr: -0.5 }}>
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
