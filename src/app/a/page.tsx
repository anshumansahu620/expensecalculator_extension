"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Expense = {
  cost: number
  tag: string
  date: string
}

export default function ExpenseDonutChart() {
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [chartData, setChartData] = React.useState<
    { tag: string; cost: number; fill: string }[]
  >([])

  // Optional: You can use CSS variables or static colors
  const colors = [
    "#6EE7B7", // green
    "#93C5FD", // blue
    "#FCA5A5", // red
    "#FCD34D", // yellow
    "#C4B5FD", // purple
    "#F9A8D4", // pink
  ]

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("values") || "[]")
    setExpenses(stored)

    // Calculate totals by tag
    const totals: Record<string, number> = {}
    stored.forEach((exp: Expense) => {
      totals[exp.tag] = (totals[exp.tag] || 0) + exp.cost
    })

    // Convert to chart data
    const chartFormatted = Object.entries(totals).map(([tag, cost], i) => ({
      tag,
      cost,
      fill: colors[i % colors.length],
    }))

    setChartData(chartFormatted)
  }, [])

  const totalCost = React.useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.cost, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Distribution</CardTitle>
        <CardDescription>By Tag (from LocalStorage)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="cost"
              nameKey="tag"
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
                          ₹{totalCost.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Analysis of your spending habits <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Data is auto-loaded from localStorage
        </div>
      </CardFooter>
    </Card>
  )
}
