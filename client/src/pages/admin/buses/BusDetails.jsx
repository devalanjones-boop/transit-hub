import Button from "../../../components/common/Button";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";

import { getBusById } from "../../../services/busService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const BusDetails = () => {

    let navigate = useNavigate();
    let { id } = useParams;

    let [bus, setBus] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");


    let fetchBus = async () => {

        try {

            setLoading(true);

            let response = getBusById(id);

            setBus((await response).data.data);

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


    return (

        <div className="p-6">

            {/* Back Button */}

            <div className="mb-6">

                <Button
                    onClick={() => navigate("admin/buses")}
                >
                    ← Back to Bus List

                </Button>

            </div>

            {/* Heading */}

            <div className="flex items-center justify-between mb-6">

                <div className="flex-1 text-center">

                    <h1 className="text-2xl font-bold text-gray-800">

                        Bus Details

                    </h1>

                </div>

            </div>

        </div>

    )

}