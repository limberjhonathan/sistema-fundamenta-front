import { useState } from "react";
import { mockMensagens, type MensagemChat } from "@/mocks/assistente";

const agora = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

/** Chat estático: guarda as mensagens localmente e responde com um texto de demonstração. */
export function useChat() {
  const [mensagens, setMensagens] = useState<MensagemChat[]>(mockMensagens);
  const [digitando, setDigitando] = useState(false);

  const enviar = (texto: string) => {
    const conteudo = texto.trim();
    if (!conteudo) return;

    setMensagens((prev) => [...prev, { id: Date.now(), autor: "usuario", hora: agora(), texto: conteudo }]);
    setDigitando(true);

    setTimeout(() => {
      setMensagens((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          autor: "ia",
          hora: agora(),
          texto: "Esta é uma resposta de demonstração. A integração com o motor de IA será conectada em breve.",
        },
      ]);
      setDigitando(false);
    }, 900);
  };

  const novaConversa = () => setMensagens(mockMensagens.slice(0, 1));

  return { mensagens, digitando, enviar, novaConversa };
}
