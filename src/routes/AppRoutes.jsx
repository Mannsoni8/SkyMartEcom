import React from "react";
import { Route, Routes } from "react-router";
import Home from "../components/Home";
import Shope from "../components/Shope";
import About from "../components/About";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/shope"} element={<Shope />} />
        <Route path={"/about"} element={<About />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
