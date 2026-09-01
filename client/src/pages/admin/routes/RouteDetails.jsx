import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { deleteRoute, getRouteById } from "../../../services/routeService";
import Button from "../../../components/common/Button";


const RouteDetails = () => {

    let navigate = useNavigate();
    let { id } = useParams();

    let [route, setRoute] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");


    let fetchRoute = async () => {

        try {

            setLoading(true);

            setError("");

            let response = await getRouteById(id);

            setRoute(response.data.data);

        } catch (error) {

            setError(error.response?.data?.message || "Failed to get route");

        } finally {

            setLoading(false);
        }

    }

    useEffect(() => {

        fetchRoute();

    }, [id]);


    if (loading) {

        return <Loading message="Loading Route Details..." />
    }

    if (error) {

        return <ErrorMessage message={error} />
    }

    let handleDelete = async () => {

        let result = await Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;
        }

        try {

            let response = await deleteRoute(id)

            toast.success(response.data.message)

            navigate("/admin/routes")

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Delete Route")
        }

    }


    return (

        <div className="p-6">

            {/* Back Button */}

            <div className="mb-6">

                <Button
                    onClick={() => navigate("/admin/routes")}
                >
                    ← Back

                </Button>

            </div>

            {/* Heading */}

            <div className="flex items-center justify-between mb-6">

                <div className="flex-1 text-center">

                    <h1 className="text-2xl font-bold text-gray-800">

                        Route Details

                    </h1>

                </div>

                {/* Edit & Delete Button */}

                <div className="flex gap-2">

                    <Button
                        onClick={() => navigate(`/admin/routes/${id}/edit`)}
                    >
                        Edit

                    </Button>

                    <Button onClick={handleDelete} >

                        Delete

                    </Button>

                </div>

            </div>

            {/* Route Information */}

            <div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">

                    Route Information

                </h2>

                <div className="border border-gray-300 rounded-lg p-4 space-y-3">

                    <p>

                        <strong>Route Name:</strong>{" "}
                        {route.routeName}
                    </p>

                    <p>

                        <strong>Source:</strong>{" "}
                        {route.source}
                    </p>

                    <p>

                        <strong>Destination:</strong>{" "}
                        {route.destination}
                    </p>

                </div>

            </div>

        </div>

    )

}
export default RouteDetails;