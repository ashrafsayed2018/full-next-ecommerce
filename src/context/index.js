"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);
export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};
export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  // loader state
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  // authentication state
  const [isAuthUser, setIsAuthUser] = useState(false);

  // user state
  const [user, setUser] = useState({});
  // cart items state
  const [cartItems, setCartItems] = useState([]);
  // address state
  const [address, setAddress] = useState({});
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      // setCartItems(getCartItems);
      // setUser(userData);
      // Check if user data has changed
      if (JSON.stringify(userData) !== JSON.stringify(user)) {
        setUser(userData);
      }

      // Check if cart items have changed
      if (JSON.stringify(getCartItems) !== JSON.stringify(cartItems)) {
        setCartItems(getCartItems);
      }
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies, user]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        loader,
        setLoader,
        pageLoader,
        setPageLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        address,
        setAddress,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
