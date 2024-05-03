import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export async function addNewProductService(formData) {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get all products

export async function getAllAdminProducts() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/admin/all-products",
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return NextResponse({
      success: false,
      message: "something went wrong please try again later",
    });
  }
}
