import { Chip, ChipProps } from "@mui/material";
import type { StatusStyle } from "@/status";

type StatusChipProps = {
  status: StatusStyle;
  icon?: ChipProps["icon"];
  size?: "small" | "medium";
};

export default function StatusChip({ status, icon, size = "small" }: StatusChipProps) {
  return (
    <Chip
      size={size}
      icon={icon}
      label={status.label}
      sx={{
        color: status.color,
        bgcolor: status.bg,
        border: `1px solid ${status.border}`,
        borderRadius: 999,
        "& .MuiChip-icon": { color: status.color, fontSize: 14 },
      }}
    />
  );
}
