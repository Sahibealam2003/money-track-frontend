import React from "react";
//Repersent data into Graph Chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data, showXAxisTicks = true }) => {
  
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart key={data.length} data={data}>
        <CartesianGrid stroke="none" />
        
        
        <XAxis
          dataKey="day"
          stroke="#e5e7eb"
          tick={showXAxisTicks ? { fontSize: 12, fill: "#555" } : false}
        />
        
        <YAxis stroke="#e5e7eb" tick={{ fontSize: 12, fill: "#555" }} />
        
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        />
        
        <Bar
          dataKey="amount"
          radius={[10, 10, 0, 0]}
          isAnimationActive
          animationDuration={1200}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
