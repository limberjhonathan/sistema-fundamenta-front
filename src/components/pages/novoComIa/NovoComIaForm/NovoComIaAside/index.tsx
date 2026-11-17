import { Box, Card, Typography } from "@mui/material";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import IconBox from "@/components/ui/IconBox";
import { ICONE_ANEXO } from "@/components/shared/UploadArea/icones";
import { NovoComIaEtapa, useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { TipoAnexo } from "@/enums";
import { TIPO_ANEXO } from "@/status";
import { COLORS } from "@/styles/colors";
import * as S from "../../style";

const DICAS_MATERIAL = [
  { tipo: TipoAnexo.Video, titulo: "Gravação explicando o processo", texto: "Uma reunião ou alguém narrando o passo a passo. A IA transcreve e identifica quem faz o quê." },
  { tipo: TipoAnexo.Planilha, titulo: "Planilha com cabeçalho", texto: "Colunas como Etapa, Responsável e Prazo viram atividades e papéis automaticamente." },
  { tipo: TipoAnexo.Documento, titulo: "POPs e manuais", texto: "Documentos com regras de negócio ajudam a IA a modelar as decisões e exceções." },
  { tipo: TipoAnexo.Imagem, titulo: "Fluxo no quadro", texto: "Uma foto do fluxo desenhado à mão já é um ótimo ponto de partida." },
];

export default function NovoComIaAside() {
  const etapa = useNovoComIaStore((s) => s.etapa);

  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Box sx={S.ContextoCard}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <PsychologyOutlined />
          <Typography variant="h3" sx={{ color: COLORS.white, lineHeight: 1.1 }}>
            Analisando Contexto...
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", mb: 2.5 }}>
          Estou pronta para identificar papéis (RACI) e entradas/saídas (SIPOC) conforme você descreve o processo.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.7 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AutoAwesomeRounded sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: "0.6875rem" }}>IA Sugestão v3.2</Typography>
          </Box>
          <ChevronRightRounded sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      {etapa === NovoComIaEtapa.Material ? (
        <Card sx={{ p: 2.5, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <InfoOutlined sx={{ fontSize: 18 }} />
            <Typography variant="h3">O que funciona melhor</Typography>
          </Box>
          <Box sx={{ display: "grid", gap: 1.75 }}>
            {DICAS_MATERIAL.map((d) => (
              <Box key={d.tipo} sx={{ display: "flex", gap: 1.25 }}>
                <IconBox size={28} color={TIPO_ANEXO[d.tipo].color} bg={TIPO_ANEXO[d.tipo].bg}>
                  {ICONE_ANEXO[d.tipo]}
                </IconBox>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "0.8125rem", mb: 0.25 }}>
                    {d.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", lineHeight: 1.5, color: COLORS.gray[600] }}>{d.texto}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      ) : (
      <Card sx={{ p: 2.5, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <InfoOutlined sx={{ fontSize: 18 }} />
          <Typography variant="h3">Dicas de Modelagem</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontSize: "0.875rem", mb: 0.5 }}>
          Seja Específico
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600], mb: 2 }}>
          Quanto mais detalhes você fornecer na descrição, melhor a IA conseguirá identificar gargalos e sugerir automações.
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "0.875rem", mb: 0.5 }}>
          Nível de Detalhe
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>
          Para processos complexos, tente focar no &quot;Happy Path&quot; (caminho feliz) e deixe que a IA sugira os fluxos alternativos.
        </Typography>
      </Card>
      )}

      <Box sx={S.ImagemPlaceholder} />
    </Box>
  );
}
