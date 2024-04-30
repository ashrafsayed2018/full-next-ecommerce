export default function InputComponent({
  label,
  placeholder,
  type,
  value,
  onChange,
  labelFor,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={labelFor}
        className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600"
      >
        {label}
      </label>
      <input
        id={labelFor}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mt-0 m-0 text-base"
      />
    </div>
  );
}
