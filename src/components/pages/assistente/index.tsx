"use client";

import { Box } from "@mui/material";
import ChatMessages from "./ChatMessages";
import ChatComposer from "./ChatComposer";
import ChatSidePanel from "./ChatSidePanel";
import { useChat } from "./core/hooks/useChat";
import * as S from "./style";

export default function AssistentePage() {
  const { mensagens, digitando, enviar, novaConversa } = useChat();

  return (
    <Box sx={S.Page}>
      <Box sx={S.ChatColumn}>
        <ChatMessages mensagens={mensagens} digitando={digitando} />
        <ChatComposer onEnviar={enviar} />
      </Box>
      <ChatSidePanel onNovaConversa={novaConversa} onSugestao={enviar} />
    </Box>
  );
}
