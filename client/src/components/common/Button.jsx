



const Button = ({

    children,
    type = "button",
    onClick,
    className = "",
    disabled = false
}) => {
    return (

        <button

            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4
                py-2
                rounded-lg
                font-medium
                transition-all
                duration-200
                bg-blue-600
                text-white
                hover:bg-blue-700
                disabled:bg-gray-400
                disabled:cursor-not-allowed
                ${className}`}
        >

            {children}


        </button>

    )

}

export default Button