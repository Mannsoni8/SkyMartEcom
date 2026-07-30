import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Zap, ShoppingCart, LogOut, Menu, User, X } from "lucide-react";
import { MyShop } from "../context/MyContext";

const Navbar = ({ onCartClick }) => {
  const { cartItems, logout, loggedInUser } = useContext(MyShop);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 font-medium transition-all duration-300 ${
      isActive
        ? "text-lime-400 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-lime-400"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#C8F400] flex items-center justify-center">
            <Zap size={18} className="text-black" fill="currentColor" />
          </div>

          <h1 className="text-2xl font-bold">
            <span className="text-white">Sky</span>
            <span className="text-lime-400">Mart</span>
          </h1>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <User size={16} className="text-black" />
            </div>

            <span className="text-sm text-gray-300 font-medium">
              {loggedInUser?.name || "Guest"}
            </span>
          </div>
          <button
            onClick={onCartClick}
            className="relative p-3 rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <ShoppingCart size={18} />

            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
              {cartItems.length}
            </span>
          </button>

          <button
            title="Logout"
            className="hidden md:inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 transition-all duration-300"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut size={18} />
          </button>

          <button
            className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60 border-t border-white/10" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-5 pb-4 pt-4 bg-[#0D0D0D]">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} block rounded-xl px-3 py-2 bg-white/5`
            }
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} block rounded-xl px-3 py-2 bg-white/5`
            }
            onClick={() => setMobileOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} block rounded-xl px-3 py-2 bg-white/5`
            }
            onClick={() => setMobileOpen(false)}
          >
            About
          </NavLink>
          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
              navigate("/");
            }}
            className="text-left rounded-xl px-3 py-2 text-gray-300 hover:text-white bg-white/5"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
