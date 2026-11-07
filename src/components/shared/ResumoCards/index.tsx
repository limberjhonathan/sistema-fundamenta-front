import { ReactNode } from "react";
import { Box, Card, Typography } from "@mui/material";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";

export type ResumoItem = {
  titulo: string;
  valor: ReactNode;
  icon: ReactNode;
  color?: string;
  bg?: string;
  /** Texto pequeno abaixo do valor (ex.: "de 25 licenças") */
  complemento?: ReactNode;
};

/** Faixa de indicadores no topo das páginas (4 colunas no desktop, 2 no tablet/celular). */
export default function ResumoCards({ itens }: { itens: ResumoItem[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: `repeat(${itens.length}, 1fr)` },
        gap: 2,
        mb: 3,
      }}
    >
      {itens.map((i) => (
        <Card key={i.titulo} sx={{ p: 2, borderRadius: 2, display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
          <IconBox size={40} color={i.color ?? COLORS.primary[600]} bg={i.bg ?? COLORS.primary[50]}>
            {i.icon}
          </IconBox>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: COLORS.gray[600], display: "block" }} noWrap>
              {i.titulo}
            </Typography>
            <Typography sx={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.1 }}>
              {i.valor}
            </Typography>
            {i.complemento && (
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.25 }} noWrap>
                {i.complemento}
              </Typography>
            )}
          </Box>
        </Card>
      ))}
    </Box>
  );
}
