import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Expense } from "./types";

type Props = {
  expense: Expense;
  onDelete: () => void;
};

export default function ExpenseItem({ expense, onDelete }: Props) {
  return (
    <li className=" px-4 py-3 rounded flex justify-between items-center shadow-sm border border-gray-700">
      <div className="flex flex-col">
        <div className="flex justify-between text-xs text-gray-400 gap-x-10">
          <span>{expense.tag}</span>
          <span>{new Date(expense.date).toLocaleDateString()}</span>
        </div>
        <span className="text-sm font-semibold text-green-400">
          ₹ {expense.cost}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="hover:bg-red-600/20 text-red-500"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </li>
  );
}
