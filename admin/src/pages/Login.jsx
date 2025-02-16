import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

export default function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password, email);
    try {
      if (state == "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          console.log(data.token);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flexa float-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto ">
          <span className="text-primary space-x-2">{state}</span>
          Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white py-3 rounded w-full px-2 mt-1">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login ?
            <span
              className="text-primary space-x-2 cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              CLick here
            </span>
          </p>
        ) : (
          <p>
            Admin Login ?
            <span
              className="text-primary space-x-2 cursor-pointer"
              onClick={() => setState("Admin")}
            >
              CLick here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
