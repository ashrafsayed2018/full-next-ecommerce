"use client";
import { GlobalContext } from "@/context";
import CommonModal from "../commonModal";
import { useContext, Fragment, useEffect } from "react";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import TextLoader from "../loader/textLoader";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const router = useRouter();
  const {
    showCartModal,
    setShowCartModal,
    user,
    cartItems,
    setCartItems,
    loader,
    setLoader,
  } = useContext(GlobalContext);

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
  async function extractAllCartItems() {
    const response = await getAllCartItems(user?.id);
    if (response.success) {
      setCartItems(response.data);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    } else {
    }
  }
  useEffect(() => {
    if (user !== null && user) {
      extractAllCartItems();
    }
  }, [user]);
  return (
    <CommonModal
      showButtons={true}
      modalTitle={"Cart items"}
      show={showCartModal}
      setShow={setShowCartModal}
      buttonComponent={
        <Fragment>
          <button className="navButton" onClick={() => router.push("/cart")}>
            Go to Cart
          </button>
          <button
            className="navButton disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={cartItems && cartItems.length == 0}
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-sm text-gray-600">
            <button className="font-medium text-gray-800">
              Continue shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
      mainContent={
        cartItems && cartItems.length > 0 ? (
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={cartItem.productID.imageUrl}
                    alt={cartItem.productID.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <a href="">{cartItem.productID.name}</a>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      $ {cartItem.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-red-400 sm:order-2"
                      onClick={() => handleDeleteItem(cartItem._id)}
                    >
                      {loader &&
                      loader.loading &&
                      loader.id === cartItem._id ? (
                        <TextLoader text={"Removing ..."} color="red" />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
    />
  );
}
