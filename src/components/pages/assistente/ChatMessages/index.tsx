"use client";

import { Fragment, useEffect, useRef } from "react";
import { Avatar, Box, Chip, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import ThumbUpOffAltOutlined from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOffAltOutlined from "@mui/icons-material/ThumbDownOffAltOutlined";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import RefreshRounded from "@mui/icons-material/RefreshRounded";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import TagRounded from "@mui/icons-material/TagRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import { useUser } from "@/context/user/AppProvider";
import type { MensagemChat } from "@/mocks/assistente";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

/** Renderiza **negrito** simples dentro do texto da IA. */
function TextoFormatado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
        parte.startsWith("**") ? <b key={i}>{parte.slice(2, -2)}</b> : <Fragment key={i}>{parte}</Fragment>,
      )}
    </>
  );
}

const IaAvatar = () => (
  <Avatar sx={{ width: 32, height: 32, bgcolor: COLORS.gray[200], color: "#8B5CF6" }}>
    <PsychologyOutlined sx={{ fontSize: 20 }} />
  </Avatar>
);

type ChatMessagesProps = { mensagens: MensagemChat[]; digitando: boolean };

export default function ChatMessages({ mensagens, digitando }: ChatMessagesProps) {
  const { user } = useUser();
  const fimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens.length, digitando]);

  return (
    <Box sx={S.Messages}>
      <Divider sx={S.DayDivider}>HOJE</Divider>

      {mensagens.map((m) =>
        m.autor === "ia" ? (
          <Box key={m.id} sx={{ display: "flex", gap: 2, mb: 3 }}>
            <IaAvatar />
            <Box>
              <Box sx={S.IaBubble}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Chip size="small" icon={<AutoAwesomeRounded />} label="GERADO POR IA" sx={S.IaTag} />
                  <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{m.hora}</Typography>
                </Box>
                <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  <TextoFormatado texto={m.texto} />
                </Typography>
                {m.fontes && (
                  <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${COLORS.gray[200]}` }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: COLORS.gray[600] }}>
                      <MenuBookOutlined sx={{ fontSize: 14 }} />
                      <Typography variant="overline" sx={{ fontSize: "0.6875rem" }}>
                        Fontes e Referências
                      </Typography>
                    </Box>
                    {m.fontes.map((f) => (
                      <Box key={f.label} sx={S.Fonte}>
                        {f.tipo === "documento" ? <DescriptionOutlined /> : <TagRounded />}
                        {f.label}
                        <OpenInNewRounded sx={{ color: COLORS.gray[500] }} />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 0.5, mt: 0.75, color: COLORS.gray[500] }}>
                {[ThumbUpOffAltOutlined, ThumbDownOffAltOutlined, ContentCopyRounded, RefreshRounded].map((Icon, i) => (
                  <IconButton key={i} size="small" sx={{ color: "inherit" }}>
                    <Icon sx={{ fontSize: 16 }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box key={m.id} sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mb: 3 }}>
            <Box sx={S.UserBubble}>
              <Typography sx={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>{m.texto}</Typography>
            </Box>
            <Avatar sx={{ width: 28, height: 28, fontSize: "0.6875rem", fontWeight: 700, bgcolor: COLORS.primary[600] }}>
              {user.iniciais}
            </Avatar>
          </Box>
        ),
      )}

      {digitando && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <IaAvatar />
          <CircularProgress size={16} />
          <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>Assistente está digitando...</Typography>
        </Box>
      )}
      <div ref={fimRef} />
    </Box>
  );
}
