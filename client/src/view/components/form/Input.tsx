import React from "react";

interface InputProps {
  title: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, title, type }) => {
  return (
    <div className="flex justify-between items-start gap-2 flex-col w-full">
      <label className="text-[#777] font-semibold text-lg">{title}</label>
      <input
        className="bg-[#f2f2f2] h-12 p-3 px-5 outline-none w-full"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
