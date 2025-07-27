"use client";

import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer, PieLabelRenderProps } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

// Your data format
type Data = {
  total: number;
  tag: string;
};

type Props = {
  data: Data[];
};

// Define your own color palette
const COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#14b8a6", // teal
  "#f43f5e", // rose
  "#218663ff", // blue
  "#bca20dff", // blue
  "#59b219ff", // blue
];

export default function DonutChart({ data }: Props) {
  const total = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>Summarized view of totals by tag</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 ">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="tag"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                  <>
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-xl font-bold"
                    >
                      ₹{total.toLocaleString()}
                    </text>
                    <text
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 20}
                      textAnchor="middle"
                      className="fill-muted-foreground text-sm"
                    >
                      Total
                    </text>
                  </>
                )}}}/>
              
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        
        <div className="text-muted-foreground leading-none">
          Based on your categorized expenses
        </div>
      </CardFooter>
    </Card>
  );
}
