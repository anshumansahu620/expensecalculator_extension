"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/components/types";
import { ChartContainer,type ChartConfig } from "@/components/ui/chart";
import { Bar,BarChart } from "recharts";

type Data = {
  total: number;
  tag: string;
};

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [data, setData] = useState<Data[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("values") || "[]");
    setExpenses(stored);
  }, []);

  // Group by tag and calculate totals
  useEffect(() => {
    const grouped: { [tag: string]: number } = expenses.reduce((acc, expense) => {
      const key = expense.tag;
      const amount = parseFloat(expense.cost); // convert to number

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += isNaN(amount) ? 0 : amount;
      return acc;
    }, {} as { [tag: string]: number });

    const result: Data[] = Object.entries(grouped).map(([tag, total]) => ({
      tag,
      total,
    }));

    setData(result);
  }, [expenses]);


  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Expenses Summary</h1>
      <ul className="mb-6">
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.tag}</strong>: ₹{item.total.toFixed(2)}
          </li>
        ))}
      </ul>

      
    </div>
  );
}
