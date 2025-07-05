
"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Transaction } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/UI/Dialog";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Button } from "@/components/UI/Button";

interface Props {
  transaction?: Transaction | null;
  onSave: (transaction: Transaction) => void;
  onClose: () => void;
}

export const TransactionForm: React.FC<Props> = ({ transaction, onSave, onClose }) => {
  const [amount, setAmount] = useState(transaction?.amount.toString() || "");
  const [date, setDate] = useState(
    transaction ? format(new Date(transaction.date), "yyyy-MM-dd") : ""
  );
  const [description, setDescription] = useState(transaction?.description || "");
  const [category, setCategory] = useState(transaction?.category || ""); // New state for category
  // Assuming category is part of Transaction type
  const [errors, setErrors] = useState<{ amount?: string; date?: string; description?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!date) {
      newErrors.date = "Date is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      id: transaction?.id || crypto.randomUUID(),
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      description: description.trim(),
      category: category.trim() || "Uncategorized", // Default category if not provided
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 50.00"
            />
            {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Coffee"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
          <div>
  <Label htmlFor="category">Category</Label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border rounded-md px-3 py-2 mt-1 bg-white dark:bg-gray-900 dark:text-white"
    required
  >
    <option value="">Select a category</option>
    <option value="Food">Food</option>
    <option value="Rent">Rent</option>
    <option value="Utilities">Utilities</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Travel">Travel</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Other">Other</option>
  </select>
</div>

        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
<Button
  variant="outline"
  onClick={onClose}
  className="transition-colors hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
>
  Cancel
</Button>

<Button
  onClick={handleSubmit}
  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
>
  Save
</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
