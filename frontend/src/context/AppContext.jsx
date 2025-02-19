import { createContext, useEffect, useState } from "react";
//import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log("backendUrl", backendUrl);
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
      //  console.log(data);
      //console.log(data.doctors);
    } catch (error) {
      console.log(error.message);
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-Profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
        console.log(data.userData);
      } else {
        toast.error(data.message);
      }
      //console.log(data.userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {/* Wrap doctors inside an object */}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
