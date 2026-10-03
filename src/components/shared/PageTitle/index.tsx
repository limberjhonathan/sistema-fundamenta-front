import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { COLORS } from "@/styles/colors";
import { mqTablet } from "@/utils/mediaQuery";

type PageTitleProps = {
  titulo: string;
  subtitulo?: string;
  eyebrow?: { label: string; icon?: ReactNode };
  actions?: ReactNode;
};

/** Cabeçalho padrão das páginas: eyebrow opcional, título, subtítulo e ações à direita. */
export default function PageTitle({ titulo, subtitulo, eyebrow, actions }: PageTitleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
        [mqTablet]: { flexDirection: "column", alignItems: "flex-start" },
      }}
    >
      <Box sx={{ maxWidth: 640 }}>
        {eyebrow && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: COLORS.primary[600], mb: 0.5, "& svg": { fontSize: 18 } }}>
            {eyebrow.icon}
            <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
              {eyebrow.label}
            </Typography>
          </Box>
        )}
        <Typography variant="h1">{titulo}</Typography>
        {subtitulo && (
          <Typography sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.95rem" }}>{subtitulo}</Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>{actions}</Box>}
    </Box>
  );
}
