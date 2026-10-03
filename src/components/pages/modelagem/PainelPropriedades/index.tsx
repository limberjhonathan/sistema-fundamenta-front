import { Box, Chip, IconButton, TextField, Typography } from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

const SUGESTOES = [
  { titulo: "Melhoria de Fluxo", texto: "O tempo médio de 'Analisar Documentação' é de 4h. Recomendo usar integração com OCR para reduzir para 15min." },
  { titulo: "Conformidade", texto: "Falta um evento de erro para o caso do Score Serasa ser negativo." },
];

export default function PainelPropriedades({ selecionada }: { selecionada: boolean }) {
  return (
    <Box component="aside" sx={S.Painel}>
      <Box sx={{ ...S.PainelSecao, display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
        <Typography variant="overline" sx={{ fontSize: "0.8125rem" }}>
          Propriedades
        </Typography>
        <IconButton size="small">
          <TuneRounded fontSize="small" />
        </IconButton>
      </Box>

      {selecionada ? (
        <>
          <Box sx={S.PainelSecao}>
            <Typography sx={S.Label}>ID do Elemento</Typography>
            <TextField
              fullWidth
              size="small"
              value="Task_0v9x2k1"
              slotProps={{ input: { readOnly: true, sx: { bgcolor: COLORS.gray[100], fontFamily: "ui-monospace, monospace" } } }}
              sx={{ mb: 2.5 }}
            />
            <Typography sx={S.Label}>Nome da Atividade</Typography>
            <TextField fullWidth multiline minRows={2} defaultValue="Analisar Documentação de Crédito" />
          </Box>

          <Box sx={S.PainelSecao}>
            <Typography variant="overline" sx={{ display: "block", mb: 1, color: COLORS.gray[700] }}>
              Configurações de IA
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.25,
                borderRadius: 1.5,
                bgcolor: COLORS.primary[50],
                border: `1px solid ${COLORS.primary[100]}`,
                color: COLORS.primary[600],
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <AutoAwesomeOutlined sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: "0.875rem" }}>Automação Sugerida</Typography>
              </Box>
              <Chip size="small" label="92% Match" sx={{ height: 20, fontSize: "0.625rem", bgcolor: COLORS.primary[600], color: COLORS.white }} />
            </Box>
            <Typography sx={{ fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600], mt: 1 }}>
              Esta tarefa pode ser automatizada usando processamento de linguagem natural (NLP).
            </Typography>

            <Typography sx={{ ...S.Label, mt: 2.5 }}>Responsável (RACI)</Typography>
            <TextField fullWidth size="small" defaultValue="Analista de Riscos" />
          </Box>

          <Box sx={S.PainelSecao}>
            <Typography variant="overline" sx={{ display: "block", mb: 1, color: COLORS.gray[700] }}>
              Documentação
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: COLORS.gray[600], lineHeight: 1.6 }}>
              O analista deve verificar se todos os campos do formulário PDF estão preenchidos conforme a norma ISO-9001.
            </Typography>
          </Box>
        </>
      ) : (
        <Box sx={{ ...S.PainelSecao, py: 4, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>Selecione um elemento no diagrama para ver suas propriedades.</Typography>
        </Box>
      )}

      <Box sx={{ px: 2, py: 2, mt: "auto", bgcolor: COLORS.gray[50] }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
          <ChatBubbleOutlineRounded sx={{ fontSize: 16 }} />
          <Typography variant="overline">Sugestões da IA</Typography>
        </Box>
        {SUGESTOES.map((s) => (
          <Box key={s.titulo} sx={{ p: 1.25, mb: 1, borderRadius: 1.5, bgcolor: COLORS.white, border: `1px solid ${COLORS.gray[200]}` }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>{s.titulo}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>{s.texto}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
