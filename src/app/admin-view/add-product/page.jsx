"use client";

import InputComponent from "@/components/formElements/inputComponent";
import Notification from "@/components/toastNotification/index";
import SelectComponent from "@/components/formElements/selectComponent";
import TileComponent from "@/components/formElements/tileComponent";
import { GlobalContext } from "@/context";
import { helperForUploadImageToFirebase } from "@/helpers/uploadImageToFirebase";
import { addNewProductService } from "@/services/product";
import { adminAddProductformControls, AvailableSizes } from "@/utils";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import TextLoader from "@/components/loader/textLoader";
import { useRouter } from "next/navigation";
const initialFormData = {
  name: "",
  price: "",
  description: "",
  category: "women",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};
export default function AddProduct() {
  const { loader, setLoader } = useContext(GlobalContext);
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const changeImage = async (event) => {
    const extractedImageUrl = await helperForUploadImageToFirebase(
      event.target.files[0]
    );
    if (extractedImageUrl != "") {
      setFormData({
        ...formData,
        imageUrl: extractedImageUrl,
      });
    }
  };
  function handleTileClick(currentItem) {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === currentItem.id);
    if (index === -1) {
      copySizes.push(currentItem);
    } else {
      copySizes = copySizes.filter((item) => item.id !== currentItem.id);
    }
    setFormData({ ...formData, sizes: copySizes });
  }

  // check if form is valid
  function isFormValid() {
    const {
      name,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      onSale,
      imageUrl,
      priceDrop,
    } = formData;

    return (
      name.trim() !== "" &&
      price.trim() !== "" &&
      description.trim() !== "" &&
      category.trim() != [] &&
      sizes.length > 0 &&
      deliveryInfo.trim() !== "" &&
      onSale.trim() !== "" &&
      imageUrl.trim() !== "" &&
      priceDrop.length !== 0
    );
  }
  async function handleAddProduct() {
    if (isFormValid) {
      setLoader(true);
      const response = await addNewProductService(formData);
      if (response.success) {
        setLoader(false);
        toast.success(response.message);
        setFormData(initialFormData);
        setTimeout(() => {
          router.push("/admin-view/all-products");
        }, 1000);
      } else {
        setLoader(true);
        toast.error(response.message);
      }
    }
  }
  return (
    <div className="w-full m-0 mt-5 relative">
      <div className="flex flex-col justify-start items-start p-10 relative shadow-xl rounded-xl bg-white">
        <div className="w-full m-0 mt-6 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={changeImage}
          />
          <div className="flex flex-col gap-2">
            <label>Available Sizes</label>
            <TileComponent
              onClick={handleTileClick}
              data={AvailableSizes}
              selected={formData.sizes}
            />
          </div>

          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                key={controlItem.id}
                type={controlItem.type}
                label={controlItem.label}
                placeholder={controlItem.placeholder}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                key={controlItem.id}
                type={controlItem.type}
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}
          <button
            onClick={handleAddProduct}
            className="button disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid()}
          >
            {loader ? (
              <TextLoader
                text="adding product ..."
                loading={loader}
                color="white"
              />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
