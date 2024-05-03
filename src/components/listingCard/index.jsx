"use client";

import CardButton from "./cartButton";
import CardTile from "./cartTile";

export default function ListingCard({ allProducts }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 ms:gap-4 lg:mt-16">
          {allProducts && allProducts.length
            ? allProducts.map((item, index) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={index}
                >
                  <CardTile item={item} />
                  <CardButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
