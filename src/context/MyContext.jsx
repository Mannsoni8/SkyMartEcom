import { createContext, useEffect, useState } from "react";

export const MyShop = createContext();

export const ContextProvider = ({ children }) => {
  const [registerUsers, setRegisterUsers] = useState(
    JSON.parse(localStorage.getItem("registerUsers")) || [],
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedinUser")),
  );
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((items) => items.category === category);

  return (
    <MyShop.Provider
      value={{
        registerUsers,
        setRegisterUsers,
        loggedInUser,
        setLoggedInUser,
        products,
        filteredProducts,
        category,
        setCategory,
        loading,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </MyShop.Provider>
  );
};
