export default function SelectComponent({
  label,
  value,
  onChange,
  labelFor,
  options = [],
}) {
  return (
    <div className="relative">
      <label
        htmlFor={labelFor}
        className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600"
      >
        {label}
      </label>
      <select
        value={value}
        id={labelFor}
        onChange={onChange}
        className="block bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mt-0 m-0 text-base"
      >
        {options && options.length ? (
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="" id=""></option>
        )}
      </select>
    </div>
  );
}
