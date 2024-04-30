"use client";

import InputComponent from "@/components/formElements/inputComponent";
import SelectComponent from "@/components/formElements/selectComponent";
import { loginFormControls } from "@/utlis";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
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
                  />
                ))}
                <button className="button">Login</button>
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
    </div>
  );
}
