"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  Legend,
  LegendProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
} from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    icon?: React.ComponentType<{ className?: string }>;
    color?: string;
  }
>;

export const ChartContainerContext = React.createContext<{
  config: ChartConfig;
}>({
  config: {},
});

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig;
  children: React.ReactNode;
}

function ChartContainer({
  config = {},
  className,
  children,
}: ChartContainerProps) {
  return (
    <ChartContainerContext.Provider value={{ config }}>
      <div className={cn("w-full aspect-video", className)}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContainerContext.Provider>
  );
}

function ChartStyle() {
  return (
    <style>{`
      :root {
        --chart-1: hsl(221.2, 83.2%, 53.3%);
        --chart-2: hsl(142.1, 76.2%, 36.3%);
        --chart-3: hsl(38.1, 92.5%, 50.2%);
        --chart-4: hsl(346.8, 77.2%, 49.8%);
        --chart-5: hsl(262.1, 83.3%, 57.8%);
      }
    `}</style>
  );
}

function ChartLegend(props: LegendProps) {
  return (
    <Legend
      {...props}
      wrapperStyle={{
        ...props.wrapperStyle,
        paddingTop: "0.5rem",
      }}
      formatter={(value: string) => (
        <span className="text-xs text-muted-foreground">{value}</span>
      )}
    />
  );
}

export { ChartContainer, ChartStyle, ChartLegend };
