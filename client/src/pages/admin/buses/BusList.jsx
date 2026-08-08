import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";

import { getAllBuses } from "../../../services/busService";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"

const BusList = () => {

    // let navigate = useNavigate();

    let [buses, setBuses] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");

    let fetchBuses = async () => {

        try {

            setLoading(true)

            let response = await getAllBuses();

            setBuses(response.data.data)

            setError("")


        } catch (error) {


            setError(error.response?.data?.message || "failed to get buses")

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchBuses();

    }, [])

    if (loading) {

        return <Loading message="Loading Buses..." />

    }

    if (error) {

        return <ErrorMessage message={error} />

    }




    return (

        <>

            <div className="p-6">

                <h1 className="text-2x1 font-bold text-gray-800">

                    Bus List

                </h1>

            </div>

        </>
    );

};

export default BusList;