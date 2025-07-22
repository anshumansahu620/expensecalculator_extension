"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Expense } from "./types";
import { Newspaper, CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onSave: (expense: Expense) => void;
};

export default function ExpenseForm({ onSave }: Props) {
  const [value, setValue] = useState<Expense>({
    cost: 0,
    tag: "",
    date: new Date().toISOString(),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleForm() {
    setIsOpen(!isOpen);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newEntry: Expense = {
      ...value,
      date: new Date().toISOString(),
    };
    onSave(newEntry);
    setValue({ cost: 0, tag: "", date: new Date().toISOString() });
  }

  return (
    <>
      {/* ✅ Animated Button Icon */}
      <Button onClick={toggleForm} className="mb-4 relative w-10 h-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <CircleX />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Newspaper />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* ✅ Animated Form */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.form
            key="expense-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <Input
              type="number"
              value={value.cost}
              onChange={(e) => setValue({ ...value, cost: Number(e.target.value) })}
              placeholder="Enter a number"
            />

            <Input
              list="numbers"
              value={value.tag}
              onChange={(e) => setValue({ ...value, tag: e.target.value })}
              placeholder="Enter or select a tag"
            />
            <datalist id="numbers">
              <option value="Food" />
              <option value="Travel" />
              <option value="Groceries" />
              <option value="Rent" />
            </datalist>

            <Button type="submit" disabled={value.cost === 0 || value.tag.trim() === ""}>
              Save
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}
