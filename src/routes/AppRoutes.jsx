import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../components/Home";
import Shope from "../components/Shope";
import About from "../components/About";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Signup from "../pages/Singup";
import MainLayout from "../layouts/MainLayout";
const AppRoutes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/home",
      element: <MainLayout />,
    },
  ]);
  return <RouterProvider router={route} />;
};

export default AppRoutes;
