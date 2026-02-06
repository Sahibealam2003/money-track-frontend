import React from "react";
import { BeatLoader } from "react-spinners";

const InfoCard = ({ icon, label, color, value }) => {
  const isLoading = value === null || value === undefined;

  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[24px] text-white ${color} rounded-xl`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 font-medium">{label}</span>

        {isLoading ? (
          <div className="mt-1">
            <BeatLoader size={8} color="#7C3AED" />
          </div>
        ) : (
          <span className="text-xl font-semibold text-gray-900">
            ₹{value}
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
