"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Expense } from "./types";
import { Newspaper,CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

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
      cost:value.cost,
      tag:value.tag,
      date: new Date().toISOString(),
    };

    onSave(newEntry);
    setValue({ cost: "", tag: "", date: new Date().toISOString() });
  }

  return (

    <>
      <Button onClick={toggleForm} className="mb-4">
        {isOpen ? <CircleX /> : <Newspaper/>}
      </Button>
      {isOpen && (
         <AnimatePresence>
        <motion.form 
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
          onChange={(e) => setValue({ ...value, cost: (e.target.value) })}
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

        <Button type="submit" disabled={value.cost === "" || value.tag.trim() === ""}>
          Save
        </Button>
      </motion.form>
      </AnimatePresence>)}
    </>
  );
}
