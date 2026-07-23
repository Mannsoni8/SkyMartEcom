import React, { useContext, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { MyShop } from "../context/MyContext";
import ProductCard from "../components/ProductCard";

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
    <div className="min-h-screen bg-[#0D0D0D] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <h1 className="text-6xl font-bold">All Products</h1>

        <p className="text-gray-400 mt-3 text-lg">
          {searchedProducts.length} products found
        </p>

        {/* Search */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#171717] p-5 flex gap-5">
          {/* Search */}

          <div className="flex-1 flex items-center rounded-2xl bg-[#202020] px-5">
            <Search className="text-gray-500" size={20} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-4 px-4 outline-none text-lg"
            />
          </div>

          {/* Category */}

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none rounded-2xl bg-[#202020] border border-white/10 px-6 pr-12 py-4 text-lg outline-none"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>

          {/* Sort */}

          <div className="relative">
            <select className="appearance-none rounded-2xl bg-[#202020] border border-white/10 px-6 pr-12 py-4 text-lg outline-none">
              <option>Featured</option>
              <option>Price Low → High</option>
              <option>Price High → Low</option>
              <option>Rating</option>
            </select>

            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Products */}

        <div className="grid grid-cols-5 gap-6 mt-10">
          {searchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shope;
