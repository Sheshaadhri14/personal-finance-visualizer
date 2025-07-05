import { Budget } from "@/types/budget";

export type BudgetAction =
  | { type: "SET_BUDGET"; payload: Budget }
  | { type: "REMOVE_BUDGET"; payload: { category: string } };

export const initialBudgets: Budget[] = [];

export const budgetReducer = (state: Budget[], action: BudgetAction): Budget[] => {
  switch (action.type) {
    case "SET_BUDGET": {
      const existing = state.find((b) => b.category === action.payload.category);
      if (existing) {
        return state.map((b) =>
          b.category === action.payload.category ? action.payload : b
        );
      } else {
        return [...state, action.payload];
      }
    }
    case "REMOVE_BUDGET": {
      return state.filter((b) => b.category !== action.payload.category);
    }
    default:
      return state;
  }
};