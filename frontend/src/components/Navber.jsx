import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={assets.logol}
        alt="Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* Profile and Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <img
              className="w-12 rounded-full"
              src={userData?.image || assets.profile_pic}
              alt="Profile"
            />
            <img
              className="w-3.5"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white z-50 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img className="w-20" src={assets.logol} alt="Logo" />
          <img
            onClick={() => setShowMenu(false)}
            className="w-6 cursor-pointer"
            src={assets.cross_icon}
            alt="Close Icon"
          />
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col items-start px-6 py-4 gap-4 font-medium">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setShowMenu(false)}
              className="hover:text-primary transition"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/doctors"}
              onClick={() => setShowMenu(false)}
              className="hover:text-primary transition"
            >
              ALL DOCTORS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              onClick={() => setShowMenu(false)}
              className="hover:text-primary transition"
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              onClick={() => setShowMenu(false)}
              className="hover:text-primary transition"
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
