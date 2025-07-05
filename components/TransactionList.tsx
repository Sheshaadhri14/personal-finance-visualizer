"use client";
import { Transaction } from "@/types";
import { format } from "date-fns";
import { Button } from "@/components/UI/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/UI/Table";

interface Props {
  transactions: Transaction[];
  onEdit: (txn: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<Props> = ({ transactions, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(t.date), "MMM d, yyyy")}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">${t.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => onEdit(t)}>
                      ✏️
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={() => onDelete(t.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No transactions yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
