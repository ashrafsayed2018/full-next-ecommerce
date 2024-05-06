"use client";

import Cart from "@/components/cart";

import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function CartPage() {
  const {
    user,
    cartItems,
    setCartItems,
    pageLoader,
    setPageLoader,
    loader,
    setLoader,
  } = useContext(GlobalContext);
  async function extractAllCartItems() {
    setPageLoader(true);
    const response = await getAllCartItems(user?.id);
    if (response.success) {
      setPageLoader(false);
      setCartItems(response.data);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    } else {
      setPageLoader(false);
      return false;
    }
  }
  useEffect(() => {
    if (user !== null && user) {
      extractAllCartItems();
    }
  }, [user]);
  async function handleDeleteItem(id) {
    setLoader({ loading: true, id: id });
    const response = await deleteFromCart(id);
    if (response.success) {
      setLoader({ loading: false, id: "" });
      toast.success(response.message);
      extractAllCartItems();
    } else {
      setLoader({ loading: false, id: "" });
      toast.error(response.message);
    }
  }
  if (pageLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <Cart
      cartItems={cartItems}
      handleDeleteItem={handleDeleteItem}
      loader={loader}
    />
  );
}
