
import { forwardRef } from "react";

const Select = forwardRef(({

    id,
    name,
    value,
    onChange,
    options = [],
    className = "",
    disabled = false

}, ref) => {

    return (

        <select

            id={id}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                disabled:bg-gray-100
                disabled:cursor-not-allowed
                ${className}`}
        >

            {options.map((option) => (

                <option
                    key={option.value}
                    value={option.value}
                >

                    {option.label}

                </option>
            ))}


        </select>

    );
});

export default Select;