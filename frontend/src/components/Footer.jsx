import React from "react";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className=" text-gray-800 py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-start">
        {/* Left Section */}
        <div className="space-y-4">
          <img className="w-40" src={assets.logol} alt="Logo" />
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui quod
            dicta deleniti error nisi enim, asperiores dolores voluptates ipsum
            laborum!
          </p>
        </div>

        {/* Center Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">About Us</li>
            <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-500 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-gray-700">📞 +8801793914165</li>
            <li className="text-gray-700">📧 mdmasudalam2349@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* Copyright Section */}
      <div className="text-center text-gray-600 text-sm">
        Copyright © {new Date().getFullYear()} Alam - All Rights Reserved |{" "}
        {new Date().toLocaleString()}
      </div>
    </footer>
  );
}
