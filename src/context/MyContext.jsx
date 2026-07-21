import { createContext } from "react";

export const MyShop = createContext();

export const ContextProvider = ({ children }) => {
  return <MyShop.Provider>{children}</MyShop.Provider>;
};
