import { createContext, useState } from "react";
export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState("");

  const value = {
    atoken,
    setAToken,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
