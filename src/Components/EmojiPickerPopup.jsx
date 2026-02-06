//Show popup to select the emoji
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center gap-3 cursor-pointer border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl overflow-hidden">
          {icon ? (
            <img src={icon} alt="Icon" className="w-6 h-6" />
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-sm font-medium text-gray-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-3">
          <button
            className="absolute top-2 right-2 z-50 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 shadow transition"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
