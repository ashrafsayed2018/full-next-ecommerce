"use client";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { useContext, useEffect } from "react";
import CommonModal from "../commonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartModal from "../cartModal";
import { getAllCartItems } from "@/services/cart";

function NavItems({ isModalView = false, isAdminView, router, pathName }) {
  return (
    <div
      className={`w-full md:w-auto md:flex items-center justify-between ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-none ${
          isModalView ? "border-none" : " border border-gray-100 "
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                onClick={() => router.push(item.path)}
                className={`cursor-pointer bolck py-2 pl-3 pr-4 text-gray-900 rounded md:p-3 ${
                  pathName == item.path ? "bg-blue-800 text-white py-20" : ""
                }`}
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer bolck py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}
export default function Navbar() {
  const {
    showNavModal,
    setShowNavModal,
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
    showCartModal,
    setShowCartModal,
    setCartItems,
  } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const isAdminView = pathName.includes("/admin-view");

  // handle logout events

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser({});
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <nav className="w-full h-20 bg-white fixed top-0 left-0 z-20 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap justify-between item-center mx-auto p-4">
          {/* website logo */}
          <div className="flex items-center cursor-pointer">
            <Link
              href="/"
              className="self-center text-2xl font-semibold whitespace-nowrap"
            >
              Shoppery
            </Link>
          </div>
          {/*  */}
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <>
                <button
                  className="navButton"
                  onClick={() => {
                    router.push("/account");
                    setShowCartModal(false);
                  }}
                >
                  Account
                </button>
                <button
                  className="navButton"
                  onClick={() => setShowCartModal((prev) => (prev = !prev))}
                >
                  Cart
                </button>
              </>
            ) : null}

            {user?.role === "admin" ? (
              isAdminView ? (
                <button onClick={() => router.push("/")} className="navButton">
                  Client view
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className="navButton"
                >
                  Admin view
                </button>
              )
            ) : null}

            {isAuthUser ? (
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="navButton"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}
            {/* mobile menu button */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal((prev) => (prev = !prev))}
            >
              {!showNavModal ? (
                <>
                  <span className="sr-only">open main menu</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          <NavItems
            isAdminView={isAdminView}
            router={router}
            pathName={pathName}
          />
        </div>
      </nav>
      <CommonModal
        mainContent={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
            pathName={pathName}
          />
        }
        showModalTitle={false}
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
