import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import updateStopSchema from "../../../validations/stop/updateStopSchema";
import { getStopById, updateStop } from "../../../services/stopService";
import { toast } from "sonner";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";




const UpdateStop = () => {

    let { id } = useParams();
    let navigate = useNavigate();

    let [loading, setLoading] = useState(true);
    let [updating, setUpdating] = useState(false);
    let [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(updateStopSchema)
    })

    let onSubmit = async (data) => {

        try {

            setUpdating(true);

            let response = await updateStop(id, data);

            toast.success(response.data.message);

            navigate("/admin/stops");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Update Stop")

        } finally {

            setUpdating(false);
        }

    }

    useEffect(() => {

        let fetchStop = async () => {

            try {

                setLoading(true);

                setError("")

                let response = await getStopById(id);

                reset({

                    stopName: response.data.data.stopName,
                    latitude: response.data.data.latitude,
                    longitude: response.data.data.longitude,

                });

            } catch (error) {

                setError(error.response?.data?.message || "Failed to load stop")

            } finally {

                setLoading(false);

            }

        }

        fetchStop();

    }, [id, reset]);

    if (loading) {

        return <Loading message="Loading Stop..." />

    }

    if (error) {

        return <ErrorMessage message={error} />

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

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Update Stop
                </h1>

            </div>

            {/* Form */}

            <div className="border border-gray-300 rounded-lg p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">

                    {/* Stop Name */}

                    <div>

                        <label
                            htmlFor="stopName"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Stop Name

                        </label>

                        <Input
                            id="stopName"
                            {...register("stopName")}
                            placeholder="Enter Stop Name"
                        />

                        {errors.stopName && (
                            <ErrorMessage message={errors.stopName.message} />
                        )}

                    </div>

                    {/* Latitude */}

                    <div>

                        <label
                            htmlFor="latitude"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Latitude

                        </label>

                        <Input
                            id="latitude"
                            {...register("latitude")}
                            placeholder="Enter Latitude"
                        />

                        {errors.latitude && (
                            <ErrorMessage message={errors.latitude.message} />
                        )}

                    </div>

                    {/* Longitude */}

                    <div>

                        <label
                            htmlFor="longitude"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Longitude

                        </label>

                        <Input
                            id="longitude"
                            {...register("longitude")}
                            placeholder="Enter Longitude"
                        />

                        {errors.longitude && (
                            <ErrorMessage message={errors.longitude.message} />
                        )}

                    </div>

                    {/* Update Button */}

                    <div className="pt-2">

                        <Button
                            type="submit"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update Stop"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );


};

export default UpdateStop;