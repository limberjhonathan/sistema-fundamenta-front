"use client";

import { useId } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { lineClasses } from "@mui/x-charts/LineChart";
import { COLORS } from "@/styles/colors";

type AreaChartProps = {
  labels: string[];
  valores: number[];
  serieLabel?: string;
  height?: number;
  yMax?: number;
  hideLegend?: boolean;
};

/** Gráfico de área com degradê na cor primária (usado nos dashboards). */
export default function AreaChart({ labels, valores, serieLabel, height = 260, yMax, hideLegend = true }: AreaChartProps) {
  const gradientId = `area-${useId().replace(/:/g, "")}`;

  return (
    <LineChart
      height={height}
      hideLegend={hideLegend}
      grid={{ horizontal: true }}
      margin={{ left: 0, right: 16, top: 16, bottom: 0 }}
      xAxis={[{ scaleType: "point", data: labels, disableLine: true, disableTicks: true }]}
      yAxis={[{ min: 0, max: yMax, disableLine: true, disableTicks: true, width: 40 }]}
      series={[
        {
          data: valores,
          label: serieLabel,
          area: true,
          showMark: false,
          curve: "monotoneX",
          color: COLORS.primary[600],
        },
      ]}
      sx={{
        [`& .${lineClasses.area}`]: { fill: `url(#${gradientId})` },
        [`& .${lineClasses.line}`]: { strokeWidth: 2 },
        "& .MuiChartsGrid-line": { strokeDasharray: "4 4", stroke: COLORS.gray[200] },
        "& .MuiChartsAxis-tickLabel": { fill: `${COLORS.gray[500]} !important`, fontSize: "11px !important" },
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.primary[600]} stopOpacity={0.28} />
          <stop offset="100%" stopColor={COLORS.primary[600]} stopOpacity={0.02} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}
