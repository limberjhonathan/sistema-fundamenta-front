"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import LockOutlined from "@mui/icons-material/LockOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FingerprintRounded from "@mui/icons-material/FingerprintRounded";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import { COLORS } from "@/styles/colors";
import { useLoginForm } from "../core/hooks/useLoginForm";
import * as S from "./style";

export default function LoginForm() {
  const form = useLoginForm();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const erro = (campo: "email" | "senha") => (form.touched[campo] && form.errors[campo]) || undefined;

  return (
    <Box component="form" onSubmit={form.handleSubmit} noValidate sx={S.Container}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        <Box component="span" sx={S.DesktopOnly}>
          Entrar no sistema
        </Box>
        <Box component="span" sx={{ ...S.MobileOnly }}>
          Bem-vindo
        </Box>
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 3 }}>
        Insira suas credenciais corporativas abaixo para acessar o portal.
      </Typography>

      <Stack direction="row" spacing={1.5} sx={S.DesktopOnly}>
        <Button variant="outlined" sx={S.SsoButton}>
          Google SSO
        </Button>
        <Button variant="outlined" sx={S.SsoButton}>
          Microsoft Azure
        </Button>
      </Stack>
      <Divider sx={{ ...S.Divider, ...S.DesktopOnly }}>OU UTILIZE E-MAIL</Divider>

      <Typography sx={S.Label}>E-mail corporativo</Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="nome@empresa.com.br"
        {...form.getFieldProps("email")}
        error={!!erro("email")}
        helperText={erro("email")}
        sx={{ ...S.Input, mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRounded sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Typography sx={S.Label}>Senha</Typography>
        <Link href="#" underline="hover" sx={{ fontSize: "0.75rem", fontWeight: 600, color: COLORS.primary[600] }}>
          Esqueceu a senha?
        </Link>
      </Box>
      <TextField
        fullWidth
        size="small"
        type={mostrarSenha ? "text" : "password"}
        placeholder="••••••••"
        {...form.getFieldProps("senha")}
        error={!!erro("senha")}
        helperText={erro("senha")}
        sx={S.Input}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setMostrarSenha((v) => !v)} aria-label="Mostrar senha">
                  {mostrarSenha ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControlLabel
        sx={{ mt: 1, mb: 1, "& .MuiFormControlLabel-label": { fontSize: "0.8125rem", color: COLORS.gray[600] } }}
        control={<Checkbox size="small" {...form.getFieldProps("manterConectado")} checked={form.values.manterConectado} />}
        label="Manter conectado por 30 dias"
      />

      <Button fullWidth type="submit" variant="contained" endIcon={<ArrowForwardRounded />} sx={S.Submit}>
        Acessar Fundamenta
      </Button>

      <Box sx={{ ...S.MobileOnly, flexDirection: "column" }}>
        <Button fullWidth variant="outlined" startIcon={<FingerprintRounded />} sx={{ mt: 1.5, height: 44 }}>
          Entrar com Biometria
        </Button>
        <Divider sx={S.Divider}>OU CONTINUE COM</Divider>
        <Stack direction="row" spacing={1.5}>
          <Button sx={{ ...S.SsoButton, bgcolor: COLORS.gray[200] }}>Microsoft Azure</Button>
          <Button sx={{ ...S.SsoButton, bgcolor: COLORS.gray[200] }}>Google Workspace</Button>
        </Stack>
      </Box>

      <Box sx={S.Notice}>
        <InfoOutlined sx={{ fontSize: 20, color: COLORS.primary[600] }} />
        <Typography sx={{ fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[600] }}>
          Ao realizar o login, você concorda com nossos <Link href="#">Termos de Serviço</Link> e{" "}
          <Link href="#">Políticas de Segurança Cibernética</Link>.
        </Typography>
      </Box>

      <Box sx={S.Footer}>
        <Stack direction="row" spacing={2.5} sx={{ justifyContent: "center", mb: 1.5, ...S.DesktopOnly }}>
          {[
            { icon: <VerifiedUserOutlined />, label: "Certificado ISO 27001" },
            { icon: <LanguageRounded />, label: "Multi-região LATAM" },
          ].map(({ icon, label }) => (
            <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.gray[500], "& svg": { fontSize: 14 } }}>
              {icon}
              <Typography sx={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" }}>{label}</Typography>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center", mb: 1.5, ...S.MobileOnly }}>
          <Chip size="small" variant="outlined" label="V2.4.0 STABLE" />
          <Chip size="small" variant="outlined" color="primary" label="AI ENGINE ENABLED" />
        </Stack>
        <Typography sx={{ fontSize: "0.6875rem", color: COLORS.gray[500] }}>
          © 2026 Fundamenta BPM Systems. Todos os direitos reservados.
          <br />
          Desenvolvido para ambientes corporativos de alta demanda.
        </Typography>
      </Box>
    </Box>
  );
}
