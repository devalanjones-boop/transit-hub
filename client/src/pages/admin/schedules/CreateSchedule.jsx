import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import createScheduleSchema from "../../../validations/schedule/createScheduleSchema";
import { useEffect, useState } from "react";
import { getAllBuses } from "../../../services/busService";
import { getAllRoutes } from "../../../services/routeService";
import { getAllStops } from "../../../services/stopService";
import Select from "../../../components/common/Select";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import { toast } from "sonner";
import Input from "../../../components/common/Input"






const CreateSchedule = () => {

    let navigate = useNavigate();

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createScheduleSchema)
    })

    let [buses, setBuses] = useState([]);
    let [routes, setRoutes] = useState([]);
    let [stops, setStops] = useState([]);
    let [selectedStops, setSelectedStops] = useState([]);
    let [loading, setLoading] = useState(false);


    useEffect(() => {

        let fetchData = async () => {

            try {

                let [busResponse, routeResponse, stopResponse] = await Promise.all([
                    getAllBuses(),
                    getAllRoutes(),
                    getAllStops()
                ]);

                setBuses(busResponse.data.data);
                setRoutes(routeResponse.data.data);
                setStops(stopResponse.data.data);

            } catch (error) {

                toast.error(

                    error.response?.data?.message || "Failed to load buses and routes"

                );
            }
        };

        fetchData();

    }, []);

    let handleStopChange = (stop) => {

        let isSelected = selectedStops.some(
            (selectedStops) => selectedStops._id === stop._id
        );

        if (isSelected) {

            setSelectedStops(
                selectedStops.filter(
                    (selectedStops) => selectedStops._id !== stop._id
                )

            );

        } else {

            setSelectedStops([
                ...selectedStops,
                stop
            ]);

        }

    };

    let onSubmit = async (data) => {

        console.log(data);

    }

    let busOptions = [
        {
            value: "",
            label: "Select Bus"
        },
        ...buses.map((bus) => ({
            value: bus._id,
            label: `${bus.busRegNumber} - ${bus.busName}`
        }))
    ];

    let routeOptions = [
        {
            value: "",
            label: "Select Route"
        },
        ...routes.map((route) => ({
            value: route._id,
            label: route.routeName
        }))
    ];

    return (

        <div className="p-6">

            {/* Back Button */}

            <div className="mb-6">

                <Button
                    onClick={() => navigate("/admin/schedules")}
                >

                    ← Back
                </Button>

            </div>

            {/* Heading */}

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Create Schedule
                </h1>

            </div>

            {/* Form */}

            <div className="border border-gray-300 rounded-lg p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">

                    {/* Bus */}

                    <div>

                        <label
                            htmlFor="busId"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Bus

                        </label>

                        <Select
                            id="busId"
                            {...register("busId")}
                            options={busOptions}
                        />

                        {errors.busId && (
                            <ErrorMessage message={errors.busId.message} />
                        )}

                    </div>

                    {/* Route */}

                    <div>

                        <label
                            htmlFor="routeId"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Route

                        </label>

                        <Select
                            id="routeId"
                            {...register("routeId")}
                            options={routeOptions}
                        />

                        {errors.routeId && (
                            <ErrorMessage message={errors.routeId.message} />
                        )}

                    </div>

                    {/* Stops */}

                    <div>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Stops
                        </h2>

                        <div>

                            <h3 className="font-medium text-gray-700 mb-3">
                                Available Stops
                            </h3>

                            <div className="space-y-2">

                                {stops.map((stop) => (

                                    <label
                                        key={stop._id}
                                        className="flex items-center gap-3"
                                    >

                                        <Input
                                            type="checkbox"
                                            checked={selectedStops.some(
                                                (selectedStops) =>
                                                    selectedStops._id === stop._id
                                            )}
                                            onChange={() => handleStopChange(stop)}
                                            className="!w-4 !h-4"
                                        />

                                        <span className="text-gray-700">
                                            {stop.stopName}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                        <div className="mt-6">

                            <h3 className="font-medium text-gray-700 mb-3">
                                Selected Stops
                            </h3>

                            {selectedStops.length > 0 ? (

                                <div className="space-y-2">

                                    {selectedStops.map((stop, index) => (

                                        <div
                                            key={stop._id}
                                            className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3"
                                        >

                                            <span className="font-medium text-gray-700 w-8">
                                                {index + 1}
                                            </span>

                                            <span className="text-gray-700">
                                                {stop.stopName}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="text-gray-500">
                                    No stops selected
                                </p>

                            )}

                        </div>

                    </div>

                    {/* Create Button */}

                    <div className="pt-2">

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Schedule"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateSchedule;