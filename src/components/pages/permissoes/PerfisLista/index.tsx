"use client";

import { Box, ButtonBase, LinearProgress, Typography } from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import AddRounded from "@mui/icons-material/AddRounded";
import { PERFIL_ACESSO } from "@/status";
import { BRAND, COLORS } from "@/styles/colors";
import { contarAcoes, usePermissoes } from "../core/hooks/usePermissoes";
import { usePermissoesStore } from "../core/store/usePermissoesStore";
import * as S from "../style";

export default function PerfisLista() {
  const { perfis, alterados, totalAcoes } = usePermissoes();
  const { selecionado, selecionar } = usePermissoesStore();

  return (
    <Box sx={S.PerfisColuna}>
      <Typography variant="overline" sx={{ color: "text.secondary" }}>
        Perfis de acesso
      </Typography>

      {perfis.map((p) => {
        const ativo = p.perfil === selecionado;
        const pct = contarAcoes(p) / totalAcoes;
        return (
          <ButtonBase key={p.perfil} sx={S.PerfilCard(ativo)} onClick={() => selecionar(p.perfil)}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: "1.0625rem", flex: 1 }}>
                {PERFIL_ACESSO[p.perfil].label}
              </Typography>
              {alterados.includes(p.perfil) && (
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: COLORS.accent.orange }} title="Alterações não salvas" />
              )}
              {p.bloqueado && <LockOutlined sx={{ fontSize: 16, opacity: 0.7 }} />}
            </Box>
            <Typography sx={{ fontSize: "0.75rem", opacity: ativo ? 0.75 : 1, color: ativo ? "inherit" : "text.secondary", lineHeight: 1.45 }}>
              {p.descricao}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              <PeopleOutlined sx={{ fontSize: 16, opacity: 0.7 }} />
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>{p.usuarios} usuário(s)</Typography>
              <Typography sx={{ fontSize: "0.75rem", ml: "auto", opacity: 0.7 }}>{Math.round(pct * 100)}% das ações</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={pct * 100}
              sx={{
                height: 4,
                bgcolor: ativo ? "rgba(255,255,255,0.15)" : COLORS.gray[200],
                "& .MuiLinearProgress-bar": { bgcolor: ativo ? BRAND.lime : COLORS.primary[600] },
              }}
            />
          </ButtonBase>
        );
      })}

      <ButtonBase sx={S.NovoPerfil}>
        <AddRounded fontSize="small" />
        Criar perfil personalizado
      </ButtonBase>
    </Box>
  );
}
