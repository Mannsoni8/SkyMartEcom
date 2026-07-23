import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Signup from "../pages/Singup";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import Shope from "../pages/Shope";
import About from "../pages/About";
import Cart from "../components/Cart";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Signup />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "products",
            element: <Shope />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
