"use client";

export default function ProductDetails({ product }) {
  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-12 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                </div>
              </div>
              {/*  product 2 images */}
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <flex className="flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-shrink-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center"
                  >
                    <img
                      src={product.imageUrl}
                      className="w-full h-full object-cover"
                      alt={product.name}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center"
                  >
                    <img
                      src={product.imageUrl}
                      className="w-full h-full object-cover"
                      alt={product.name}
                    />
                  </button>
                </flex>
              </div>
            </div>
          </div>
          {/* product details */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center gap-3 my-4">
                <h1
                  className={`text-xl lg:text-2xl font-bold ${
                    product.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  $ {product.price}
                </h1>
                {product.onSale === "yes" ? (
                  <p className="text-xl lg:text-2xl text-red-700">
                    $
                    {(
                      product.price -
                      product.price * (product.priceDrop / 100)
                    ).toFixed(2)}
                  </p>
                ) : null}
              </div>
              <button type="button" className="button w-3/5">
                Add to cart
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {product.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                Cancle any time
              </li>
            </ul>
            <div className="lg:col-span-3">
              <div className="border-b border-gary-400">
                <nav className="flex gap-4">
                  <a
                    href=""
                    className="border-b-2 border-gray-900 text-gray-900 py-4 text-sm font-medium"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <p className="mt-8 flow-root sm:mt-12">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
