"use client";
import InputComponent from "@/components/formElements/inputComponent";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/services/address";
import Notification from "@/components/toastNotification/index";

import { addNewAddressFormControls } from "@/utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextLoader from "@/components/loader/textLoader";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    address,
    setAddress,
    addressFormData,
    setAddressFormData,
    loader,
    setLoader,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const [isUpdateState, setIsUpdateState] = useState(false);
  // add or update address method

  async function handleAddOrUpdateAddress() {
    setLoader({ loading: true, id: "" });

    const response =
      currentEditedAddressId != null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({
            ...addressFormData,
            userID: user?.id,
          });
    if (response.success) {
      setLoader({ loading: false, id: "" });
      toast.success(response.message);

      setAddressFormData({
        fullName: "",
        address: "",
        country: "",
        city: "",
        postalCode: "",
      });
      setCurrentEditedAddressId(null);
      setIsUpdateState(false);
      await getAddress();
    } else {
      setLoader({ loading: false, id: "" });
      toast.error(response.message);
    }
  }

  useEffect(() => {
    async function getUserAddress() {
      setPageLoader(true);
      const response = await getAddress(user?.id);
      console.log(response.success, "Success");

      if (response.success) {
        setPageLoader(false);
        setAddress(response.data);
      } else {
        setPageLoader(false);
      }
    }
    getUserAddress();
  }, []);
  async function handleUpdateAddressButton(currentAddress) {
    setShowAddressForm(true);
    setIsUpdateState(true);
    setLoader({ loading: true, id: currentAddress._id });
    setAddressFormData({
      fullName: currentAddress.fullName,
      address: currentAddress.address,
      country: currentAddress.country,
      city: currentAddress.city,
      postalCode: currentAddress.postalCode,
    });
    setCurrentEditedAddressId(currentAddress._id);
  }
  async function handleDeleteAddress(id) {
    setLoader({ loading: true, id: id });
    const response = await deleteAddress(id);
    if (response.success) {
      setLoader({ loading: false, id: "" });
      toast.success(response.message);
      setAddress({});
      await getAddress();
    } else {
      toast.error(response.message);
      setLoader({ loading: false, id: "" });
      await getAddress();
    }
  }
  useEffect(() => {
    if (user != null) {
      getAddress();
    }
  }, [user]);
  return (
    <section className="">
      {pageLoader ? (
        <div className="flex items-center justify-center h-screen">
          <PulseLoader
            loading={pageLoader}
            color="black"
            size={15}
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="p-6 sm:p-12">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6">
                  {/* render random user image */}
                </div>
                <div className="flex flex-col flex-1">
                  <h1 className="text-lg font-semibold text-center md:text-left">
                    {user?.name}
                  </h1>
                  <p>{user?.email}</p>
                  <p>{user?.role}</p>
                </div>
                <button
                  className="navButton w-60"
                  onClick={() => router.push("/orders")}
                >
                  view your orders
                </button>

                <div className="mt-6">
                  <h1 className="font-bold text-lg">Address</h1>
                  <div className="mt-4">
                    {Object.keys(address).length > 0 ? (
                      <div className="border p-6">
                        <p>name: {address.fullName}</p>
                        <p>country: {address.country} </p>
                        <p>city: {address.city}</p>
                        <p>postal code:{address.postalCode} </p>
                        <p>address: {address.address}</p>
                        <button
                          className="navButton w-40 mr-2 bg-blue-500"
                          onClick={() => handleUpdateAddressButton(address)}
                        >
                          {loader &&
                          loader.loading &&
                          isUpdateState &&
                          loader.id === address._id ? (
                            <TextLoader
                              text="updating"
                              color="white"
                              size={2}
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                        <button
                          className="navButton w-40 mr-2 bg-red-500"
                          onClick={() => handleDeleteAddress(address._id)}
                        >
                          {loader &&
                          loader.loading &&
                          !isUpdateState &&
                          loader.id == address._id ? (
                            <TextLoader
                              text="Deleting"
                              color="white"
                              size={2}
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    ) : (
                      <p>No address found please add address</p>
                    )}
                  </div>
                </div>

                {Object.keys(address).length === 0 ? (
                  <div className="mt-4">
                    <button
                      className="navButton w-60"
                      onClick={() =>
                        setShowAddressForm((prev) => (prev = !prev))
                      }
                    >
                      {showAddressForm
                        ? "Hide address form"
                        : " Show address form"}
                    </button>
                  </div>
                ) : null}
                {/* add address form  */}
                {(showAddressForm && Object.keys(address).length === 0) ||
                isUpdateState ? (
                  <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                      {addNewAddressFormControls.map((controlItem) => (
                        <InputComponent
                          key={controlItem.id}
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          value={addressFormData[controlItem.id]}
                          onChange={(e) =>
                            setAddressFormData({
                              ...addressFormData,
                              [controlItem.id]: e.target.value,
                            })
                          }
                        />
                      ))}
                    </div>
                    <button
                      className="navButton w-44"
                      onClick={handleAddOrUpdateAddress}
                    >
                      {loader && loader.loading && !isUpdateState ? (
                        <TextLoader text="Saving..." color="white" size={5} />
                      ) : currentEditedAddressId ? (
                        "Update"
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Notification />
        </div>
      )}
    </section>
  );
}
