import classnames from "classnames";
import React from "react";

export interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "secondary",
}) => {
  return (
    <button
      type="button"
      className={classnames({
        "px-4 py-2 rounded": true,
        "bg-blue-500 text-white": variant === "primary",
        "bg-gray-200 text-gray-700": variant === "secondary",
      })}
    >
      {label}
    </button>
  );
};
