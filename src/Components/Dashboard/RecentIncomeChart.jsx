//Show 60 Day Income in pie chart
import React, { useEffect, useState } from "react";
import CustomPieChart from "../Chart/CustomPieChart";
import { BeatLoader } from "react-spinners";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

const RecentIncomeChart = ({ data, totalIncome ,loading}) => {
  const [chartData, setChartData] = useState([]);
 const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([]);
      return;
    }

    const aggregation = data
      .filter(item => item.amount > 0)
      .reduce((acc, item) => {
        const key = item.source || "Other";
        acc[key] = (acc[key] || 0) + item.amount;
        return acc;
      }, {});

    const preparedData = Object.keys(aggregation).map(key => ({
      name: key,
      amount: aggregation[key],
    }));

    setChartData(preparedData);
  }, [data]);

  const hasData = chartData.length > 0 && totalIncome > 0;

  useEffect(() => {
      if (loading) {
        setShowLoader(true);
      } else {
        const timer = setTimeout(() => setShowLoader(false), 1000);
        return () => clearTimeout(timer);
      }
    }, [loading]);
  return (
    <div className="card w-full">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : 
      hasData ? (
        <div className="w-full h-95">
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`₹${totalIncome}`}
            showTextAnchor
            colors={COLORS}
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-10">
          No income recorded in the last 60 days
        </p>
      )}
    </div>
  );
};

export default RecentIncomeChart;
