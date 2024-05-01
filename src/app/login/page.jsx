"use client";

import InputComponent from "@/components/formElements/inputComponent";
import { GlobalContext } from "@/context";
import TextLoader from "@/components/loader/textLoader";
import Notifications from "@/components/Notifications/index";
import { loginUserService } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
  const { loader, setLoader } = useContext(GlobalContext);

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // check if form is valid
  function isFormValid() {
    const { email, password } = formData;

    return (
      email.trim() !== "" && password.trim() !== "" && password.length >= 8
    );
  }

  async function handleLogin() {
    setLoader(true);
    if (isFormValid()) {
      const response = await loginUserService(formData);
      if (response.success) {
        toast.success(response.message);
        setLoader(false);
        setIsAuthUser(true);
        setUser(response.data.user);

        // set the js cookie
        Cookies.set("token", response.data.token);
        // set user in loacalstorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error(response.message);
        setLoader(false);
        setIsAuthUser(false);
      }
    }
  }

  // if the user is authenticated
  useEffect(() => {
    if (isAuthUser) {
      router.push("/");
    }
  }, [isAuthUser]);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row mx-10">
          <div className="w-full mt-20 m-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justfiy-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem, index) => (
                  <InputComponent
                    key={index}
                    type={controlItem.type}
                    label={controlItem.label}
                    placeholder={controlItem.placeholder}
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                ))}
                <button
                  className="button disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleLogin}
                  disabled={!isFormValid()}
                >
                  {loader ? (
                    <TextLoader
                      text="logining ..."
                      loading={loader}
                      color="white"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="w-full flex flex-col gap-2">
                  <p>New to website</p>
                  <button
                    className="button"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notifications />
    </div>
  );
}
