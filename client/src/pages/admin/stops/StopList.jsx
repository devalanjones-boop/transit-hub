import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { deleteStop, getAllStops } from "../../../services/stopService";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Swal from "sweetalert2";
import { toast } from "sonner";
import EmptyState from "../../../components/common/EmptyState";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Pagination from "../../../components/common/Pagination";




const StopList = () => {

    let navigate = useNavigate();

    let [stops, setStops] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");
    let [currentPage, setCurrentPage] = useState(1);
    let [search, setSearch] = useState("");

    let fetchStops = async () => {

        try {

            setLoading(true);

            setError("")

            let response = await getAllStops();

            setStops(response.data.data)

        } catch (error) {

            setError(error.response?.data?.message || "Failed To Get Stops")

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchStops();

    }, [])

    if (loading) {

        return <Loading message="Loading Stops..." />

    }

    if (error) {

        return <ErrorMessage message={error} />

    }

    let handleDelete = async (id) => {

        let result = await Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            let response = await deleteStop(id);

            toast.success(response.data.message);

            setCurrentPage(1);

            fetchStops();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Delete Stop")

        }

    }

    if (stops.length === 0) {

        return (

            <EmptyState
                title="No Stops Found"
                message="You Haven't Added Any Stops Yet. Create First Stop"
                buttonText="Create Stop"
                onClick={() => navigate("/admin/stops/create")}
                icon="🚏"
            />
        )
    }

    let filteredStops = stops.filter((stop) =>

        stop.stopName?.toLowerCase().includes(search.toLowerCase())

    );

    let stopsPerPage = 10;

    let indexOfLastStop = currentPage * stopsPerPage;
    let indexOfFirstStop = indexOfLastStop - stopsPerPage;

    let currentStops = filteredStops.slice(

        indexOfFirstStop,
        indexOfLastStop
    );

    let totalPages = Math.ceil(
        filteredStops.length / stopsPerPage
    );



    return (

        <>

            <div className="p-4 sm:p-6">

                <div className="flex items-center justify-between mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">

                        Stop List

                    </h1>

                    <Button
                        onClick={() => navigate("/admin/stops/create")}
                    >
                        Add Stop
                    </Button>

                </div>

                <div className="mb-6">

                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Search Stop Name..."
                        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="w-full overflow-x-auto">

                    {search && filteredStops.length === 0 ? (

                        <EmptyState
                            title="No Result Found"
                            message="No stops match your search. Try a different stop name"
                            icon="🚏"

                        />

                    ) : (

                        <>

                            <table className="min-w-[700px] w-full border-collapse border border-gray-300">

                                <thead>

                                    <tr className="bg-gray-100">

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Stop Name
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Latitude
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Longitude
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {currentStops.map((stop) => (

                                        <tr key={stop._id}>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {stop.stopName}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {stop.latitude}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {stop.longitude}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">

                                                <div className="flex flex-col gap-2 sm:flex-row">

                                                    <Button onClick={() => navigate(`/admin/stops/${stop._id}`)}>
                                                        View
                                                    </Button>

                                                    <Button onClick={() => navigate(`/admin/stops/${stop._id}/edit`)}>
                                                        Edit
                                                    </Button>

                                                    <Button onClick={() => handleDelete(stop._id)}>
                                                        Delete
                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                            <Pagination

                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}

                            />

                        </>

                    )}

                </div>

            </div>

        </>

    );

};

export default StopList;