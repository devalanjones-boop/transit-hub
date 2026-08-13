


const Input = ({

    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    className = "",
    disabled = false
}) => {

    return (

        <input

            type={type}
            name={name}
            value={value}
            onChange={onChange}
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
}

export default Input