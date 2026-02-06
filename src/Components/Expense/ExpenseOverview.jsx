//Show all expenses in line chart
import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../Utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Chart/CustomLineChart";
import { BeatLoader } from "react-spinners";

const ExpenseOverview = ({ transactions, onAddExpense ,loading}) => {
  const [chartData, setChartData] = useState([]);
const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  const hasData = transactions && transactions.length > 0;

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
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your spending trends over time and gain insights into
            where your money goes.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="flex cursor-pointer items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          <LuPlus className="text-base" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        {
          showLoader ? (
            <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
          ) : (
            hasData ? (
          <CustomLineChart data={chartData} />
        ) : (
          <p className="text-center text-gray-500 py-10">
            No expense data available.
          </p>
        )
          )
        }
      </div>
    </div>
  );
};

export default ExpenseOverview;
