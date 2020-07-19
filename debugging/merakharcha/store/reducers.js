import { ADD_EXPENSE, SET_EXPENSES } from "./actions";
import Expense from "../models/expense";

const initialState = {
  expenses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        expenses: action.expenses.map(
          (e) =>
            new Expense(
              e.id.toString(),
              e.title,
              e.time,
              e.imageUri,
              e.amount,
              e.comment
            )
        ),
      };
    case ADD_EXPENSE:
      const newExpense = new Expense(
        action.expenseData.id.toString(),
        action.expenseData.title,
        action.expenseData.time,
        action.expenseData.image,
        action.expenseData.amount,
        action.expenseData.comment
      );
      return {
        expenses: state.expenses.concat(newExpense),
      };
    default:
      return state;
  }
};
