//Layout of dashboard
import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

 if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="bg-gray-50 overflow-hidden ">
      <div className="fixed top-0 left-0 right-0 h-16 z-20">

        <Navbar activeMenu={activeMenu} />
      </div>

      <div className="mt-10">
        {user && (
          <div className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

         <div
          className={`overflow-y-auto px-5
          ${user ? "min-[1080px]:ml-64" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
