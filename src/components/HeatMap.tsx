"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Calendar02() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      numberOfMonths={12}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm h-5"
    />
  )
}
