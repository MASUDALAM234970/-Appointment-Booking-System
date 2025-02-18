import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data?.success) {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          toast.success(data?.message);
        } else {
          toast.error(data?.message || "Signup failed");
        }
      } else {
        // Added 'await' for login
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data?.success) {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          toast.success(data?.message);
        } else {
          toast.error(data?.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={OnSubmitHandler}>
      <div className="flex flex-col m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Create Account" : "Login"} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </div>
        )}

        <div className="w-full mt-4">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        </div>

        <div className="w-full mt-4">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        </div>

        <button
          type="submit"
          className={`${
            !email || !password || (state === "Sign Up" && !name)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded mt-4`}
          disabled={!email || !password || (state === "Sign Up" && !name)}
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p
          className="text-blue-500 cursor-pointer mt-4"
          onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
        >
          {state === "Sign Up"
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </form>
  );
}
