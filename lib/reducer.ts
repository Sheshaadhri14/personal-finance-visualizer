import { Transaction } from "@/types";

export type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "EDIT_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: { id: string } };

export const initialState: Transaction[] = [
  { id: "1", amount: 75.5, date: "2025-07-01T10:00:00Z", description: "Groceries" },
  { id: "2", amount: 1200, date: "2025-07-01T12:00:00Z", description: "Rent" },
];

export const transactionsReducer = (state: Transaction[], action: Action): Transaction[] => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.payload];
    case "EDIT_TRANSACTION":
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case "DELETE_TRANSACTION":
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
};
