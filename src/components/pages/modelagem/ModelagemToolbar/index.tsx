import { Box, Button, Chip, Divider, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { COLORS } from "@/styles/colors";
import * as S from "../style";

export type ModelagemAba = "diagrama" | "xml" | "versoes";

type ModelagemToolbarProps = { aba: ModelagemAba; onAba: (aba: ModelagemAba) => void };

export default function ModelagemToolbar({ aba, onAba }: ModelagemToolbarProps) {
  return (
    <Box sx={S.Toolbar}>
      <Typography variant="h4" sx={{ maxWidth: 220, lineHeight: 1.25 }}>
        Solicitação de Crédito Imobiliário
      </Typography>
      <Chip
        size="small"
        label="Em Modelagem"
        variant="outlined"
        sx={{ color: COLORS.accent.orangeDark, borderColor: COLORS.accent.orange, bgcolor: COLORS.accent.orangeLight, borderRadius: 999 }}
      />
      <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: "none", lg: "block" } }} />

      <ToggleButtonGroup exclusive size="small" value={aba} onChange={(_, v: ModelagemAba | null) => v && onAba(v)} sx={S.ViewToggle}>
        <ToggleButton value="diagrama">Diagrama</ToggleButton>
        <ToggleButton value="xml">XML BPMN</ToggleButton>
        <ToggleButton value="versoes">Versões</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
        <Button startIcon={<HistoryRounded />} sx={{ color: COLORS.gray[900], display: { xs: "none", lg: "inline-flex" } }}>
          Histórico
        </Button>
        <Button startIcon={<ShareOutlined />} sx={{ color: COLORS.gray[900], display: { xs: "none", lg: "inline-flex" } }}>
          Compartilhar
        </Button>
        <Button variant="outlined" startIcon={<SaveOutlined />}>
          Salvar Processo
        </Button>
        <IconButton sx={{ border: `1px solid ${COLORS.gray[200]}`, borderRadius: 2 }}>
          <MoreVertRounded fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
