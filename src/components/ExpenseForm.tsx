"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Expense } from "./types";
import { Newspaper, ChartPie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnalyticsChart from "./analysis/Analysis";
import { Card } from "./ui/card";

type Props = {
  onSave: (expense: Expense) => void;
};

export default function ExpenseForm({ onSave }: Props) {
  const [value, setValue] = useState<Expense>({
    cost: "",
    tag: "",
    date: new Date().toISOString(),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false)


  function toggleForm() {
    setIsOpen(!isOpen);
  }



  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    const newEntry: Expense = {
      cost: value.cost,
      tag: value.tag.toUpperCase(),
      date: new Date().toISOString(),
    };

    onSave(newEntry);
    setValue({ cost: "", tag: "", date: new Date().toISOString() });
  }

  return (

    <>
      {/* Animate icon switch */}
      <Button onClick={toggleForm} className="mb-4 relative w-10 h-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isOpen ? <ChartPie /> : <Newspaper />}
          </motion.span>
        </AnimatePresence>
      </Button>

      <AnimatePresence mode="wait">
  {isOpen ? (
    <motion.form
      key="form"
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <Card className="p-4">
        <Input
          type="number"
          value={value.cost}
          onChange={(e) => setValue({ ...value, cost: e.target.value })}
          placeholder="Enter a number"
          className="border-[var(--muted-foreground)]"
        />

        <Input
          list="numbers"
          value={value.tag}
          onChange={(e) => setValue({ ...value, tag: e.target.value })}
          placeholder="Enter or select a tag"
          className="border-[var(--muted-foreground)]"
        />
        <datalist id="numbers">
          <option value="Food" />
          <option value="Travel" />
          <option value="Groceries" />
          <option value="Rent" />
        </datalist>

        <Button
          type="submit"
          disabled={value.cost === "" || value.tag.trim() === ""}
        >
          Save
        </Button>
      </Card>
    </motion.form>
  ) : (
    <motion.div
      key="div"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <AnalyticsChart />
     
    </motion.div>
  )}
</AnimatePresence>

    </>


  );
}
