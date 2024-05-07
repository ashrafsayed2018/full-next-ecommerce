import { BASE_API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function addNewAddress(formData) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/address/add-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getAdress(userId) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/address/get-address?id=${userId}`,
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
export async function updateAddress(formData) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/address/update-address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteAddress(id) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/address/delete-address?id=${id}`,
      {
        method: "DELETE",
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
