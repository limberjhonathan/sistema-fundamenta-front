import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { mqMobile, mqTablet } from "@/utils/mediaQuery";

type CustomContainerProps = { children: ReactNode; sx?: SxProps<Theme> };

/** Container padrão das páginas: largura máxima e respiro responsivo. */
export default function CustomContainer({ children, sx }: CustomContainerProps) {
  return (
    <Box
      sx={[
        {
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: 4,
          py: 4,
          [mqTablet]: { px: 3, py: 3 },
          [mqMobile]: { px: 2, py: 2.5 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
