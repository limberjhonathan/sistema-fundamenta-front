"use client";

import { Box, ButtonBase, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material";
import PersonAddAlt1Outlined from "@mui/icons-material/PersonAddAlt1Outlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import FormDialog from "@/components/shared/FormDialog";
import { PerfilAcesso } from "@/enums";
import { PERFIL_ACESSO } from "@/status";
import { DEPARTAMENTOS } from "@/mocks/processos";
import { useUsuariosStore } from "../core/store/useUsuariosStore";
import { useUsuarioForm } from "../core/hooks/useUsuarioForm";
import * as S from "../style";

export default function UsuarioFormDialog() {
  const { dialog, fecharDialog } = useUsuariosStore();
  const form = useUsuarioForm();
  const editando = !!dialog.editando;

  const erro = (campo: keyof typeof form.values) =>
    form.touched[campo] && form.errors[campo] ? String(form.errors[campo]) : undefined;

  const fechar = () => {
    form.resetForm();
    fecharDialog();
  };

  return (
    <FormDialog
      open={dialog.aberto}
      onClose={fechar}
      onSubmit={form.submitForm}
      titulo={editando ? "Editar usuário" : "Convidar usuário"}
      subtitulo={
        editando
          ? "Atualize os dados e o perfil de acesso deste usuário."
          : "A pessoa recebe um e-mail para criar a senha e acessar o Fundamenta."
      }
      icon={editando ? <EditOutlined /> : <PersonAddAlt1Outlined />}
      textoConfirmar={editando ? "Salvar alterações" : "Enviar convite"}
    >
      <Box sx={S.FormGrid}>
        <TextField
          label="Nome completo"
          size="small"
          {...form.getFieldProps("nome")}
          error={!!erro("nome")}
          helperText={erro("nome")}
        />
        <TextField
          label="E-mail corporativo"
          size="small"
          type="email"
          {...form.getFieldProps("email")}
          error={!!erro("email")}
          helperText={erro("email")}
        />
        <TextField label="Cargo" size="small" {...form.getFieldProps("cargo")} error={!!erro("cargo")} helperText={erro("cargo")} />
        <TextField
          select
          label="Departamento"
          size="small"
          {...form.getFieldProps("departamento")}
          error={!!erro("departamento")}
          helperText={erro("departamento")}
        >
          {DEPARTAMENTOS.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          Perfil de acesso
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1, mt: 0.5 }}>
          {Object.values(PerfilAcesso).map((p) => (
            <ButtonBase key={p} sx={S.PerfilOpcao(form.values.perfil === p)} onClick={() => form.setFieldValue("perfil", p)}>
              <Box>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{PERFIL_ACESSO[p].label}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", lineHeight: 1.4 }}>
                  {PERFIL_ACESSO[p].descricao}
                </Typography>
              </Box>
            </ButtonBase>
          ))}
        </Box>
      </Box>

      {!editando && (
        <FormControlLabel
          control={<Checkbox size="small" name="enviarConvite" checked={form.values.enviarConvite} onChange={form.handleChange} />}
          label={<Typography sx={{ fontSize: "0.875rem" }}>Enviar convite por e-mail agora</Typography>}
        />
      )}
    </FormDialog>
  );
}
