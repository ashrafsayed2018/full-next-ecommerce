"use client";
import { getPriceAfterDiscount } from "@/helpers/priceAfterDiscount";
import TextLoader from "../loader/textLoader";
import { useContext } from "react";

import { getToatalCartPrice } from "@/helpers/getTotalCartPrice";
import { GlobalContext } from "../../context";
import { useRouter } from "next/navigation";

export default function Cart({ cartItems = [], handleDeleteItem, loader }) {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:6 lg:px-8">
        <div className="max-w-screen-xl mx-auto mt-8 px-4 sm:6 lg:px-8">
          <div className="bg-white shadow-lg">
            <div className="px-4 sm:px-8 py-6 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="my-8">
                    {cartItems.map((cartItem, index) => (
                      <li
                        key={index}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            src={cartItem.productID.imageUrl}
                            alt={cartItem.productID.name}
                            className="w-24 h-24 rounded-lg max-w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem.productID.name}
                              </p>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-1 sm:text-right sm:ml-8">
                                {getPriceAfterDiscount(cartItem.productID)}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-red-700 sm:order-2"
                                onClick={() => handleDeleteItem(cartItem._id)}
                              >
                                {loader &&
                                loader.loading &&
                                loader.id === cartItem._id ? (
                                  <TextLoader
                                    loading="Removing"
                                    color="red"
                                    size={20}
                                  />
                                ) : (
                                  "Remove Item"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">your card is empty</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? getToatalCartPrice(cartItems)
                      : 0}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping cost</p>
                  <p className="text-lg text-black font-semibold">$ 0</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? getToatalCartPrice(cartItems)
                      : 0}
                  </p>
                </div>

                <div className="mt-5 text-center">
                  <button
                    onClick={() => {
                      router.push("/checkout");
                      console.log(user, "user from cart ");
                    }}
                    className="navButton disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={cartItems && cartItems.length == 0}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
