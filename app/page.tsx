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

export default function Home() {
  const [transactions, dispatch] = useReducer(transactionsReducer, initialState);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

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

  return (
<main className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 max-w-[1280px] mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Personal Finance Visualizer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your expenses and visualize your spending habits.
          </p>
        </div>
        <Button onClick={() => openForm()}>Add Transaction</Button>
      </header>

      <section>
        <Chart transactions={transactions} />
      </section>

      <section>
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
    </main>
  );
}


