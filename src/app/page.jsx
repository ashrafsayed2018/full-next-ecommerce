"use client";

import ListingCard from "@/components/listingCard";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  async function getListOfProducts() {
    const response = await getAllAdminProducts();
    if (response.success) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid max-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:6xl">
            Best fashion collection
          </h1>
          <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum
            itaque iste odit aliquid totam quos excepturi odio pariatur est.
          </p>
          <Link href="/product/listings/all-products" className="button">
            Explore Shop collections
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          {/* // create women clothes image */}
          <img
            src="https://media.6media.me/media/catalog/product/p/d/pdd10562_chartreuse_xl.jpg"
            alt="Explore Shop collections"
          />
        </div>
      </div>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:y-16 sm:x-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
          <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
            <div className="max-w-md mx-auto text-center lg:text-left">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Summer sale collection
              </h2>
              <button
                className="mt-4 button"
                onClick={() => router.push("/product/listings/all-products")}
              >
                Shop all
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 lg:py-8">
            <ul className="grid grid-cols-2 gap-4">
              {products && products.length
                ? products
                    .filter((item) => item.onSale === "yes")
                    .map((item, index) => (
                      <li
                        key={index}
                        className="p-6 bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                          router.push(`/product/${item._id}`);
                        }}
                      >
                        <div>
                          <img
                            src={item.imageUrl}
                            className="w-full object-cover rounded aspect-square"
                            alt={item.name}
                          />
                        </div>
                        <div className="mt-3">
                          <h3>{item.name}</h3>
                          <p className="text-gray-900">
                            {item.price}{" "}
                            <span className="text-red-500 font-medium">
                              - {item.priceDrop}%
                            </span>
                          </p>
                        </div>
                      </li>
                    ))
                : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Shop by category
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          <li>
            <div className="relative block group">
              <img
                src="https://media.6media.me/media/catalog/product/p/d/pdd10562_chartreuse_xl.jpg"
                className="w-full object-cover aspect-square"
                alt=""
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">mens</h3>
                <button
                  className="button"
                  onClick={() => router.push("/product/listings/men")}
                >
                  Shop now
                </button>
              </div>
            </div>
          </li>
          <li>
            <div className="relative block group">
              <img
                src="https://media.6media.me/media/catalog/product/p/d/pdd10562_chartreuse_xl.jpg"
                className="w-full object-cover aspect-square"
                alt=""
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Kids</h3>
                <button
                  className="button"
                  onClick={() => router.push("/product/listings/kids")}
                >
                  Shop now
                </button>
              </div>
            </div>
          </li>
          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative block group">
              <img
                src="https://media.6media.me/media/catalog/product/p/d/pdd10562_chartreuse_xl.jpg"
                className="w-full object-cover aspect-square"
                alt=""
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">women</h3>
                <button
                  className="button"
                  onClick={() => router.push("/product/listings/women")}
                >
                  Shop now
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
