import { BASE_API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export const registerUserService = async (formData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
