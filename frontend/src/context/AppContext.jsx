import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  return (
    <AppContext.Provider value={{ doctors, currencySymbol }}>
      {" "}
      {/* Wrap doctors inside an object */}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
