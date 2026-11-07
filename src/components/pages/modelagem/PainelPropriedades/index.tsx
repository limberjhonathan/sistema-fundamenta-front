"use client";

import { Badge, Box, Tab, Tabs } from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import { mockComentarios, mockSugestoesIa } from "@/mocks/modelagem";
import { useModelagemStore, type PainelAba } from "../core/store/useModelagemStore";
import PropriedadesElemento from "./PropriedadesElemento";
import PropriedadesProcesso from "./PropriedadesProcesso";
import SugestoesIa from "./SugestoesIa";
import Comentarios from "./Comentarios";
import * as S from "../style";

const contador = (n: number) => (
  <Badge badgeContent={n} color="primary" sx={{ "& .MuiBadge-badge": { position: "static", transform: "none", height: 16, minWidth: 16, fontSize: "0.625rem" } }} />
);

/** Inspetor à direita do canvas: propriedades, sugestões da IA e comentários. */
export default function PainelPropriedades({ onAviso }: { onAviso: (m: string) => void }) {
  const { selecionado, painelAba, setPainelAba } = useModelagemStore();

  return (
    <Box component="aside" sx={S.Painel}>
      <Tabs value={painelAba} onChange={(_, v: PainelAba) => setPainelAba(v)} variant="fullWidth" sx={S.PainelAbas}>
        <Tab value="propriedades" icon={<TuneRounded sx={{ fontSize: 16 }} />} iconPosition="start" label="Propriedades" />
        <Tab
          value="ia"
          icon={<AutoAwesomeOutlined sx={{ fontSize: 16 }} />}
          iconPosition="start"
          label={<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>IA {contador(mockSugestoesIa.length)}</Box>}
        />
        <Tab
          value="comentarios"
          icon={<ChatBubbleOutlineRounded sx={{ fontSize: 16 }} />}
          iconPosition="start"
          label={<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>Notas {contador(mockComentarios.length)}</Box>}
        />
      </Tabs>

      {/* key: volta a rolagem para o topo ao trocar de elemento ou de aba */}
      <Box key={`${painelAba}-${selecionado?.id ?? "processo"}`} sx={S.PainelConteudo}>
        {painelAba === "propriedades" &&
          (selecionado ? (
            <PropriedadesElemento key={selecionado.id + selecionado.tipo + selecionado.nome + selecionado.documentacao} elemento={selecionado} />
          ) : (
            <PropriedadesProcesso />
          ))}
        {painelAba === "ia" && <SugestoesIa onAviso={onAviso} />}
        {painelAba === "comentarios" && <Comentarios />}
      </Box>
    </Box>
  );
}
