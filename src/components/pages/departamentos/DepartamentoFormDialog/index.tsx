"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import AddBusinessOutlined from "@mui/icons-material/AddBusinessOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import FormDialog from "@/components/shared/FormDialog";
import { PerfilAcesso } from "@/enums";
import { mockUsuarios } from "@/mocks/usuarios";
import { useDepartamentosStore } from "../core/store/useDepartamentosStore";
import { useDepartamentoForm } from "../core/hooks/useDepartamentoForm";
import * as S from "../style";

// Só administradores e gestores podem ser responsáveis por um departamento
const GESTORES = mockUsuarios.filter((u) => u.perfil === PerfilAcesso.Administrador || u.perfil === PerfilAcesso.Gestor);

export default function DepartamentoFormDialog() {
  const { dialog, fecharDialog } = useDepartamentosStore();
  const form = useDepartamentoForm();
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
      titulo={editando ? "Editar departamento" : "Novo departamento"}
      subtitulo="Departamentos organizam processos, pessoas e cotas de IA."
      icon={editando ? <EditOutlined /> : <AddBusinessOutlined />}
      textoConfirmar={editando ? "Salvar alterações" : "Criar departamento"}
    >
      <Box sx={S.FormGrid}>
        <TextField label="Nome" size="small" {...form.getFieldProps("nome")} error={!!erro("nome")} helperText={erro("nome")} />
        <TextField
          label="Sigla"
          size="small"
          {...form.getFieldProps("sigla")}
          onChange={(e) => form.setFieldValue("sigla", e.target.value.toUpperCase())}
          error={!!erro("sigla")}
          helperText={erro("sigla") ?? "Ex.: FIN, RH, OPS"}
          slotProps={{ htmlInput: { maxLength: 4 } }}
        />
      </Box>
      <Box sx={S.FormGrid}>
        <TextField select label="Gestor responsável" size="small" {...form.getFieldProps("gestor")} error={!!erro("gestor")} helperText={erro("gestor")}>
          {GESTORES.map((g) => (
            <MenuItem key={g.id} value={g.nome}>
              {g.nome} — {g.cargo}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Centro de custo"
          size="small"
          placeholder="CC-0000"
          {...form.getFieldProps("centroCusto")}
          error={!!erro("centroCusto")}
          helperText={erro("centroCusto")}
        />
      </Box>
      <TextField
        label="Descrição"
        size="small"
        multiline
        minRows={3}
        {...form.getFieldProps("descricao")}
        error={!!erro("descricao")}
        helperText={erro("descricao") ?? `${form.values.descricao.length}/160`}
      />
    </FormDialog>
  );
}
