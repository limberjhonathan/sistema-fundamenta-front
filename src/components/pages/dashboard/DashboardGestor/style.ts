import type { Sx } from "@/styles/sx";
import { COLORS } from "@/styles/colors";

export const Card: Sx = { p: 2.5, height: "100%", borderRadius: 3 };

export const CardTitle: Sx = { mb: 0.25 };

export const CardSubtitle: Sx = { fontSize: "0.8125rem", color: "text.secondary" };

export const KpiGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
  gap: 2,
  mb: 3,
};

export const KpiTitle: Sx = {
  fontFamily: "var(--font-jakarta)",
  fontSize: "1.05rem",
  lineHeight: 1.15,
  fontWeight: 600,
  textTransform: "uppercase",
  color: COLORS.gray[600],
};

export const KpiValue: Sx = { fontFamily: "var(--font-jakarta)", fontSize: "1.375rem", fontWeight: 500, mt: 0.5 };

export const Row: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
  gap: 3,
  mb: 3,
};

export const ResumoGrid: Sx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
  gap: 2,
  mt: 3,
};

export const TaskItem: Sx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  py: 1.75,
  px: 1,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  "&:last-of-type": { borderBottom: "none" },
};

export const NeutralChip: Sx = { bgcolor: COLORS.gray[100], color: COLORS.gray[600], fontWeight: 600 };
