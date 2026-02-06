//Side Menu
import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA } from "../Utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import CharAvatar from "./Cards/CharAvatar";
import ProfileEditModal from "./ProfileEditModal";

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  
  const [imageError, setImageError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
    onClose?.();
  };
  const hasProfileImage =
    user?.profilePicture  &&
    user.profilePicture !== "null" &&
    user.profilePicture !== "undefined" &&
    !imageError;

 useEffect(() => {
  setImageError(false);
}, [user?.profilePicture]);


  return (
    <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-md flex flex-col">
      <div className="flex flex-col items-center py-6 border-b border-gray-200">
        {hasProfileImage ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            onError={() => setImageError(true)}
            className="w-20 h-20 rounded-full object-cover border-2 border-violet-500"
          />
        ) : (
          <CharAvatar
            name={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="mt-3 text-sm font-semibold text-gray-800">
          {user?.name || ""}
        </h5>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 text-xs text-violet-600 hover:underline"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex-1 mt-4 flex flex-col gap-1">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full cursor-pointer flex items-center gap-3 text-sm px-6 py-3 transition-all ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {modalOpen && <ProfileEditModal closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default SideMenu;
