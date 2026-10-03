import { Box, Typography } from "@mui/material";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import { COLORS } from "@/styles/colors";

type LogoProps = {
  variant?: "light" | "dark";
  size?: number;
  showText?: boolean;
};

export default function Logo({ variant = "light", size = 32, showText = true }: LogoProps) {
  const textColor = variant === "light" ? COLORS.white : COLORS.primary[600];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: 1.5,
          bgcolor: COLORS.primary[600],
          display: "grid",
          placeItems: "center",
          color: COLORS.white,
          flexShrink: 0,
        }}
      >
        <PsychologyOutlined sx={{ fontSize: size * 0.65 }} />
      </Box>
      {showText && (
        <Typography variant="h4" sx={{ color: textColor, fontSize: size * 0.55 }}>
          Fundamenta
        </Typography>
      )}
    </Box>
  );
}
