import Cookies from "js-cookie";

const { BASE_API_URL } = require("@/utils/constants");

export async function callStripeSession(formData) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/stripe/`, {
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
