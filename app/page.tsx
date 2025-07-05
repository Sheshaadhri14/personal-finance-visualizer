"use client";
import Image from "next/image";
import { useReducer, useState } from "react";
import { transactionsReducer, initialState } from "@/lib/reducer";
import { Transaction } from "@/types";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { Chart } from "@/components/Chart";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { budgetReducer, initialBudgets } from "@/lib/budgetReducer";
import {BudgetForm}  from "@/components/BudgetForm";
import { BudgetBarChart } from "@/components/BudgetBarChart";
import { Budget } from "@/types/budget";

function getMostSpentCategory(transactions: Transaction[]): string {
  const map = new Map<string, number>();
  transactions.forEach((t) => {
    const category = t.category?.trim();
    if (category) {
      map.set(category, (map.get(category) || 0) + t.amount);
    }
  });
  const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "-";
}

export default function Home() {
  const [transactions, dispatch] = useReducer(transactionsReducer, initialState);
  const [budgets, dispatchBudget] = useReducer(budgetReducer, initialBudgets);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);

  const openForm = (txn?: Transaction) => {
    setEditing(txn ?? null);
    setFormOpen(true);
  };

  const saveTxn = (txn: Transaction) => {
    dispatch({ type: editing ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload: txn });
    setFormOpen(false);
  };

  const deleteTxn = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: { id } });
  };

  const saveBudget = (budget: Budget) => {
    dispatchBudget({ type: "SET_BUDGET", payload: budget });
    setBudgetFormOpen(false);
  };

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-40 mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Personal Finance Visualizer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your expenses and visualize your spending habits.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => openForm()}>Add Transaction</Button>
          <Button variant="outline" onClick={() => setBudgetFormOpen(true)}>Set Budget</Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
          <h3 className="text-sm text-gray-500">Total Expenses</h3>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            ₹{transactions.reduce((sum, t) => sum + Number(t.amount), 0)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
          <h3 className="text-sm text-gray-500">Top Category</h3>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {getMostSpentCategory(transactions)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
          <h3 className="text-sm text-gray-500">Last Transaction</h3>
          <p className="text-sm text-gray-900 dark:text-white">
            {transactions[transactions.length - 1]?.description || "-"}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Monthly Expenses</h2>
          <Chart transactions={transactions} />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Category Breakdown</h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Budget vs Actual</h2>
        <BudgetBarChart budgets={budgets} transactions={transactions} />
      </section>

      <section className="w-full">
        <TransactionList
          transactions={transactions}
          onEdit={openForm}
          onDelete={deleteTxn}
        />
      </section>

      {formOpen && (
        <TransactionForm
          transaction={editing}
          onSave={saveTxn}
          onClose={() => setFormOpen(false)}
        />
      )}

      {budgetFormOpen && (
        <BudgetForm
          onSave={saveBudget}
          onClose={() => setBudgetFormOpen(false)}
        />
      )}
    </main>
  );
}
