// show overall financial summary
import React from "react";
import CustomPieChart from "../Chart/CustomPieChart";
import { BeatLoader } from "react-spinners";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
  loading,
}) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  const hasData =
    totalBalance > 0 || totalIncome > 0 || totalExpense > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      {/* 🔄 LOADER */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : hasData ? (
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`₹${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <p className="text-sm text-gray-500 text-center py-10">
          No financial data available yet
        </p>
      )}
    </div>
  );
};

export default FinanceOverview;
