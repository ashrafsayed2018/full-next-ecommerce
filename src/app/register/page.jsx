"use client";
import InputComponent from "@/components/formElements/inputComponent";
import SelectComponent from "@/components/formElements/selectComponent";
import TextLoader from "@/components/loader/textLoader";
import Notifications from "@/components/Notifications/index";
import { GlobalContext } from "@/context";
import { registerUserService } from "@/services/register";
import { registrationFormControls } from "@/utlis";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const { loader, setLoader } = useContext(GlobalContext);
  // check if form is valid
  function isFormValid() {
    const { name, email, password, role } = formData;

    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      password.length >= 8 &&
      role.trim() !== ""
    );
  }

  async function handleRegister() {
    setLoader(true);
    if (isFormValid()) {
      const data = await registerUserService(formData);
      if (data.success) {
        toast.success(data.message);
        setIsRegistered(true);
        setLoader(false);
        setIsAuthUser(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "customer",
        });
      } else {
        setLoader(false);
        toast.error(data.message);
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
                {isRegistered
                  ? "registration successfull"
                  : "Signup for an account"}
              </p>
              {isRegistered ? (
                <button
                  className="button"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <>
                  <div className="w-full mt-6 mr-0 ml-0 relative space-y-8">
                    {registrationFormControls.map((controlItem) =>
                      controlItem.componentType == "input" ? (
                        <InputComponent
                          key={controlItem.id}
                          type={controlItem.type}
                          label={controlItem.label}
                          placeholder={controlItem.placeholder}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            })
                          }
                          value={formData[controlItem.id]}
                        />
                      ) : (
                        <SelectComponent
                          key={controlItem.id}
                          options={controlItem.options}
                          type={controlItem.type}
                          label={controlItem.label}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            })
                          }
                          value={formData[controlItem.id]}
                        />
                      )
                    )}
                  </div>
                  <button
                    className="button disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleRegister}
                    disabled={!isFormValid()}
                  >
                    {loader ? (
                      <TextLoader
                        text="Registering..."
                        loading={loader}
                        color="white"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notifications />
    </div>
  );
}
