import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { getStopById, deleteStop } from "../../../services/stopService";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Button from "../../../components/common/Button";
import StopMap from "../../../components/common/StopMap";




const StopDetails = () => {


    let navigate = useNavigate();
    let { id } = useParams();

    let [stop, setStop] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");


    let fetchStop = async () => {

        try {

            setLoading(true);

            setError("");

            let response = await getStopById(id);

            setStop(response.data.data);

        } catch (error) {

            setError(error.response?.data?.message || "Failed to get stop")

        } finally {

            setLoading(false);
        }

    }

    useEffect(() => {

        fetchStop();

    }, [id]);

    if (loading) {

        return <Loading message="Loading Stop Details..." />

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

            let response = await deleteStop(id);

            toast.success(response.data.message);

            navigate("/admin/stops");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Delete Stop");

        }

    }

    return (

        <div className="p-6">

            {/* Back Button */}

            <div className="mb-6">

                <Button
                    onClick={() => navigate("/admin/stops")}
                >
                    ← Back

                </Button>

            </div>

            {/* Heading */}

            <div className="flex items-center justify-between mb-6">

                <div className="flex-1 text-center">

                    <h1 className="text-2xl font-bold text-gray-800">

                        Stop Details

                    </h1>

                </div>

                {/* Edit & Delete Button */}

                <div className="flex gap-2">

                    <Button
                        onClick={() => navigate(`/admin/stops/${id}/edit`)}
                    >
                        Edit

                    </Button>

                    <Button onClick={handleDelete}>

                        Delete

                    </Button>

                </div>

            </div>

            {/* Stop Information */}

            <div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">

                    Stop Information

                </h2>

                <div className="border border-gray-300 rounded-lg p-4 space-y-3">

                    <p>

                        <strong>Stop Name</strong>{" "}
                        {stop.stopName}
                    </p>

                    <p>

                        <strong>Latitude</strong>{" "}
                        {stop.latitude}
                    </p>

                    <p>

                        <strong>Longitude</strong>{" "}
                        {stop.longitude}
                    </p>

                </div>

            </div>

            {/* Stop Location */}

            <div className="mt-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Stop Location
                </h2>

                <div className="border border-gray-300 rounded-lg overflow-hidden">

                    <StopMap
                        latitude={stop.latitude}
                        longitude={stop.longitude}
                        stopName={stop.stopName}
                    />

                </div>

            </div>

        </div>

    );


};

export default StopDetails;