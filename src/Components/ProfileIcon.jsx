//Select Profile Image
import React, { useRef, useState, useEffect, useContext } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { UserContext } from "../context/userContext";
import CharAvatar from "./Cards/CharAvatar";

const ProfileIcon = ({ image, setImage, setIsImageRemoved }) => {
  const { user } = useContext(UserContext);
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(user?.profilePicture || null);

  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);
    setPreviewURL(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleChoose = () => inputRef.current.click();

  const handleRemove = () => {
    setImage(null);
    setPreviewURL(null);
    setIsImageRemoved(true); // ✅ backend ko bataya
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageRemoved(false);
      setImage(file);
      console.log("Selected file:", file);
    }
  };

  useEffect(() => {
    if (!image && user?.profilePicture) {
      setPreviewURL(user.profilePicture);
    }
  }, [user?.profilePicture]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

     <div className="relative w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-200 shadow-sm flex items-center justify-center">
  {previewURL ? (
    <img
      src={previewURL}
      alt="Profile"
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <CharAvatar
      name={user?.name}
      width="w-20"
      height="h-20"
      style="text-xl"
    />
  )}

  {/* 🔘 ACTION BUTTON */}
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      previewURL ? handleRemove() : handleChoose();
    }}
    className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow transition text-white
      ${previewURL ? "bg-red-500 hover:bg-red-600" : "bg-violet-600 hover:bg-violet-700"}
    `}
    title={previewURL ? "Remove" : "Upload"}
  >
    {previewURL ? <LuTrash size={16} /> : <LuUpload size={16} />}
  </button>
</div>

    </div>
  );
};

export default ProfileIcon;
