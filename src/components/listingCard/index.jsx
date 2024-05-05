"use client";
import Notification from "@/components/toastNotification/index";
import { useRouter } from "next/navigation";
import CardButton from "./cartButton";
import CardTile from "./cartTile";
import { useEffect } from "react";

export default function ListingCard({ allProducts }) {
  const router = useRouter();
  useEffect(() => router.refresh(), [router]);
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        {allProducts && allProducts.length ? (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 ms:gap-4 lg:mt-16">
            {allProducts.map((item, index) => (
              <article
                className="relative flex flex-col overflow-hidden border cursor-pointer"
                key={index}
              >
                <CardTile item={item} />
                <CardButton item={item} />
              </article>
            ))}
          </div>
        ) : (
          <>
            <h1 className="text-center  font-bold text-lg">
              No products found
            </h1>
          </>
        )}
      </div>
      <Notification />
    </section>
  );
}
