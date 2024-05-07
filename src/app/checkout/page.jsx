"use client";
import { GlobalContext } from "@/context";
import { getToatalCartPrice } from "@/helpers/getTotalCartPrice";
import { getPriceAfterDiscount } from "@/helpers/priceAfterDiscount";
import { getAdress } from "@/services/address";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function CheckoutPage() {
  const {
    user,
    cartItems,
    address,
    setAddress,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function getAddress() {
    const response = await getAdress(user?.id);
    if (response.success) {
      setAddress(response.data);
    }
  }
  useEffect(() => {
    if (user.id) {
      getAddress();
    }
  }, [user]);
  return (
    <div>
      <div className="grid sm:px-10 md:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((cartItem) => {
                return (
                  <div
                    key={cartItem._id}
                    className="flex flex-col rounded-lg sm:flex-row"
                  >
                    <img
                      src={
                        cartItem &&
                        cartItem.productID &&
                        cartItem.productID.imageUrl
                      }
                      alt={cartItem.productID.name}
                      className="mt-2 h-24 w-28 rounded-md object-cover object-center"
                    />
                    <div className="flex w-full flex-col p-4">
                      <span className="font-bold">
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.productID.name}
                      </span>
                      <span className="font-semibold">
                        {cartItem &&
                          cartItem.productID &&
                          getPriceAfterDiscount(cartItem.productID)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Your Cart is empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 py-4 sm:px-5 lg:mt-0">
          <p className="text-xl font-medium">Shipping address details</p>
          <p className="text-xl text-gray-400 font-bold">complete your order</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {Object.keys(address).length ? (
              <div className="border p-6">
                <p>name: {address.fullName}</p>
                <p>country: {address.country} </p>
                <p>city: {address.city}</p>
                <p>postal code:{address.postalCode} </p>
                <p>address: {address.address}</p>
                <button
                  className="navButton"
                  onClick={() => router.push("/account")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <button
                className="navButton"
                onClick={() => router.push("/account")}
              >
                Add Address
              </button>
            )}
            <div className="mt-6 border-t border-b py-2 px-4 pt-8">
              <div className="flex items-center justify-center gap-4">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="text-lg font-bold text-gray-900">
                  {" "}
                  $
                  {cartItems && cartItems.length
                    ? getToatalCartPrice(cartItems)
                    : 0}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="text-lg font-bold text-gray-900">free</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  {" "}
                  $
                  {cartItems && cartItems.length
                    ? getToatalCartPrice(cartItems)
                    : 0}
                </p>
              </div>

              <button
                disabled={Object.keys(cartItems).length == 0}
                className="navButton disabled:opacity-50 disabled:cursor-pointer"
                onClick={() => router.push("/account")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
