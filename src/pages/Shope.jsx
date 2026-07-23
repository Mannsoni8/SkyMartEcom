import React, { useContext, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { MyShop } from "../context/MyContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Shope = () => {
  const { filteredProducts, products, loading, category, setCategory } =
    useContext(MyShop);

  const [search, setSearch] = useState("");

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  const searchedProducts = filteredProducts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0D0D0D] text-white px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}

          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
            All Products
          </h1>

          <p className="text-white/40 font-body text-sm mb-8">
            {searchedProducts.length} products found
          </p>

          {/* Search */}

          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111] p-3">
            {/* Search */}

            <div className="flex flex-1 items-center rounded-xl bg-[#202020] px-4">
              <Search className="text-gray-500" size={18} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>

            {/* Category */}

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none rounded-xl border border-white/10 bg-[#202020] py-3 pl-4 pr-10 text-sm outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all"
                      ? "All Categories"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* Sort */}

            <div className="relative">
              <select className="appearance-none rounded-xl border border-white/10 bg-[#202020] py-3 pl-4 pr-10 text-sm outline-none">
                <option>Featured</option>
                <option>Price: Low → High</option>
                <option>Price: High → Low</option>
                <option>Rating</option>
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Products */}

          <div className="grid grid-cols-5 gap-6">
            {searchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shope;
