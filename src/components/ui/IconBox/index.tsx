import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { COLORS } from "@/styles/colors";

type IconBoxProps = {
  children: ReactNode;
  color?: string;
  bg?: string;
  size?: number;
  rounded?: boolean;
  sx?: SxProps<Theme>;
};

export default function IconBox({
  children,
  color = COLORS.primary[600],
  bg = COLORS.gray[100],
  size = 36,
  rounded = false,
  sx,
}: IconBoxProps) {
  return (
    <Box
      sx={[
        {
          width: size,
          height: size,
          minWidth: size,
          borderRadius: rounded ? "50%" : 2,
          bgcolor: bg,
          color,
          display: "grid",
          placeItems: "center",
          "& svg": { fontSize: size * 0.52 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
