import Link from "next/link";
import { Box, Button, Card, Typography } from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import IconBox from "@/components/ui/IconBox";
import { mockHistoricoChat } from "@/mocks/assistente";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const SUGESTOES = [
  { titulo: "Novo Processo", descricao: "Inicie a criação de um processo guiado por IA", icon: <AddRounded />, href: "/novo-com-ia" },
  { titulo: "Busca Avançada", descricao: "Pesquise em todo o repositório Fundamenta", icon: <SearchRounded />, href: "/busca" },
  { titulo: "Favoritos", descricao: "Acesse seus manuais e fluxos salvos", icon: <BookmarkBorderRounded />, href: "/portal" },
];

type ChatSidePanelProps = { onNovaConversa: () => void; onSugestao: (texto: string) => void };

export default function ChatSidePanel({ onNovaConversa, onSugestao }: ChatSidePanelProps) {
  return (
    <Box component="aside" sx={S.SidePanel}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.gray[200]}` }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <HistoryRounded sx={{ fontSize: 16 }} />
          <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
            Histórico Recente
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>Suas últimas interações com a IA</Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {mockHistoricoChat.map((g) => (
          <Box key={g.grupo} sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: COLORS.gray[500] }}>
              {g.grupo}
            </Typography>
            {g.itens.map((item) => (
              <Box
                key={item}
                onClick={() => onSugestao(item)}
                sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.75, cursor: "pointer", "&:hover": { color: COLORS.primary[600] } }}
              >
                <ChatBubbleOutlineRounded sx={{ fontSize: 15, color: COLORS.gray[500] }} />
                <Typography sx={{ fontSize: "0.8125rem" }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        ))}

        <Typography variant="overline" sx={{ display: "block", pt: 2, mb: 1, borderTop: `1px solid ${COLORS.gray[200]}` }}>
          Sugestões para você
        </Typography>
        {SUGESTOES.map((s) => (
          <Card key={s.titulo} component={Link} href={s.href} sx={{ ...S.SugestaoCard, display: "block", textDecoration: "none", color: "inherit" }}>
            <IconBox size={26} sx={{ mb: 1 }}>
              {s.icon}
            </IconBox>
            <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase" }}>{s.titulo}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{s.descricao}</Typography>
          </Card>
        ))}

        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: COLORS.gray[100], border: `1px solid ${COLORS.gray[200]}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.primary[600], mb: 0.5 }}>
            <InfoOutlined sx={{ fontSize: 14 }} />
            <Typography variant="overline" sx={{ fontSize: "0.625rem" }}>
              Dica de uso
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600] }}>
            &quot;Tente perguntar por códigos de processos específicos, como PR-RH-01, para obter respostas diretas.&quot;
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.gray[200]}` }}>
        <Button fullWidth variant="outlined" startIcon={<AddRounded />} onClick={onNovaConversa} sx={{ justifyContent: "flex-start" }}>
          Nova Conversa
        </Button>
      </Box>
    </Box>
  );
}
