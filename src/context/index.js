"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  // loader state
  const [loader, setLoader] = useState(false);
  // authentication state
  const [isAuthUser, setIsAuthUser] = useState(false);

  // user state
  const [user, setUser] = useState(null);
  // cart items state
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        loader,
        setLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
