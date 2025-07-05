"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
}

export const Chart = ({ transactions }: Props) => {
  const monthlyData = React.useMemo(() => {
    const map = new Map<string, number>();

    transactions.forEach((t) => {
      const month = format(new Date(t.date), "MMM yyyy");
      map.set(month, (map.get(month) || 0) + t.amount);
    });

    // Sort months chronologically
    return Array.from(map.entries())
      .sort(
        ([a], [b]) =>
          new Date("1 " + a).getTime() - new Date("1 " + b).getTime()
      )
      .map(([name, expenses]) => ({ name, expenses }));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="expenses" fill="#6366F1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
