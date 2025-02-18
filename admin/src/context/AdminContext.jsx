import { createContext, useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : null
  );
  const [doctors, setDoctors] = useState([]);
  // console.log(doctors);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //console.log("Backend URL:", backendUrl);
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        //console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
      //console.log(doctors); // Use the response data here as needed
    } catch (error) {
      toast.error(error.message); // Log the error if the request fails
    }
  };

  const ChangeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availablity",
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        // setDoctors(data.doctors);
        //console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    ChangeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
