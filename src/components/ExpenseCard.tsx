import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Expense } from "./types";
import ExpenseList from "./ExpenseList";
import { useState,useEffect } from "react";

type Props = {
  expenses: Expense[];
  onDelete: (index: number) => void;
};

export default function ExpenseCard({ expenses, onDelete }: Props) {
  const total = expenses.reduce((acc, curr) => acc + Number(curr.cost), 0);
  const [date,setDate]=useState<string>("")
  function getDay(){
    const today = new Date();
    const formattedDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  return formattedDate;

  }
  useEffect(()=>{
    setDate(getDay);
  },[])


  return (
    <Card className="w-full max-w-md  text-white shadow-lg border border-gray-700 h-[500px] flex flex-col">
      <CardHeader className="pb-2 border-b border-gray-700">
        <CardTitle className="text-lg font-semibold text-white">Monthly Expense</CardTitle>
        <CardTitle className="text-lg font-semibold text-[#dddddd]">Date:{date}</CardTitle>
      </CardHeader>

      <CardContent className="py-4 overflow-auto flex-1 border-white">
        {expenses.length > 0 ? (
          <ExpenseList expenses={expenses} onDelete={onDelete} />
        ) : (
          <p className="text-gray-500 italic">No expenses saved yet</p>
        )}
      </CardContent>

      <CardFooter className="justify-between items-center pt-4 border-t border-gray-700 text-sm text-gray-400">
        <span>Total Entries: {expenses.length}</span>
        <span>₹ {total}</span>
      </CardFooter>
    </Card>
  );
}
