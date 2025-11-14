import React from "react";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: TInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black mb-1.5">{label}</label>
      <input
        {...props}
        className={`w-full rounded-md border px-3 py-2.5 text-sm border-gray-300 focus:border-blue-500"
        focus:outline-none`}
      />
      {error && <p className="text-xs text-[#EE0039]">{error}</p>}
    </div>
  );
}
