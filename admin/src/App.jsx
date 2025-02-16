import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <>
      <ToastContainer />
    </>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App;
