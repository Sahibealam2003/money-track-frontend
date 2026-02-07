//Show all recent transation income + expense
import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { BeatLoader } from "react-spinners";

const RecentTransctions = ({ transactions = [], onSeeMore, loading }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        {!loading && transactions.length > 0 && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onSeeMore}
          >
            See All
            <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      {/* 🔥 LOADING FIRST */}
      {loading ? (
        <div className="flex justify-center h-40 items-center">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : transactions.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {transactions.slice(0, 4).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-6">
          No transactions done yet
        </p>
      )}
    </div>
  );
};


export default RecentTransctions;
