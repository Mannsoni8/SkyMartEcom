import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { MyShop } from "../context/MyContext";

const PublicRoute = () => {
  const { loggedInUser } = useContext(MyShop);

  if (loggedInUser) {
    return <Navigate to={"/main"} />;
  }

  return <Outlet />;
};

export default PublicRoute;
