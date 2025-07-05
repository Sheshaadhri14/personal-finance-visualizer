"use client";
import { useState } from "react";
import { Budget } from "@/types/budget";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/UI/Dialog";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Button } from "@/components/UI/Button";

interface Props {
  onSave: (budget: Budget) => void;
  onClose: () => void;
  existing?: Budget;
}

export const BudgetForm = ({ onSave, onClose, existing }: Props) => {
  const [category, setCategory] = useState(existing?.category || "");
  const [amount, setAmount] = useState(existing?.amount.toString() || "");

  const handleSubmit = () => {
    if (!category || !amount || isNaN(Number(amount))) return;
    onSave({ category, amount: Number(amount) });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existing ? "Edit Budget" : "Set Budget"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
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

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
        <Button
  variant="outline"
  onClick={onClose}
  className="hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
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
