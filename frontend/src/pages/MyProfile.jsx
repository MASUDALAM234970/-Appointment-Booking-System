import React, { useState } from "react";
import { assets } from "../assets/assets"; // Adjust to the correct path

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    Image: assets.profile_pic || "https://via.placeholder.com/150",
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2024-07-20",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Profile Section */}
      <div className="flex items-center justify-center">
        <img
          className="w-24 h-24 rounded-full border border-gray-300"
          src={userData.Image}
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        {isEdit ? (
          <input
            className="border p-2 rounded w-full text-center"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Full Name"
          />
        ) : (
          <p className="text-xl font-bold">{userData.name}</p>
        )}
      </div>

      {/* Contact Information */}
      <hr className="my-4" />
      <div>
        <p className="text-gray-700 font-medium">CONTACT INFORMATION</p>
        <div className="mt-2">
          <p>Email Id:</p>
          {isEdit ? (
            <input
              className="border p-2 rounded w-full"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email Address"
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}
          <p className="mt-2">Phone:</p>
          {isEdit ? (
            <input
              className="border p-2 rounded w-full"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Phone Number"
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <hr className="my-4" />
      <div>
        <p className="text-gray-700 font-medium">ADDRESS</p>
        {isEdit ? (
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={userData.address.line1}
            onChange={(e) =>
              setUserData({
                ...userData,
                address: { ...userData.address, line1: e.target.value },
              })
            }
            placeholder="Address Line"
          />
        ) : (
          <p>{userData.address.line1}</p>
        )}
      </div>

      {/* Gender Section */}
      <hr className="my-4" />
      <div>
        <p className="text-gray-700 font-medium">GENDER</p>
        {isEdit ? (
          <select
            className="border p-2 rounded w-full"
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}
      </div>

      {/* Date of Birth */}
      <hr className="my-4" />
      <div>
        <p className="text-gray-700 font-medium">DATE OF BIRTH</p>
        {isEdit ? (
          <input
            className="border p-2 rounded w-full"
            type="date"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
          />
        ) : (
          <p>
            {new Date(userData.dob).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 border rounded hover:bg-gray-100"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save information" : "Edit"}
        </button>
      </div>
    </div>
  );
}
