"use client";

import React from "react";
import { ViewAnalyticsChartProps } from "./ViewAnalytics.types";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartConfig } from "@/components/ui/chart-container";
export const description = "A donut chart with text";

const chartData = [
  { browser: "unique", visitors: 275, fill: "var(--color-unique)" },
  { browser: "repeat", visitors: 200, fill: "var(--color-repeat)" },
];
const chartConfig = {
  visitors: {
    label: "Contraseñas",
  },
  unique: {
    label: "Unicas",
    color: "var(--chart-3)",
  },
  repeated: {
    label: "Repetidas",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function ViewAnalyticsChart(props: ViewAnalyticsChartProps) {
  const { unique, repeated } = props;
  const totalPasswords = unique + repeated;

  const chartData = [
    { browser: "unique", visitors: unique, fill: "var(--color-unique)" },
    { browser: "repeated", visitors: repeated, fill: "var(--color-repeat)" },
  ];
  return (
    <div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Contraseñas</CardTitle>
          <CardDescription>Repetidas | Unicas</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalPasswords.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Contraseñas
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Mejora tus contraseñas con el generador{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Utiliza mejores contraseñas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
