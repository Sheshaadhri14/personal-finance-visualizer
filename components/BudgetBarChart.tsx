"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Budget } from "@/types/budget";
import { Transaction } from "@/types";

interface Props {
  budgets: Budget[];
  transactions: Transaction[];
}

export const BudgetBarChart = ({ budgets, transactions }: Props) => {
  const data = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      category: b.category,
      Budgeted: b.amount,
      Spent: spent,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Budgeted" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Spent" fill="#EF4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
