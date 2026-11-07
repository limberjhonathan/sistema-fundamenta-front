"use client";

import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyOutlined from "@mui/icons-material/ContentCopyOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import { AcaoPermissao, ModuloSistema } from "@/enums";
import { ACAO_LABEL, MODULO_LABEL, PERFIL_ACESSO } from "@/status";
import { COLORS } from "@/styles/colors";
import { usePermissoes } from "../core/hooks/usePermissoes";
import { usePermissoesStore } from "../core/store/usePermissoesStore";
import * as S from "../style";

const ACOES = Object.values(AcaoPermissao);

const DICA_ACAO: Record<AcaoPermissao, string> = {
  [AcaoPermissao.Visualizar]: "Ver o módulo e seus registros. Obrigatório para as demais ações.",
  [AcaoPermissao.Criar]: "Cadastrar novos registros",
  [AcaoPermissao.Editar]: "Alterar registros existentes",
  [AcaoPermissao.Excluir]: "Remover ou arquivar registros",
  [AcaoPermissao.Aprovar]: "Aprovar ou rejeitar solicitações",
};

/** Editor da matriz módulo × ação do perfil selecionado. */
export default function MatrizPermissoes() {
  const { atual } = usePermissoes();
  const { alternarAcao, alternarModulo } = usePermissoesStore();
  const perfil = PERFIL_ACESSO[atual.perfil];
  const bloqueado = !!atual.bloqueado;

  return (
    <Card sx={S.EditorCard}>
      <Box sx={S.EditorHeader}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="h3">{perfil.label}</Typography>
            <Chip
              size="small"
              label={bloqueado ? "Perfil do sistema" : "Editável"}
              sx={{ height: 22, fontSize: "0.6875rem", bgcolor: bloqueado ? COLORS.gray[100] : COLORS.primary[50], color: bloqueado ? COLORS.gray[600] : COLORS.primary[700] }}
            />
          </Box>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary", maxWidth: 520 }}>{atual.descricao}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<PeopleOutlined />} component={Link} href="/usuarios">
            Ver {atual.usuarios} usuário(s)
          </Button>
          <Button variant="outlined" size="small" startIcon={<ContentCopyOutlined />}>
            Duplicar
          </Button>
        </Box>
      </Box>

      {bloqueado && (
        <Alert severity="info" sx={{ borderRadius: 0 }}>
          O perfil Administrador tem acesso total e não pode ser alterado. Para restringir, crie um perfil personalizado.
        </Alert>
      )}

      <TableContainer>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow>
              <TableCell>Módulo</TableCell>
              {ACOES.map((a) => (
                <TableCell key={a} align="center" sx={{ width: 96 }}>
                  <Tooltip title={DICA_ACAO[a]}>
                    <span>{ACAO_LABEL[a]}</span>
                  </Tooltip>
                </TableCell>
              ))}
              <TableCell align="center" sx={{ width: 96 }}>
                Acesso total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(ModuloSistema).map((m) => {
              const acoes = atual.permissoes[m];
              const total = acoes.length === ACOES.length;
              return (
                <TableRow key={m} hover>
                  <TableCell>
                    <Typography sx={S.ModuloNome}>{MODULO_LABEL[m].label}</Typography>
                    <Typography sx={S.ModuloDescricao}>{MODULO_LABEL[m].descricao}</Typography>
                  </TableCell>
                  {ACOES.map((a) => (
                    <TableCell key={a} align="center">
                      <Checkbox
                        size="small"
                        checked={acoes.includes(a)}
                        disabled={bloqueado}
                        onChange={() => alternarAcao(m, a)}
                        slotProps={{ input: { "aria-label": `${ACAO_LABEL[a]} em ${MODULO_LABEL[m].label}` } }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Checkbox
                      size="small"
                      checked={total}
                      indeterminate={!total && acoes.length > 0}
                      disabled={bloqueado}
                      onChange={() => alternarModulo(m)}
                      slotProps={{ input: { "aria-label": `Acesso total em ${MODULO_LABEL[m].label}` } }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${COLORS.gray[200]}`, fontSize: "0.75rem", color: "text.secondary" }}>
        Marcar qualquer ação libera também <b>Visualizar</b>. Desmarcar <b>Visualizar</b> remove todo o acesso ao módulo.
      </Box>
    </Card>
  );
}
