import React from "react";
import { MoonLoader } from "react-spinners";

const DeleteAlert = ({ content, onDelete, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto">
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          disabled={loading}
          className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <MoonLoader size={20} color="#fff" /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
