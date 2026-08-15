import Button from "../../../components/common/Button";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { getBusById, deleteBus } from "../../../services/busService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const BusDetails = () => {

    let navigate = useNavigate();
    let { id } = useParams();

    let [bus, setBus] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");


    let fetchBus = async () => {

        try {

            setLoading(true);

            let response = await getBusById(id);

            setBus(response.data.data);

            setError("");

        } catch (error) {

            setError(error.response?.data?.message || "Failed to get bus");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchBus();

    }, [id]);


    if (loading) {

        return <Loading message="Loading Bus Details..." />
    }

    if (error) {

        return <ErrorMessage message={error} />
    }

    let handleDelete = async () => {

        try {

            let response = await deleteBus(id)

            alert(response.data.message)

            navigate("/admin/buses")

        } catch (error) {

            setError(error.response?.data?.message || "Failed to Delete Bus")
        }

    }


    return (

        <div className="p-6">

            {/* Back Button */}

            <div className="mb-6">

                <Button
                    onClick={() => navigate("/admin/buses")}
                >
                    ← Back

                </Button>

            </div>

            {/* Heading */}

            <div className="flex items-center justify-between mb-6">

                <div className="flex-1 text-center">

                    <h1 className="text-2xl font-bold text-gray-800">

                        Bus Details

                    </h1>

                </div>

                {/* "Edit & Delete button" */}
                <div>

                    <Button
                        onClick={() => navigate(`/admin/buses/${id}/edit`)}
                    >
                        Edit

                    </Button>

                    <Button onClick={handleDelete}>

                        Delete

                    </Button>

                </div>

            </div>

            {/* Bus Information */}

            <div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">

                    Bus Information

                </h2>

                <div className="border border-gray-300 rounded-lg p-4 space-y-3">

                    <p>

                        <strong> Bus Number</strong>{" "}
                        {bus.busRegNumber}
                    </p>

                    <p>

                        <strong> Bus Name</strong>{" "}
                        {bus.busName}
                    </p>

                    <p>

                        <strong> Bus Type</strong>{" "}
                        {bus.busType}
                    </p>

                    <p>

                        <strong> Bus Status</strong>{" "}
                        {bus.status}
                    </p>

                </div>

            </div>

        </div>

    )

}
export default BusDetails;