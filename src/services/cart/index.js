import Cookies from "js-cookie";

export async function addToCart(formData) {
  try {
    const response = await fetch(`/api/cart/add-to-cart`, {
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

export async function getAllCartItems(id) {
  try {
    const response = await fetch(`/api/cart/all-cart-items?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFromCart(id) {
  try {
    const response = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
