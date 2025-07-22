import { Expense } from "./types";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Expense[];
  onDelete: (index: number) => void;
};

export default function ExpenseList({ expenses, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {expenses.map((expense, index) => (
        <ExpenseItem key={index} expense={expense} onDelete={() => onDelete(index)} />
      ))}
    </ul>
  );
}
