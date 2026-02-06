// Show recent Expense transactions
import moment from "moment";
import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../Components/Cards/TransactionInfoCard";
import { BeatLoader } from "react-spinners";

const ExpenseTransactions = ({ transactions = [], onSeeMore, loading }) => {
  const [showLoader, setShowLoader] = useState(true);

  const expenseTransactions = transactions

  const hasExpenses = expenseTransactions.length > 0;

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        {hasExpenses && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onSeeMore}
          >
            See All
            <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      {/* Loader */}
      {showLoader ? (
        <div className="flex justify-center mt-10 h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {hasExpenses ? (
            expenseTransactions.slice(0, 4).map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.category}   // ✅ expense category only
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="expense"
                hideDeleteBtn
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">
              No expense transactions yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseTransactions;
