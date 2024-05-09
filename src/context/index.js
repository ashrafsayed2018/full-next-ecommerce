"use client";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
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

const protectedRoutes = [
  "/admin-view",
  "/admin-view/all-products",
  "/admin-view/add-product",
  "/account",
  "/cart",
  "/orders",
  "/checkout",
];
const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/all-products",
  "/admin-view/add-product",
];
export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
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

  const router = useRouter();
  const pathName = usePathname();

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
      // make use un authenticated
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);

  useEffect(() => {
    console.log(Object.keys(user).length > 0, "path name");
    //  if the user is not logged in
    if (
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.indexOf(pathName) > -1
    )
      router.push("/login");
  }, [user, pathName]);

  useEffect(() => {
    // if the user is not admin
    if (
      user != null &&
      user &&
      Object.keys(user).length > 0 &&
      protectedAdminRoutes.indexOf(pathName) > -1 &&
      user.role != "admin"
    )
      router.push("/unauthorized");
  }, [user, pathName]);
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
        allOrdersForUser,
        setAllOrdersForUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
