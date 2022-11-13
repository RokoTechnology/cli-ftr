import classNames from "classnames";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "default";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "h-8 px-4 font-semibold cursor-pointer text-2xs rounded-3 flex flex-row items-center justify-center shrink-0 grow",
          className,
          {
            "bg-accent-blue border border-accent-blue text-white":
              variant === "primary",
            "bg-transparent border border-basic-black-8 text-basic-black-8":
              variant === "secondary",
            "bg-basic-gray border border-basic-gray text-basic-black-8":
              variant === "tertiary",
            "bg-white border border-white text-basic-black-8":
              variant === "default",
          }
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
