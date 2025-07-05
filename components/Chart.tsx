"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
}

export const Chart = ({ transactions }: Props) => {
  const monthlyExpenses = Object.values(
    transactions.reduce((acc, t) => {
      const month = format(new Date(t.date), "MMM yyyy");
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map((amount, i, arr) => ({
    name: Object.keys(arr)[i],
    expenses: amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyExpenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
