import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Allpointment from "./pages/Admin/Allpointment";

function App() {
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/all-appointments" element={<Allpointment />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App;
