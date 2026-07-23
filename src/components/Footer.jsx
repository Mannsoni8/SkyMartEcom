import React from "react";

const Footer = () => {
  return (
    <footer className="border border-white/8 bg-[#0D0D0D] py-10">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-center gap-3">
        {/* Logo */}

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            <span className="text-white">Sky</span>
            <span className="text-white">Mart</span>
          </h2>
        </div>

        {/* Copyright */}

        <p className="text-sm text-gray-500 text-center">
          © 2026 SkyMart • Built with <span className="text-white">React</span>{" "}
          + <span className="text-white">Redux</span> +{" "}
          <span className="text-white">TanStack Query</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
