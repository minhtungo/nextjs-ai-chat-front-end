"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { FC } from "react";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type SubjectsData = {
  subject: string;
  count: unknown;
};

interface SubjectsChartProps {
  subjectsData: SubjectsData[];
}

const SubjectsChart: FC<SubjectsChartProps> = ({ subjectsData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={subjectsData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SubjectsChart;
