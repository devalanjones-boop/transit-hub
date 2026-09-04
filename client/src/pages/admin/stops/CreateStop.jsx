import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import createStopSchema from "../../../validations/stop/createStopSchema";
import { useState } from "react";
import { createStop } from "../../../services/stopService";
import { toast } from "sonner";
import Input from "../../../components/common/Input";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";




const CreateStop = () => {

    let navigate = useNavigate();

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createStopSchema)
    })

    let [loading, setLoading] = useState(false)

    let onSubmit = async (data) => {

        try {

            setLoading(true);

            let response = await createStop(data);

            toast.success(response.data.message);

            navigate("/admin/stops");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Create Stop")

        } finally {

            setLoading(false);

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

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Create Stop
                </h1>

            </div>

            {/* Form */}

            <div className="border border-gray-300 rounded-lg p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5" >

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

                    {/* Create Button */}

                    <div className="pt-2">

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Stop"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateStop;