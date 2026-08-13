


const Loading = ({

    message = "Loading..."
}) => {

    return (

        <div className="flex items-center justify-center h-96">

            <p className="text-lg font-medium text-gray-600">

                {message}

            </p>

        </div>
    )
}

export default Loading