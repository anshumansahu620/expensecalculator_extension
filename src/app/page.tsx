"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,

  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Trash } from "lucide-react";

type expense = {
  cost: number;
  tag: string;
  
  
}

export default function MyComponent() {
  const [value, setValue] = useState<expense>({ cost: 0, tag: "" });

  const [values, setValues] = useState<expense[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("values") || "[]");
    setValues(stored);
  }, []);

  function savetostorage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newEntry: expense = {
      cost: value.cost,
      tag: value.tag,
      
    
    };

    const existing = JSON.parse(localStorage.getItem("values") || "[]");
    existing.push(newEntry);
    localStorage.setItem("values", JSON.stringify(existing));

    // Clear input
    setValue({ cost: 0, tag: "" });
    setValues(existing);
  }

  function deleteValue(index: number) {
    const updated = [...values];
    updated.splice(index, 1); // Remove value at the given index
    localStorage.setItem("values", JSON.stringify(updated));
    setValues(updated); // Update UI
  }

  return (
    <div className="font-sans text-white bg-gray-900 min-h-screen p-8 sm:p-20 flex flex-col items-center justify-start gap-12">
      <form onSubmit={savetostorage} className="flex flex-col gap-4 w-full max-w-md">
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

        <Button type="submit" disabled={value.cost === 0 || value.tag.trim() === ""}>Save</Button>
      </form>

      <Card className="w-full max-w-md bg-gray-900 text-white shadow-lg border border-gray-700">
        <CardHeader className="pb-2 border-b border-gray-700">
          <CardTitle className="text-lg font-semibold text-white">Monthly Expense</CardTitle>
        </CardHeader>

        <CardContent className="py-4">
          {values.length > 0 ? (
            <ul className="space-y-3">
              {values.map((val, index) => (
                <li
                  key={index}
                  className="bg-gray-800 px-4 py-3 rounded flex justify-between items-center shadow-sm border border-gray-700"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400">{val.tag}</span>
                    <span className="text-xl font-semibold text-green-400">₹ {val.cost}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteValue(index)}
                    className="hover:bg-red-600/20 text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No expenses saved yet.</p>
          )}
        </CardContent>

        <CardFooter className="justify-between items-center pt-4 border-t border-gray-700 text-sm text-gray-400">
          <span>Total Entries: {values.length}</span>
          <span>
            ₹{" "}
            {values.reduce((acc, curr) => acc + Number(curr.cost || 0), 0)}
          </span>
        </CardFooter>
      </Card>

    </div>
  );
}
