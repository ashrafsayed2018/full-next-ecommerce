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

// update product

export async function updateProductService(formData) {
  try {
    const response = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again later",
    });
  }
}
// delete product

export async function deleteProductService(id) {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong please try again later",
    });
  }
}

// find product by category
export async function findProductsByCategoryService(category) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/client/product/products-by-category?category=${category}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// find product by id
export async function findProductByIdService(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/client/product/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
