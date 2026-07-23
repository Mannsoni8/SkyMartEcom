import React, { useContext } from "react";
import { MyShop } from "../context/MyContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { loggedInUser } = useContext(MyShop);
  if (!loggedInUser) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
