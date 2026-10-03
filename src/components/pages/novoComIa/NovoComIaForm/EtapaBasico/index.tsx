"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import { COLORS } from "@/styles/colors";
import * as S from "../../style";

export default function EtapaBasico() {
  const { dados, setCampo } = useNovoComIaStore();

  return (
    <>
      <Box sx={S.FieldsGrid}>
        <Box>
          <Typography sx={S.Label}>Nome do processo</Typography>
          <TextField fullWidth size="small" placeholder="Ex: Admissão de Novos Funcionários" value={dados.nome} onChange={(e) => setCampo("nome", e.target.value)} />
        </Box>
        <Box>
          <Typography sx={S.Label}>Departamento responsável</Typography>
          <TextField fullWidth size="small" placeholder="Ex: Recursos Humanos" value={dados.departamento} onChange={(e) => setCampo("departamento", e.target.value)} />
        </Box>
      </Box>
      <Typography sx={S.Label}>Descrição narrativa</Typography>
      <TextField
        fullWidth
        multiline
        minRows={5}
        placeholder="Descreva em linguagem natural como o processo acontece hoje ou como você gostaria que fosse..."
        value={dados.descricao}
        onChange={(e) => setCampo("descricao", e.target.value)}
      />
      <Typography sx={{ fontSize: "0.75rem", fontStyle: "italic", color: COLORS.gray[500], mt: 1 }}>
        Dica: &quot;O gestor solicita a vaga, o RH aprova e publica no LinkedIn...&quot;
      </Typography>
    </>
  );
}
