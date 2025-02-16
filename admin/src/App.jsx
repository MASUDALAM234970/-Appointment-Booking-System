import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./Components/Navbar";

function App() {
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App;
