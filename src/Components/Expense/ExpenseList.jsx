//Show expense List
import React, { useEffect, useState } from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import { BeatLoader } from "react-spinners";

const ExpenseList = ({ transactions, onDelete, onDownload, loading }) => {
  const hasData = transactions && transactions.length > 0;
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>

       {transactions.length  ? (
         <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
       ) :" "}
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {hasData ? (
            transactions.map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense._id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No expenses recorded yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
