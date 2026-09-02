import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { getRouteById, updateRoute } from "../../../services/routeService";
import { toast } from "sonner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import updateRouteSchema from "../../../validations/route/updateRouteSchema";
import Loading from "../../../components/common/Loading";


const UpdateRoute = () => {

    let { id } = useParams();
    let navigate = useNavigate();

    let [loading, setLoading] = useState(true);
    let [updating, setUpdating] = useState(false);
    let [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(updateRouteSchema)
    })

    let source = watch("source")
    let destination = watch("destination")

    let routeName =
        source?.trim() && destination?.trim()
            ? `${source.trim()} - ${destination.trim()}`
            : "";

    let onSubmit = async (data) => {

        try {

            setUpdating(true);

            let routeData = {
                source: data.source.trim(),
                destination: data.destination.trim(),
                routeName: `${data.source.trim()} - ${data.destination.trim()}`
            }

            let response = await updateRoute(id, routeData);

            toast.success(response.data.message);

            navigate("/admin/routes");

        } catch (error) {

            toast.error(error.response?.data.message || "Failed to update Route")

        } finally {

            setUpdating(false);
        }

    }

    useEffect(() => {

        let fetchRoute = async () => {

            try {

                setLoading(true);

                setError("");

                let response = await getRouteById(id);

                reset({

                    source: response.data.data.source,
                    destination: response.data.data.destination,

                });

            } catch (error) {

                setError(error.response?.data.message || "Failed to load Route")

            } finally {

                setLoading(false);

            }

        }

        fetchRoute();

    }, [id, reset]);

    if (loading) {

        return <Loading message="Loading Route..." />

    }

    if (error) {

        return <ErrorMessage message={error} />

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

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Update Route
                </h1>

            </div>

            {/* Form */}

            <div className="border border-gray-300 rounded-lg p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">

                    {/* Source */}

                    <div>

                        <label
                            htmlFor="source"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Source

                        </label>

                        <Input
                            id="source"
                            {...register("source")}
                            placeholder="Enter Source"
                        />

                        {errors.source && (
                            <ErrorMessage message={errors.source.message} />
                        )}

                    </div>

                    {/* Destination */}

                    <div>

                        <label
                            htmlFor="destination"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Destination

                        </label>

                        <Input
                            id="destination"
                            {...register("destination")}
                            placeholder="Enter Destination"
                        />

                        {errors.destination && (

                            <ErrorMessage message={errors.destination.message} />
                        )}

                    </div>

                    {/* Route Name */}

                    <div>

                        <label
                            htmlFor="routeName"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Route Name

                        </label>

                        <Input
                            id="routeName"
                            value={routeName}
                            readOnly
                            placeholder="Route name will be generated automatically"
                        />

                    </div>

                    {/* Update Button */}

                    <div className="pt-2">

                        <Button
                            type="submit"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update Route"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );


};

export default UpdateRoute;