"use client";

import Link from "next/link";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EditOutlined from "@mui/icons-material/EditOutlined";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import StatusChip from "@/components/shared/StatusChip";
import { DEPARTAMENTO_STATUS, PROCESSO_STATUS } from "@/status";
import { BRAND, COLORS } from "@/styles/colors";
import { iniciais } from "@/utils/iniciais";
import { useDepartamentos } from "../core/hooks/useDepartamentos";
import { useDepartamentosStore } from "../core/store/useDepartamentosStore";
import * as S from "../style";

/** Painel lateral com o raio-x do departamento: dados, processos e pessoas. */
export default function DepartamentoDetalhes() {
  const { detalhe } = useDepartamentos();
  const { fecharDetalhe, abrirDialog } = useDepartamentosStore();

  return (
    <Drawer anchor="right" open={!!detalhe} onClose={fecharDetalhe}>
      {detalhe && (
        <Box sx={S.Drawer}>
          <Box sx={S.DrawerHeader}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ ...S.Sigla(false), bgcolor: BRAND.lime, color: BRAND.dark }}>{detalhe.departamento.sigla}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ ...S.DepNome, fontSize: "1.375rem" }}>{detalhe.departamento.nome}</Typography>
                <Typography sx={{ fontSize: "0.75rem", opacity: 0.7 }}>
                  {detalhe.departamento.id} · {detalhe.departamento.centroCusto}
                </Typography>
              </Box>
              <IconButton onClick={fecharDetalhe} sx={{ color: COLORS.white }} aria-label="Fechar">
                <CloseRounded />
              </IconButton>
            </Box>
            <Typography sx={{ fontSize: "0.875rem", opacity: 0.85 }}>{detalhe.departamento.descricao}</Typography>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75, fontSize: "0.75rem" }}>
                <span>Cobertura de mapeamento</span>
                <b>{detalhe.departamento.cobertura}%</b>
              </Box>
              <LinearProgress
                variant="determinate"
                value={detalhe.departamento.cobertura}
                sx={{ height: 6, bgcolor: "rgba(255,255,255,0.15)", "& .MuiLinearProgress-bar": { bgcolor: BRAND.lime } }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Box sx={S.DrawerSection}>
              <Typography sx={S.DrawerSectionTitle}>Informações</Typography>
              <Box sx={S.InfoGrid}>
                {[
                  { label: "Gestor", valor: detalhe.departamento.gestor },
                  { label: "Status", valor: <StatusChip status={DEPARTAMENTO_STATUS[detalhe.departamento.status]} /> },
                  { label: "Colaboradores", valor: detalhe.departamento.colaboradores },
                  { label: "Processos", valor: detalhe.departamento.processos },
                ].map((i) => (
                  <Box key={i.label}>
                    <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 0.25 }}>{i.label}</Typography>
                    <Box sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{i.valor}</Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={S.DrawerSection}>
              <Typography sx={S.DrawerSectionTitle}>Processos do departamento</Typography>
              {detalhe.processos.length === 0 ? (
                <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>Nenhum processo vinculado ainda.</Typography>
              ) : (
                <List disablePadding sx={{ mx: -1 }}>
                  {detalhe.processos.map((p) => (
                    <ListItemButton key={p.codigo} component={Link} href="/processos" sx={{ borderRadius: 1.5, gap: 1 }}>
                      <ListItemText
                        primary={p.titulo}
                        secondary={`${p.codigo} · ${p.versao} · ${p.responsavel}`}
                        slotProps={{
                          primary: { sx: { fontSize: "0.875rem", fontWeight: 600 } },
                          secondary: { sx: { fontSize: "0.75rem" } },
                        }}
                      />
                      <StatusChip status={PROCESSO_STATUS[p.status]} />
                      <ChevronRightRounded sx={{ fontSize: 18, color: COLORS.gray[400] }} />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Box>

            <Box sx={S.DrawerSection}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Typography sx={{ ...S.DrawerSectionTitle, mb: 0 }}>Pessoas com acesso</Typography>
                <Button size="small" component={Link} href="/usuarios">
                  Gerenciar
                </Button>
              </Box>
              {detalhe.membros.length === 0 ? (
                <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>Nenhum usuário cadastrado nesta área.</Typography>
              ) : (
                <>
                  <AvatarGroup max={6} sx={{ justifyContent: "flex-end", mb: 1.5, "& .MuiAvatar-root": { width: 32, height: 32, fontSize: "0.75rem" } }}>
                    {detalhe.membros.map((m) => (
                      <Avatar key={m.id} sx={{ bgcolor: COLORS.primary[50], color: COLORS.primary[700], fontWeight: 700 }}>
                        {iniciais(m.nome)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  {detalhe.membros.slice(0, 4).map((m) => (
                    <Box key={m.id} sx={{ display: "flex", justifyContent: "space-between", py: 0.75, fontSize: "0.8125rem" }}>
                      <span>{m.nome}</span>
                      <Typography component="span" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                        {m.cargo}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.gray[200]}`, display: "flex", gap: 1.5 }}>
            <Button fullWidth variant="outlined" onClick={fecharDetalhe}>
              Fechar
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<EditOutlined />}
              onClick={() => {
                abrirDialog(detalhe.departamento);
                fecharDetalhe();
              }}
            >
              Editar departamento
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
