import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type,
  register,
  errors,
  required,
}) => {
  return (
    <div className="text-[#777] flex justify-between items-start gap-2 flex-col w-full">
      <label className=" font-semibold text-base">{label}</label>
      <input
        className={`bg-[#f2f2f2] font-light  px-5 py-2 outline-none w-full  
        `}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
// ${errors[id] ? "border-rose-500" : "border-neutral-300"}
//         ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
