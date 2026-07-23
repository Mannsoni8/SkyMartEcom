import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import { Outdent } from "lucide-react";
import { Outlet } from "react-router";
import Cart from "../components/Cart";

const MainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main>
        <Outlet />
      </main>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default MainLayout;
