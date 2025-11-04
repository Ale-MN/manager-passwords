"use client";

import * as React from "react";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx)
    throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  id?: string;
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme || item.color
  );

  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme as keyof typeof THEMES] ?? item.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`
    )
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

// === Tooltip types ===
export interface ChartTooltipItem<TValue = number, TName = string> {
  value?: TValue;
  name?: TName;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
  type?: string;
}

interface ChartTooltipContentProps<TValue = number, TName = string> {
  active?: boolean;
  payload?: ChartTooltipItem<TValue, TName>[];
  label?: string;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (
    label: string | number,
    payload?: ChartTooltipItem<TValue, TName>[]
  ) => React.ReactNode;
  formatter?: (
    value: TValue,
    name: TName,
    item: ChartTooltipItem<TValue, TName>,
    index: number,
    rawPayload?: Record<string, unknown>
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
  labelClassName?: string;
}

export function ChartTooltipContent<TValue = number, TName = string>({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  formatter,
  color,
  nameKey,
  labelKey,
  labelClassName,
}: ChartTooltipContentProps<TValue, TName>) {
  const { config } = useChart();

  // ✅ useMemo antes del return condicional
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = labelKey || item.dataKey || item.name || "value";
    const itemCfg = config[key as keyof typeof config];
    const value =
      typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemCfg?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(String(value ?? ""), payload)}
        </div>
      );
    }

    return value ? (
      <div className={cn("font-medium", labelClassName)}>{value}</div>
    ) : null;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  // ✅ luego el early return
  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = nameKey || item.name || item.dataKey || "value";
            const itemCfg = config[key as keyof typeof config];
            const indicatorColor: string | undefined =
              (color as string) ??
              (item.payload?.color as string | undefined) ??
              (item.color as string | undefined) ??
              "var(--foreground)";

            return (
              <div
                key={`${item.dataKey}-${index}`}
                className={cn(
                  "flex flex-wrap items-stretch gap-2",
                  indicator === "dot" && "items-center"
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-[2px]", {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent":
                        indicator === "dashed",
                    })}
                    style={{
                      backgroundColor: indicatorColor,
                      borderColor: indicatorColor,
                    }}
                  />
                )}
                <div className="flex flex-1 justify-between leading-none items-center">
                  <span className="text-muted-foreground">
                    {(itemCfg?.label as React.ReactNode) ??
                      (item.name as React.ReactNode)}
                  </span>
                  {item.value != null && (
                    <span className="text-foreground font-mono font-medium tabular-nums">
                      {typeof item.value === "number" ||
                      typeof item.value === "bigint"
                        ? item.value.toLocaleString()
                        : String(item.value)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// === Legend ===
export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  payload?: {
    value?: string;
    color?: string;
    dataKey?: string;
    type?: string;
  }[];
  verticalAlign?: "top" | "bottom";
  nameKey?: string;
}) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, i) => {
          const key = nameKey || item.dataKey || "value";
          const itemCfg = config[key as keyof typeof config];
          return (
            <div
              key={`${item.value}-${i}`}
              className="flex items-center gap-1.5"
            >
              {!hideIcon && (
                <div
                  className="h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemCfg?.label}
            </div>
          );
        })}
    </div>
  );
}

// === Exports ===
export { Tooltip as ChartTooltip, Legend as ChartLegend };
