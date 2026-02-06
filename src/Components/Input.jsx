//Show password with toggle
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <div>
      <label className=" text-[13px] text-slate-800"> {label}</label>
      <div className="input-box">
        <input
          className="w-full bg-transparent outline-none"
          type={type === "password" ? (showPass ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPass ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => showPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => showPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
