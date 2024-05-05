import { BASE_API_URL } from "@/utils/constants";

export const loginUserService = async (formData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
