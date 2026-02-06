//Show income in bar chart
import React, { useEffect, useState } from "react";
import CustomBarChart from "../Chart/CustomBarChart";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../Utils/helper";
import { BeatLoader } from "react-spinners";

const IncomeOverview = ({ transactions, onAddIncome ,loading }) => {
  const [chartData, setChartData] = useState([]);
const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const result = prepareIncomeBarChartData(transactions);
      setChartData(result);
    } else {
      setChartData([]);
    }
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
            Income Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your income sources.
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          <LuPlus className="text-base" />
          Add Income
        </button>
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : (
        <div className="mt-10">
        {hasData ? (
          <CustomBarChart data={chartData} showXAxisTicks={true} />
        ) : (
          <p className="text-center text-gray-500 py-20">
            No income data available. Click "Add Income" to get started.
          </p>
        )}
      </div>
      )}
    </div>
  );
};

export default IncomeOverview;
