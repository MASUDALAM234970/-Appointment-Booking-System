import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  return (
    <AppContext.Provider value={{ doctors }}>
      {" "}
      {/* Wrap doctors inside an object */}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
