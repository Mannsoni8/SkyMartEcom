import { createContext, useState } from "react";

export const MyShop = createContext();

export const ContextProvider = ({ children }) => {
  const [registerUsers, setRegisterUsers] = useState(
    JSON.parse(localStorage.getItem("registerUsers")) || [],
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedinUser")),
  );
  return (
    <MyShop.Provider
      value={{ registerUsers, setRegisterUsers, loggedInUser, setLoggedInUser }}
    >
      {children}
    </MyShop.Provider>
  );
};
