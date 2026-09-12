import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      id,
      type = "text",
      placeholder = "",
      className = "",
      disabled = false,
      ...rest // Collects step, onBlur, onChange, name, and everything from react-hook-form
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${className}`}
        {...rest} // Passes step="any" and RHF registration handlers to the native DOM element
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
