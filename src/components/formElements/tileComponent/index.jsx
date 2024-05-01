export default function TileComponent({ data, selected = [], onClick }) {
  return data.length > 0 ? (
    <div className="flex flex-wrap items-center gap-1 mt-3">
      {data.map((dataItem) => (
        <label
          key={dataItem.id}
          className="cursor-pointer rounded-lg border border-black px-6 py-2 font-bold"
        >
          {dataItem.label}
        </label>
      ))}
    </div>
  ) : null;
}
