import React from "react";
// Show transaction (Income / Expense)
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  hideDeleteBtn,
  type,
  amount,
  date,
  title,
  icon,
  onDelete, 
}) => {
  const getAmountStyle = () =>
    type === "income"
      ? "bg-green-50 text-green-500"
      : "bg-red-50 text-rose-500";

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200/60 bg-white hover:bg-gray-50 transition-all">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-lg">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <LuUtensils />
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-800">{title}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold ${getAmountStyle()}`}
        >
          {type === "income" ? "+" : "-"}₹{amount}
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {!hideDeleteBtn && onDelete && (
          <button
            className="text-gray-400 cursor-pointer hover:text-red-500 transition"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
