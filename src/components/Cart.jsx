import React, { useContext } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { MyShop } from "../context/MyContext";

const Cart = ({ open, onClose }) => {
  const { cartItems } = useContext(MyShop);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open
          ? "visible bg-black/40 backdrop-blur-sm"
          : "invisible bg-transparent"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-screen w-[460px] bg-[#111111] border-l border-white/10 shadow-2xl transition-transform duration-500 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Shopping Cart</h2>

            <p className="text-gray-400 mt-1">{cartItems.length} item(s)</p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-white/10 flex items-center justify-center"
          >
            <X className="text-white" />
          </button>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Cart is Empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-lime-400 font-bold mt-2">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center rounded-xl bg-[#222]">
                        <button className="h-9 w-9 flex items-center justify-center hover:bg-[#333] rounded-l-xl">
                          <Minus size={18} />
                        </button>

                        <span className="px-5">{item.quantity}</span>

                        <button className="h-9 w-9 flex items-center justify-center hover:bg-lime-400 hover:text-black rounded-r-xl">
                          <Plus size={18} />
                        </button>
                      </div>

                      <button className="text-red-400 hover:text-red-500">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <h3 className="text-xl font-bold text-lime-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-bold text-white">
              <span>Total</span>

              <span className="text-lime-400">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full rounded-xl bg-lime-400 py-4 text-black font-semibold hover:scale-[1.02] transition">
            Checkout
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-xl border border-white/10 py-4 text-white hover:bg-white/10 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
