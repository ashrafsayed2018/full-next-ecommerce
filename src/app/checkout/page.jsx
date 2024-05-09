"use client";
import { GlobalContext } from "@/context";
import { getToatalCartPrice } from "@/helpers/getTotalCartPrice";
import { getPriceAfterDiscount } from "@/helpers/priceAfterDiscount";
import { getAddress } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Notification from "@/components/toastNotification/index";

export default function CheckoutPage() {
  const { user, cartItems, address, setAddress } = useContext(GlobalContext);

  async function getUserAddress() {
    const response = await getAddress(user?.id);
    if (response.success) {
      setAddress(response.data);
    }
    return response.data;
  }

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(stripePublishableKey);

  // redirect to stripe checkout page
  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: getPriceAfterDiscount(item.productID) * 100,
      },
      quantity: 1,
    }));
    const response = await callStripeSession(createLineItems);

    const userAddress = await getAddress(user.id);
    const addressData = userAddress.data;
    const { fullName, country, city, address, postalCode } = addressData;

    const checkoutFormData = {
      shippingAddress: { fullName, country, city, address, postalCode },
      paymentMethod: "",
      totalPrice: 0,
      isPaid: false,
      paidAt: new Date(),
      isProcessing: true,
    };
    console.log(checkoutFormData, "from use effect");
    setIsPaymentProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });
    console.log(error);
  }

  useEffect(() => {
    if (user.id) {
      getUserAddress();
    }
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));
      if (
        isStripe &&
        searchParams.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsPaymentProcessing(true);
        const userAddress = await getAddress(user.id);
        const addressData = userAddress.data;
        const { fullName, country, city, address, postalCode } = addressData;

        const checkoutFormData = {
          shippingAddress: { fullName, country, city, address, postalCode },
          paymentMethod: "",
          totalPrice: 0,
          isPaid: false,
          paidAt: new Date(),
          isProcessing: true,
        };
        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: checkoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: "Stripe",
          totalPrice: getToatalCartPrice(cartItems),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const response = await createNewOrder(createFinalCheckoutFormData);

        console.log(response.message);
        if (response.success) {
          setIsPaymentProcessing(false);
          setOrderSuccess(true);
          toast.success(response.message);
        } else {
          setIsPaymentProcessing(true);
          setOrderSuccess(false);
          toast.error(response.message);
        }
      }
    }
    createFinalOrder();
  }, [searchParams.get("status"), cartItems]);
  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        // setOrderSuccess(false);
        router.push("/orders");
      }, 2000);
    }
  }, [orderSuccess]);

  if (isPaymentProcessing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PulseLoader
          loading={isPaymentProcessing}
          color="black"
          size={15}
          data-testid="loader"
        />
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 2 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
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
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
