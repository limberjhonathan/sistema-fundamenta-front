import { Box, Card, Typography } from "@mui/material";
import ConstructionRounded from "@mui/icons-material/ConstructionRounded";
import CustomContainer from "@/components/shared/CustomContainer";
import PageTitle from "@/components/shared/PageTitle";
import IconBox from "@/components/ui/IconBox";
import { COLORS } from "@/styles/colors";

type EmBreveProps = { titulo: string; subtitulo: string };

/** Placeholder para telas que ainda não têm layout definido. */
export default function EmBreve({ titulo, subtitulo }: EmBreveProps) {
  return (
    <CustomContainer>
      <PageTitle eyebrow={{ label: "Administração" }} titulo={titulo} subtitulo={subtitulo} />
      <Card sx={{ p: 6, borderRadius: 2, textAlign: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
          <IconBox size={56} bg={COLORS.primary[50]} sx={{ borderRadius: 3 }}>
            <ConstructionRounded />
          </IconBox>
          <Typography variant="h4">Em construção</Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary", maxWidth: 360 }}>
            Esta área ainda não possui layout definido. Em breve estará disponível.
          </Typography>
        </Box>
      </Card>
    </CustomContainer>
  );
}
