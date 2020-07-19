// import { SQLite } from 'expo-sqlite';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("expenses.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL,time TEXT NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL,amount REAL NOT NULL,comment TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertExpense = (title, time, imageUri, amount, comment) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO expenses (title,time, imageUri,amount,comment) VALUES (?, ?, ?, ?, ?);`,
        [title,time, imageUri, amount, comment],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchExpenses = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM expenses",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
