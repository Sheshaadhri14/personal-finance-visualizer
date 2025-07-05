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
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Food"
            />
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
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
