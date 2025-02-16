import { createContext, useState } from "react";
export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : null
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //console.log("Backend URL:", backendUrl);

  const value = {
    atoken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
