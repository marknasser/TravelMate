import React from "react";

interface ButtonProps {
  type?: "submit" | "button" | "reset";
  bgColor?: string;
  textColor?: string;
  text: string;
  bigSize?: boolean;
  border?: boolean;
  onClick?: () => void;
  extraStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  bgColor = "#ec8c6f",
  text,
  border = false,
  textColor = "#fff",
  onClick,
  bigSize,
  extraStyle,
}) => {
  return (
    <button
      className={`font-light px-4 py-2 rounded-full uppercase 
         ${bigSize ? "text-sm md:text-lg" : "text-sm md:text-base"}
         ${border ? "border" : ""} 
         ${extraStyle}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
