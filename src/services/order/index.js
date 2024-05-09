import { BASE_API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function createNewOrder(formData) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("data from create order services", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllUserOrder(userId) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/order/get-all-orders?id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderDetails(orderId) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/order/order-details?id=${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get all users order for admin only

export async function getAllUsersOrders() {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/admin/orders/get-all-orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get update order for admin only

export async function updateOrderStatus(formData) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/admin/orders/update-orders-status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
