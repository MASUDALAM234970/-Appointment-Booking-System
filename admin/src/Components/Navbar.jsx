import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function Navbar() {
  const navigate = useNavigate();
  const atoken = useContext(AdminContext);
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img
          onClick={() => navigate("/")}
          className="w-10 sm:w-14 cursor-pointer"
          src={assets.logol}
          alt="Logo"
        />
        <p className="border px-3 py-1 text-sm rounded-full border-gray-400 bg-gray-100 text-gray-600 font-medium">
          {atoken ? `Admin` : `Doctor`}
        </p>
      </div>
      <button className="bg-primary text-white text-sm font-medium rounded-full px-4 py-1.5 transition-all duration-300 hover:bg-primary-dark">
        Logout
      </button>
    </div>
  );
}
