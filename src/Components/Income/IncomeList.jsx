//Show income list
import React, { useEffect, useState } from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import { BeatLoader } from "react-spinners";

const IncomeList = ({ transactions, onDelete, onDownload ,loading}) => {
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
        <h5 className="text-lg">Income Sources</h5>

      {transactions.length ? (
          <button
          className="card-btn"
          onClick={onDownload}
          disabled={!hasData}
        >
          <LuDownload className="text-base" /> Download
        </button>
      ) : ""}
      </div>

      {showLoader ? (
         <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : (
        hasData ? (
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
          {transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-10">
          No income records found
        </p>
      )
      )}
    </div>
  );
};

export default IncomeList;
