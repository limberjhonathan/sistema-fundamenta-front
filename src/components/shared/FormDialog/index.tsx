"use client";

import { FormEvent, ReactNode } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";

type FormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  titulo: string;
  subtitulo?: string;
  icon?: ReactNode;
  textoConfirmar?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md";
};

/** Modal padrão de cadastro/edição: cabeçalho com ícone, corpo do formulário e ações Cancelar/Salvar. */
export default function FormDialog({
  open,
  onClose,
  onSubmit,
  titulo,
  subtitulo,
  icon,
  textoConfirmar = "Salvar",
  children,
  maxWidth = "sm",
}: FormDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      slotProps={{ paper: { sx: { borderRadius: fullScreen ? 0 : 3 } } }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
        <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, pb: 1 }}>
          {icon && (
            <IconBox size={40} bg={COLORS.primary[50]}>
              {icon}
            </IconBox>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">{titulo}</Typography>
            {subtitulo && <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary", mt: 0.25 }}>{subtitulo}</Typography>}
          </Box>
          <IconButton size="small" onClick={onClose} aria-label="Fechar">
            <CloseRounded fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>{children}</DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${COLORS.gray[200]}` }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {textoConfirmar}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
