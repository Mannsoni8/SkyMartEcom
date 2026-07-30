import { createContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

export const MyShop = createContext();

export const ContextProvider = ({ children }) => {
  const [registerUsers, setRegisterUsers] = useState(
    JSON.parse(localStorage.getItem("registerUsers")) || [],
  );

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedinUser")),
  );
  const [showPassword, setShowPassword] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((items) => items.category === category);

  const sortedProducts = [...filteredProducts];

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedinUser");
    toast.success("Logged out successfully", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  switch (sortBy) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    default:
      break;
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const incrementQuntatity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuntatity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const removeFromCart = (id) => {
    const removeItems = cartItems.filter((items) => items.id !== id);
    toast.success("Item removed", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    setCartItems(removeItems);
  };

  return (
    <MyShop.Provider
      value={{
        registerUsers,
        setRegisterUsers,
        loggedInUser,
        setLoggedInUser,
        products,
        category,
        setCategory,
        loading,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        incrementQuntatity,
        decrementQuntatity,
        removeFromCart,
        sortBy,
        setSortBy,
        sortedProducts,
        logout,
        showPassword,
        setShowPassword,
      }}
    >
      {children}
    </MyShop.Provider>
  );
};
