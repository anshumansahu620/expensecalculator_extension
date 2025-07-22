"use client";

import React, { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";
import { Expense } from "@/components/types";

export default function MyComponent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("values") || "[]");
    setExpenses(stored);
  }, []);

  function handleSave(newExpense: Expense) {
    const updated = [...expenses, newExpense];
    localStorage.setItem("values", JSON.stringify(updated));
    setExpenses(updated);
  }

  function handleDelete(index: number) {
    const updated = [...expenses];
    updated.splice(index, 1);
    localStorage.setItem("values", JSON.stringify(updated));
    setExpenses(updated);
  }

  return (
    <div className="font-sans text-white h-screen overflow-hidden mt-[-3] sm:p-20 flex flex-row items-start justify-between gap-12">
  <ExpenseForm onSave={handleSave} />
  <ExpenseCard expenses={expenses} onDelete={handleDelete} />
</div>

  );
}
