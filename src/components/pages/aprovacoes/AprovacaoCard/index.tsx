import { Avatar, Box, Button, Card, Chip, IconButton, Typography } from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import StatusChip from "@/components/shared/StatusChip";
import { AprovacaoStatus } from "@/enums";
import { APROVACAO_STATUS } from "@/status";
import { COLORS } from "@/styles/colors";
import type { Aprovacao } from "@/types/processo";
import type { Decisao } from "../core/store/useAprovacoesStore";
import * as S from "../style";

type AprovacaoCardProps = {
  aprovacao: Aprovacao;
  decisao?: Decisao;
  onDecidir: (decisao: Decisao) => void;
};

export default function AprovacaoCard({ aprovacao: a, decisao, onDecidir }: AprovacaoCardProps) {
  return (
    <Card sx={S.AprovacaoCard}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <StatusChip
          status={APROVACAO_STATUS[a.status]}
          icon={a.status === AprovacaoStatus.Urgente ? <ErrorOutlineRounded /> : <ScheduleRounded />}
        />
        <Typography sx={S.Id}>{a.id}</Typography>
        <IconButton size="small" sx={{ ml: "auto" }}>
          <MoreHorizRounded fontSize="small" />
        </IconButton>
      </Box>

      <Typography sx={S.Titulo}>{a.titulo}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip size="small" label={a.versao} sx={S.Versao} />
        <Typography sx={{ fontSize: "0.75rem", color: COLORS.gray[600] }}>• {a.departamento}</Typography>
      </Box>

      <Typography sx={S.Descricao}>{a.descricao}</Typography>

      <Box sx={S.Solicitante}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: COLORS.gray[100], color: COLORS.gray[500], fontSize: "0.75rem" }}>
            {a.solicitante[0]}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>{a.solicitante}</Typography>
            <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>{a.cargo}</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.gray[500] }}>
            <CalendarTodayOutlined sx={{ fontSize: 12 }} />
            <Typography variant="overline" sx={{ fontSize: "0.625rem" }}>
              Solicitado em
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>{a.solicitadoEm}</Typography>
        </Box>
      </Box>

      {decisao ? (
        <Chip
          label={decisao === "aprovado" ? "Aprovado por você" : "Rejeitado por você"}
          color={decisao === "aprovado" ? "success" : "error"}
          variant="outlined"
        />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          <Button variant="contained" onClick={() => onDecidir("aprovado")}>
            Aprovar
          </Button>
          <Button variant="outlined" onClick={() => onDecidir("rejeitado")}>
            Rejeitar
          </Button>
        </Box>
      )}
    </Card>
  );
}
