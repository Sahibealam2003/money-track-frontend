//Show last 30 day transaction in line bar chart
import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../Utils/helper";
import CustomBarChart from "../../Components/Chart/CustomBarChart";
import { BeatLoader } from "react-spinners";

const Last30DaysExpenses = ({ data, loading }) => {
  const [chartData, setChartData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  // Prepare chart data
  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([]);
      return;
    }

    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  // Handle loader timing
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 1000); // minimum 1s loader
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const hasData = chartData.length > 0;

  return (
    <div className="card col-span-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Last 30 Days Expenses</h5>
      </div>

      {showLoader ? (
        <div className="flex justify-center items-center h-60">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : hasData ? (
        <CustomBarChart data={chartData} showXAxisTicks={false} />
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="text-sm text-gray-500 text-center">
            No expenses recorded in the last 30 days
          </p>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;
