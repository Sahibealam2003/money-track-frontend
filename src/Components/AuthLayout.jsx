//Layout of Auth page
import React from "react";
import Image_1 from "../assets/Images/Image_1.png";
import { LuTrendingDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex  w-screen  overflow-hidden">

      <div className="w-full md:w-[60vw] px-12 py-6 flex flex-col justify-start overflow-y-auto">
        <h2 className="text-lg font-semibold text-black mb-6">Money Tracker</h2>
        {children}
      </div>

     
      <div
        className="hidden md:flex w-[40vw] h-[90vh] mt-5 bg-violet-50  relative overflow-hidden 
  items-center 
  justify-center
"
      >
        
        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-[40px] bg-purple-600 absolute -top-10 -left-10 opacity-90"></div>

        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-[40px] border-18 border-fuchsia-600 absolute top-[35%] right-6 opacity-80"></div>

        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-[40px] bg-violet-500 absolute -bottom-12 -left-12 opacity-90"></div>

        
        <div className="absolute top-8 left-8 z-20 scale-90 lg:scale-100">
          <StatsInfoCard
            icon={<LuTrendingDown />}
            label="Track your money"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        <img
          src={Image_1}
          alt="Auth Illustration"
          className="
      w-[70%] 
      max-w-md 
      absolute 
      bottom-8 
      lg:bottom-12 
      drop-shadow-xl
    "
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex w-[70vh] items-center gap-4 bg-white p-4 rounded-2xl shadow-md shadow-purple-400/10 border border-gray-200/50">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1 tracking-wide">{label}</p>
        <h6 className="text-lg font-semibold text-gray-900">{value}</h6>
      </div>
    </div>
  );
};
