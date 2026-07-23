import React, { useContext } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { MyShop } from "../context/MyContext";

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems, setIsCartOpen } = useContext(MyShop);

  const addToCart = () => {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    setIsCartOpen(true);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-[#171717] transition-all duration-300 hover:-translate-y-2 hover:border-lime-400">
      {/* Image Section */}

      <div className="relative h-45 bg-white p-5">
        <span className="absolute left-4 top-4 rounded-full bg-[#6E6E6E] px-3 py-1 text-xs font-semibold capitalize text-white">
          {product.category}
        </span>

        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}

      <div className="space-y-3 p-5">
        <p className="text-sm capitalize text-gray-500">{product.category}</p>

        <h2 className="line-clamp-2 h-14 text-xl font-semibold">
          {product.title}
        </h2>

        {/* Rating */}

        {/* <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={14}
              fill={
                index < Math.round(product.rating.rate)
                  ? "#FACC15"
                  : "transparent"
              }
              className="text-yellow-400"
            />
          ))}

          <span className="ml-2 text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div> */}

        <div className="border-t border-white/10"></div>

        {/* Bottom */}

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-lime-300">${product.price}</h2>

          <button
            onClick={addToCart}
            className="flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2 font-semibold text-black transition hover:scale-105"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
