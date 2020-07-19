import * as FileSystem from "expo-file-system";

import { insertExpense, fetchExpenses } from "../helpers/db";

export const ADD_EXPENSE = "ADD_EXPENSE";
export const SET_EXPENSES = "SET_EXPENSES";

export const addExpense = (title, image, amount, comment) => {
  const time = new Date().toISOString();
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertExpense(title, time, newPath, amount, comment);
      // console.log(dbResult);
      dispatch({
        type: ADD_EXPENSE,
        expenseData: {
          id: dbResult.insertId,
          title: title,
          time: time,
          image: newPath,
          amount: amount,
          comment: comment,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadExpenses = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchExpenses();
      // console.log(dbResult);
      dispatch({ type: SET_EXPENSES, expenses: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
