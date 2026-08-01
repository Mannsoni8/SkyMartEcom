import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Singup"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const Home = lazy(() => import("../pages/Home"));
const Shope = lazy(() => import("../pages/Shope"));
const About = lazy(() => import("../pages/About"));
const Cart = lazy(() => import("../components/Cart"));

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
