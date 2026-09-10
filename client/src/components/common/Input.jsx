import { ref } from "yup"
import { forwardRef } from "react"



const Input = forwardRef(({

    id,
    type = "text",
    name,
    value,
    onChange,
    checked,
    placeholder = "",
    className = "",
    disabled = false

}, ref) => {

    return (

        <input

            id={id}
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            placeholder={placeholder}
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

        />

    )
})

export default Input