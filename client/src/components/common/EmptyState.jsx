import Button from "./Button"



const EmptyState = ({

    title,
    message,
    buttonText,
    onClick,
    icon = "🚌"
}) => {

    return (

        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-10">

            <div className="text-6xl mb-4">
                {icon}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {title}
            </h1>

            <p className="text-gray-500 text-center mb-6">
                {message}
            </p>

            {buttonText && onClick && (

                <Button onClick={onClick}>

                    {buttonText}

                </Button>

            )}

        </div>
    )
}

export default EmptyState