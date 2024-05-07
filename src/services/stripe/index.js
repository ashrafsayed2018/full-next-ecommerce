const { BASE_API_URL } = require("@/utils/constants");

export async function callStripeSession(fromData) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/stripe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
