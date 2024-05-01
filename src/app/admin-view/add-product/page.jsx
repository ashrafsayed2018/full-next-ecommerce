"use client";

import InputComponent from "@/components/formElements/inputComponent";
import SelectComponent from "@/components/formElements/selectComponent";
import TileComponent from "@/components/formElements/tileComponent";
import { adminAddProductformControls, AvailableSizes } from "@/utils";

export default function AddProduct() {
  const changeImage = () => {};
  console.log(adminAddProductformControls.length);
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
            <TileComponent data={AvailableSizes} />
          </div>

          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                label={controlItem.label}
                placeholder={controlItem.placeholder}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                type={controlItem.type}
                label={controlItem.label}
                options={controlItem.options}
              />
            ) : null
          )}
          <button className="button">Add Product</button>
        </div>
      </div>
    </div>
  );
}
