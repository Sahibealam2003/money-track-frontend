//Show Add Expense form
import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Input";

const AddExpenseForm = ({ onAddExpense,loading }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Add New Expense
      </h2>

      <div className="mb-4 flex justify-start">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <div className="space-y-4">
        <Input
          value={income.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Category"
          placeholder="Rent, Groceries, etc"
          type="text"
        />

        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder="e.g., 500"
          type="number"
        />

        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder=""
          type="date"
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          disabled={loading}
          onClick={() => onAddExpense(income)}
          className="w-full bg-red-600 cursor-pointer hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2.5 px-4 rounded-lg transition"
        >
          {loading ? "Expense adding..." : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
