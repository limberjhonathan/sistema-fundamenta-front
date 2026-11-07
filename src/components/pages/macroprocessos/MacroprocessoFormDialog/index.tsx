"use client";

import { Box, ButtonBase, Checkbox, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import FormDialog from "@/components/shared/FormDialog";
import { TipoMacroprocesso, UsuarioStatus } from "@/enums";
import { DEPARTAMENTOS } from "@/mocks/processos";
import { mockUsuarios } from "@/mocks/usuarios";
import { TIPO_MACROPROCESSO } from "@/status";
import { useMacroprocessosStore } from "../core/store/useMacroprocessosStore";
import { sugerirCodigo, useMacroprocessoForm } from "../core/hooks/useMacroprocessoForm";
import * as S from "../style";

const DONOS = mockUsuarios.filter((u) => u.status === UsuarioStatus.Ativo);

export default function MacroprocessoFormDialog() {
  const { dialog, fecharDialog, macroprocessos } = useMacroprocessosStore();
  const form = useMacroprocessoForm();
  const editando = !!dialog.editando;

  const erro = (campo: keyof typeof form.values) =>
    form.touched[campo] && form.errors[campo] ? String(form.errors[campo]) : undefined;

  const fechar = () => {
    form.resetForm();
    fecharDialog();
  };

  const escolherTipo = (tipo: TipoMacroprocesso) => {
    form.setFieldValue("tipo", tipo);
    // Na criação, o código acompanha o tipo escolhido
    if (!editando) form.setFieldValue("codigo", sugerirCodigo(tipo, macroprocessos.map((m) => m.codigo)));
  };

  return (
    <FormDialog
      open={dialog.aberto}
      onClose={fechar}
      onSubmit={form.submitForm}
      titulo={editando ? "Editar macroprocesso" : "Novo macroprocesso"}
      subtitulo="Macroprocessos agrupam processos relacionados dentro da cadeia de valor."
      icon={editando ? <EditOutlined /> : <CategoryOutlined />}
      textoConfirmar={editando ? "Salvar alterações" : "Criar macroprocesso"}
      maxWidth="md"
    >
      <Box>
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          Classificação na cadeia de valor
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1, mt: 0.5 }}>
          {Object.values(TipoMacroprocesso).map((t) => (
            <ButtonBase key={t} sx={S.TipoOpcao(form.values.tipo === t)} onClick={() => escolherTipo(t)}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: TIPO_MACROPROCESSO[t].bg, border: `1px solid ${TIPO_MACROPROCESSO[t].border}` }} />
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{TIPO_MACROPROCESSO[t].label}</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", lineHeight: 1.4 }}>{TIPO_MACROPROCESSO[t].descricao}</Typography>
            </ButtonBase>
          ))}
        </Box>
      </Box>

      <Box sx={S.FormGrid}>
        <TextField label="Nome" size="small" {...form.getFieldProps("nome")} error={!!erro("nome")} helperText={erro("nome")} />
        <TextField
          label="Código"
          size="small"
          {...form.getFieldProps("codigo")}
          onChange={(e) => form.setFieldValue("codigo", e.target.value.toUpperCase())}
          error={!!erro("codigo")}
          helperText={erro("codigo") ?? "Gerado pelo tipo"}
          slotProps={{ htmlInput: { style: { fontFamily: "ui-monospace, monospace" } } }}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
        <TextField select label="Dono do macroprocesso" size="small" {...form.getFieldProps("dono")} error={!!erro("dono")} helperText={erro("dono")}>
          {DONOS.map((u) => (
            <MenuItem key={u.id} value={u.nome}>
              {u.nome} — {u.departamento}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Departamentos envolvidos"
          size="small"
          value={form.values.departamentos}
          onChange={(e) => form.setFieldValue("departamentos", e.target.value)}
          onBlur={() => form.setFieldTouched("departamentos", true)}
          error={!!erro("departamentos")}
          helperText={erro("departamentos")}
          slotProps={{ select: { multiple: true, renderValue: (v) => (v as string[]).join(", ") } }}
        >
          {DEPARTAMENTOS.map((d) => (
            <MenuItem key={d} value={d} dense>
              <Checkbox size="small" checked={form.values.departamentos.includes(d)} sx={{ py: 0 }} />
              <ListItemText primary={d} />
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TextField
        label="Descrição"
        size="small"
        multiline
        minRows={3}
        {...form.getFieldProps("descricao")}
        error={!!erro("descricao")}
        helperText={erro("descricao") ?? `${form.values.descricao.length}/200`}
      />
    </FormDialog>
  );
}
