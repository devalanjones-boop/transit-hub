import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button"
import EmptyState from "../../../components/common/EmptyState";
import Pagination from "../../../components/common/Pagination";
import Input from "../../../components/common/Input";
import { deleteBus, getAllBuses } from "../../../services/busService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusList = () => {

    let navigate = useNavigate();

    let [buses, setBuses] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");
    let [currentPage, setCurrentPage] = useState(1);
    let [search, setSearch] = useState("");


    let fetchBuses = async () => {

        try {

            setLoading(true)

            let response = await getAllBuses();

            setBuses(response.data.data)

            setError("")


        } catch (error) {


            setError(error.response?.data?.message || "Failed To Get Buses")

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

    let handleDelete = async (id) => {

        try {

            let response = await deleteBus(id);

            alert(response.data.message)

            fetchBuses();

        } catch (error) {

            alert(error.response?.data?.message || "Failed To Delete Bus")
        }

    }

    if (buses.length === 0) {

        return (

            <EmptyState
                title="No Buses Found"
                message="You Haven't Added Any Buses Yet. Create First Bus"
                buttonText="Create Bus"
                onClick={() => navigate("/admin/buses/create")}
            />
        )
    }

    let filteredBuses = buses.filter((bus) =>

        bus.busRegNumber?.toLowerCase().includes(search.toLowerCase()) ||
        bus.busName?.toLowerCase().includes(search.toLowerCase())

    );

    let busesPerPage = 10;

    let indexOfLastBus = currentPage * busesPerPage;
    let indexOfFirstBus = indexOfLastBus - busesPerPage;

    let currentBuses = filteredBuses.slice(

        indexOfFirstBus,
        indexOfLastBus
    );

    let totalPages = Math.ceil(
        filteredBuses.length / busesPerPage
    );




    return (

        <>

            <div className="p-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">

                    Bus List

                </h1>

                <div className="mb-6">

                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Search Bus or Number..."
                        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="overflow-x-auto">

                    {search && filteredBuses.length === 0 ? (

                        <EmptyState
                            title="No Result Found"
                            message="No buses match your search. Try a different bus number or bus name"

                        />

                    ) : (

                        <>

                            <table className="w-full border-collapse border border-gray-300">

                                <thead>

                                    <tr className="bg-gray-100">

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Bus Number
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Bus Name
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Bus Type
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Status
                                        </th>

                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Action
                                        </th>


                                    </tr>

                                </thead>


                                <tbody>

                                    {currentBuses.map((bus) => (

                                        <tr key={bus._id}>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {bus.busRegNumber}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {bus.busName}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {bus.busType}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                {bus.status}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">

                                                <Button onClick={() => navigate(`/admin/buses/${bus._id}`)}>
                                                    View
                                                </Button>

                                                <Button onClick={() => navigate(`/admin/buses/${bus._id}/edit`)}>
                                                    Edit
                                                </Button>

                                                <Button onClick={() => handleDelete(bus._id)}>
                                                    Delete
                                                </Button>

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

export default BusList;