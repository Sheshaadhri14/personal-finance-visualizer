"use client";
import { Transaction } from "@/types";
import { Budget } from "@/types/budget";
import { format } from "date-fns";

interface Props {
  transactions: Transaction[];
  budgets: Budget[];
}

export const SpendingInsights: React.FC<Props> = ({ transactions, budgets }) => {
  const currentMonth = format(new Date(), "yyyy-MM");

  const insights = budgets.map((budget) => {
    const spent = transactions
      .filter(
        (t) =>
          t.category === budget.category &&
          format(new Date(t.date), "yyyy-MM") === currentMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = budget.amount - spent;
    const percentage = Math.min(Math.round((spent / budget.amount) * 100), 100);

    return {
      category: budget.category,
      spent,
      remaining,
      percentage,
      overBudget: spent > budget.amount,
    };
  });

  return (
    <div className="space-y-4">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.category}
            className={`p-4  rounded-md shadow-sm border ${
              insight.overBudget
                ? "bg-red-50 border-red-400 dark:bg-red-900/30"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            }`}
          >
            
            <div className="flex justify-between mb-1">
              <span className="text-base text-xl font-semibold text-gray-700 dark:text-gray-300">
                {insight.category}
              </span>
              <span
                className={`text-lg font-semibold ${
                  insight.overBudget
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {insight.overBudget
                  ? `Over by ₹${Math.abs(insight.remaining)}`
                  : `₹${insight.remaining} left`}
              </span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
              Spent: ₹{insight.spent} / ₹{
                budgets.find((b) => b.category === insight.category)?.amount
              }
            </p>

            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
              <div
                className={`h-2 rounded transition-all ${
                  insight.overBudget ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${Math.max(insight.percentage, 4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
