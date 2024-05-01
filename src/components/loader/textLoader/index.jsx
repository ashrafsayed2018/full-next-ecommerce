"use client";

import { PulseLoader } from "react-spinners";

export default function TextLoader({ text, color, loading, size }) {
  return (
    <div className="flex gap-1 items-center">
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || "10px"}
        data-testid="loader"
      />
    </div>
  );
}
