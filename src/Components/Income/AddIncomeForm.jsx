//Show add income form
import React, { useState } from "react";
import Input from "../Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome,loading }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Add New Income
      </h2>

      <div className="mb-4 flex justify-start">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <div className="space-y-4">
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="e.g., Salary, Freelance"
          type="text"
        />

        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder="e.g., 500"
          type="number"
          
          className=""
        />

        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          type="date"
        />
      </div>

      <div className="mt-6 ">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-2.5 px-4 rounded-lg transition"
        >
          {loading ? "Income adding..." : "Add Income"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
