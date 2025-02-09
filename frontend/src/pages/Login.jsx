import React, { useState } from "react";

export default function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (state === "Sign Up" && !name)) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log({ email, password, name });
    // Handle your form submission logic here
  };

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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
