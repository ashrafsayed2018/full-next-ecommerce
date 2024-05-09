"use client";

import TextLoader from "@/components/loader/textLoader";
import { GlobalContext } from "@/context";
import { getAllUsersOrders, updateOrderStatus } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    loader,
    setLoader,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  async function extractAllOrderForAllUsers() {
    setPageLoader(true);
    const response = await getAllUsersOrders();

    if (response.success) {
      setPageLoader(false);

      setAllOrdersForAllUsers(
        response.data && response.data.length
          ? response.data.filter((item) => item.user._id != user.id)
          : []
      );
    } else {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    if (user != null) extractAllOrderForAllUsers();
  }, [user]);

  async function handleUpdateOrderStatus(item) {
    const response = await updateOrderStatus({
      ...item,
      isProcessing: false,
    });

    if (response.success) {
      extractAllOrderForAllUsers();
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
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-blue">
        <div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => {
                    return (
                      <li
                        key={item._id}
                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left overflow-x-auto"
                      >
                        <div className="flex">
                          <h1 className="font-normal text-xs mb-3 flex-1">
                            #order: {item._id}
                          </h1>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                User Name :
                              </p>
                              <p className="text-sm  font-semibold text-gray-900">
                                {item?.user?.name}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                User Email :
                              </p>
                              <p className="text-sm  font-semibold text-gray-900">
                                {item?.user?.email}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                Total Paid Amount :
                              </p>
                              <p className="text-sm  font-semibold text-gray-900">
                                ${item?.totalPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing
                              ? "Order is Processing"
                              : "Order is delivered"}
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(item)}
                            disabled={!item.isProcessing}
                            className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            {loader &&
                            loader.loading &&
                            loader.id === item._id ? (
                              <TextLoader
                                text={"Updating Order Status"}
                                color={"#ffffff"}
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              "Update Order Status"
                            )}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
