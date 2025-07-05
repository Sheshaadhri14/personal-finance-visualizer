"use client";
import Image from "next/image";
import { useReducer, useState, useEffect } from "react";
import { transactionsReducer, initialState } from "@/lib/reducer";
import { Transaction } from "@/types";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { Chart } from "@/components/Chart";
import { Button } from "@/components/UI/Button";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { budgetReducer, initialBudgets } from "@/lib/budgetReducer";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetBarChart } from "@/components/BudgetBarChart";
import { Budget } from "@/types/budget";
import { SpendingInsights } from "@/components/SpendingInsights";

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
  const [lastDescription, setLastDescription] = useState("-");

  useEffect(() => {
    const last = transactions[transactions.length - 1]?.description || "-";
    setLastDescription(last);
  }, [transactions]);

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
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-40 mx-auto space-y-10 py-10 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Personal Finance Visualizer</h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
            Track your expenses and visualize your spending habits.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => openForm()}
            className="hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black transition-colors"
          >
            Add Transaction
          </Button>
          <Button
            variant="outline"
            className="hover:bg-gray-800 hover:border-gray-600 dark:hover:bg-gray-100 dark:hover:border-gray-300 hover:text-white dark:hover:text-black"
            onClick={() => setBudgetFormOpen(true)}
          >
            Set Budget
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[{
          title: "Total Expenses",
          value: `₹${transactions.reduce((sum, t) => sum + Number(t.amount), 0)}`
        }, {
          title: "Top Category",
          value: getMostSpentCategory(transactions)
        }, {
          title: "Last Transaction",
          value: lastDescription
        }].map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{card.title}</h3>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Monthly Expenses</h2>
          <Chart transactions={transactions} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Category Breakdown</h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Budget vs Actual</h2>
        <BudgetBarChart budgets={budgets} transactions={transactions} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Spending Insights</h2>
        <SpendingInsights budgets={budgets} transactions={transactions} />
      </section>

      <section className="w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Transactions</h2>

  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <TransactionList
      transactions={transactions}
      onEdit={openForm}
      onDelete={deleteTxn}
    />
  </div>
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