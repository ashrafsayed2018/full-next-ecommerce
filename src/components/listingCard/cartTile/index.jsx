export default function CardTile({ item }) {
  return (
    <>
      <div className="overflow-hidden h-96 aspect-video">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale == "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full p-1 font-bold tracking-wide text-white text-[12px] sm:py-2 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="w-full my-4 mx-auto flex flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p className="mr-3 font-semibold text-sm">{item.price}</p>
        </div>
        <h3 className="mb-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </>
  );
}
