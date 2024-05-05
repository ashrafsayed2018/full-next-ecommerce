"use client";
import { GlobalContext } from "@/context";
import CommonModal from "../commonModal";
import { useContext, Fragment } from "react";

export default function CartModal() {
  const { showCartModal, setShowCartModal } = useContext(GlobalContext);
  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      buttonComponent={
        <Fragment className="bg-red-800 text-white">
          <button>Go to Cart</button>
          <button>Checkout</button>
        </Fragment>
      }
    />
  );
}
