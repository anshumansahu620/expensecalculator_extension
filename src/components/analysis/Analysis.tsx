"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/components/types";
import DonutChart from "@/components/PieChart";

type Data = {
  total: number;
  tag: string;
};

export default function AnalyticsChart() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [data, setData] = useState<Data[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("values") || "[]");

    setExpenses(stored);
  }, []);
  useEffect(() => {
    const newdata = JSON.parse(localStorage.getItem("analytics-data") || "[]");

    setData(newdata);
  }, []);

  function saveToStorage(updatedData: Data[]) {
      
      localStorage.setItem("analytics-data", JSON.stringify(updatedData));
      setData(updatedData);
    }

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
    })

  
  
  
  );

    setData(result);
    saveToStorage(result)
  }, [expenses]);

  const displayData:Data[]=data;
    
  


  

  return (
    <div className="max-h-64 w-100"><DonutChart data={data} /></div>
  );
}
