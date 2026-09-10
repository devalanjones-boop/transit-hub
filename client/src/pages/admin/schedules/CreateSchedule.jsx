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
import Input from "../../../components/common/Input";
import { createSchedule } from "../../../services/scheduleService";






const CreateSchedule = () => {

    let navigate = useNavigate();

    let {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createScheduleSchema),
        defaultValues: {
            stops: [],
            days: [],
            status: ""
        }
    })

    let [buses, setBuses] = useState([]);
    let [routes, setRoutes] = useState([]);
    let [stops, setStops] = useState([]);
    let [selectedStops, setSelectedStops] = useState([]);
    let [loading, setLoading] = useState(false);
    let [draggedIndex, setDraggedIndex] = useState(null);
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    let [selectedDays, setSelectedDays] = useState([]);

    let statusOptions = [
        { value: "", label: "Select Status" },
        { value: "ON_TIME", label: "On Time" },
        { value: "DELAYED", label: "Delayed" },
        { value: "CANCELLED", label: "Cancelled" },
        { value: "COMPLETED", label: "Completed" }
    ];


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

        let newSelectedStops;

        if (isSelected) {

            newSelectedStops = selectedStops.filter(
                (selectedStops) => selectedStops._id !== stop._id
            );

        } else {

            newSelectedStops = [
                ...selectedStops,
                stop
            ];

        }

        setSelectedStops(newSelectedStops);

        let currentStopValues = watch("stops") || [];

        let newStopValues = newSelectedStops.map(
            (selectedStop, index) => {

                let existingStop = currentStopValues.find(
                    (stopValue) =>
                        stopValue.stopId === selectedStop._id
                );

                return {
                    stopId: selectedStop._id,
                    stopSequence: index + 1,
                    estimatedTime: existingStop?.estimatedTime || ""
                };

            }
        );

        setValue("stops", newStopValues, {
            shouldValidate: true,
            shouldDirty: true
        });

        trigger("stops");

    };

    let handleDrop = (dropIndex) => {

        if (draggedIndex === null || draggedIndex === dropIndex) {
            return;
        }

        let reorderedStops = [...selectedStops];

        let draggedStop = reorderedStops[draggedIndex];

        reorderedStops.splice(draggedIndex, 1);
        reorderedStops.splice(dropIndex, 0, draggedStop);

        setSelectedStops(reorderedStops);

        let currentStopValues = watch("stops") || [];

        let reorderedStopValues = reorderedStops.map((stop, index) => {

            let oldIndex = selectedStops.findIndex(
                (selectedStop) => selectedStop._id === stop._id
            );

            return {

                stopId: stop._id,
                stopSequence: index + 1,
                estimatedTime: currentStopValues[oldIndex]?.estimatedTime || ""
            };

        });

        setValue("stops", reorderedStopValues);

        setDraggedIndex(null);

    }

    let handleDayChange = (day) => {

        let isSelected = selectedDays.includes(day);

        let newSelectedDays;

        if (isSelected) {

            newSelectedDays = selectedDays.filter(
                (selectedDay) => selectedDay !== day
            );

        } else {

            newSelectedDays = [
                ...selectedDays,
                day
            ];

        }

        setSelectedDays(newSelectedDays);

        setValue("days", newSelectedDays, {
            shouldDirty: true
        });

        trigger("days");

    };

    let handleAllDaysChange = () => {

        let newSelectedDays;

        if (selectedDays.length === days.length) {

            newSelectedDays = [];

        } else {

            newSelectedDays = [...days];

        }

        setSelectedDays(newSelectedDays);

        setValue("days", newSelectedDays, {
            shouldDirty: true
        });

        trigger("days")

    };

    let onSubmit = async (data) => {

        try {

            setLoading(true);

            let response = await createSchedule(data);

            toast.success(response.data.message);

            navigate("/admin/schedules");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to create schedule");

        } finally {

            setLoading(false);

        }

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

                            <div className="flex items-center mb-3">

                                <h3 className="font-medium text-gray-700">
                                    Selected Stops
                                </h3>

                                <span className="font-medium text-gray-700 ml-auto w-40">
                                    Expected Arrival Time
                                </span>

                            </div>

                            {selectedStops.length > 0 ? (

                                <div className="space-y-2">

                                    {selectedStops.map((stop, index) => (

                                        <div
                                            key={stop._id}
                                            draggable
                                            onDragStart={() => setDraggedIndex(index)}
                                            onDragOver={(event) => event.preventDefault()}
                                            onDrop={() => handleDrop(index)}
                                            className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3"
                                        >

                                            <span className="cursor-move text-gray-500">
                                                ☷
                                            </span>

                                            <span className="font-medium text-gray-700 w-8">
                                                {index + 1}
                                            </span>

                                            <span className="text-gray-700 flex-1">
                                                {stop.stopName}
                                            </span>

                                            <div className="w-40">

                                                <Input
                                                    type="time"
                                                    {...register(`stops.${index}.estimatedTime`)}
                                                />

                                                {errors.stops?.[index]?.estimatedTime && (
                                                    <ErrorMessage
                                                        message={errors.stops[index].estimatedTime.message}
                                                    />
                                                )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="text-gray-500">
                                    No stops selected
                                </p>

                            )}

                            {errors.stops && !Array.isArray(errors.stops) && (
                                <ErrorMessage message={errors.stops.message} />
                            )}

                        </div>

                    </div>

                    {/* Days */}

                    <div>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Days
                        </h2>

                        <div className="space-y-3">

                            {/* All Days */}

                            <label className="flex items-center gap-3">

                                <Input
                                    type="checkbox"
                                    checked={selectedDays.length === days.length}
                                    onChange={handleAllDaysChange}
                                    className="!w-4 !h-4"
                                />

                                <span className="text-gray-700">
                                    All Days
                                </span>

                            </label>

                            {/* Individual Days */}

                            <div className="grid grid-cols-3 gap-3">

                                {days.map((day) => (

                                    <label
                                        key={day}
                                        className="flex items-center gap-3"
                                    >

                                        <Input
                                            type="checkbox"
                                            checked={selectedDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                            className="!w-4 !h-4"
                                        />

                                        <span className="text-gray-700">
                                            {day}
                                        </span>

                                    </label>

                                ))}

                            </div>

                            {errors.days && (
                                <ErrorMessage message={errors.days.message} />
                            )}

                        </div>

                    </div>

                    {/* Schedule Information */}

                    <div>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Schedule Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            {/* Departure Time */}

                            <div>

                                <label
                                    htmlFor="departureTime"
                                    className="block mb-2 font-medium text-gray-700"
                                >
                                    Departure Time
                                </label>

                                <Input
                                    id="departureTime"
                                    type="time"
                                    {...register("departureTime")}
                                />

                                {errors.departureTime && (
                                    <ErrorMessage message={errors.departureTime.message} />
                                )}

                            </div>

                            {/* Arrival Time */}

                            <div>

                                <label
                                    htmlFor="arrivalTime"
                                    className="block mb-2 font-medium text-gray-700"
                                >
                                    Arrival Time
                                </label>

                                <Input
                                    id="arrivalTime"
                                    type="time"
                                    {...register("arrivalTime")}
                                />

                                {errors.arrivalTime && (
                                    <ErrorMessage message={errors.arrivalTime.message} />
                                )}

                            </div>

                        </div>

                        {/* Status */}

                        <div className="mt-5">

                            <label
                                htmlFor="status"
                                className="block mb-2 font-medium text-gray-700"
                            >
                                Status
                            </label>

                            <Select
                                id="status"
                                {...register("status")}
                                options={statusOptions}
                            />

                            {errors.status && (
                                <ErrorMessage message={errors.status.message} />
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