import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getBusById, updateBus } from "../../../services/busService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import updateBusSchema from "../../../validations/bus/updateBusSchema";



const UpdateBus = () => {

    let { id } = useParams();
    let navigate = useNavigate();

    let [loading, setLoading] = useState(true);
    let [updating, setUpdating] = useState(false);
    let [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(updateBusSchema)
    })

    let onSubmit = async (data) => {

        try {

            setError("");

            setUpdating(true);

            let response = await updateBus(id, data);

            console.log(response.data.message);

            navigate("/admin/buses");

        } catch (error) {

            setError(error.response?.data?.message || "Failed to update bus");

        } finally {

            setUpdating(false);
        }

    }

    useEffect(() => {

        let fetchBus = async () => {

            try {

                setLoading(true);

                setError("");

                let response = await getBusById(id);

                reset({

                    busRegNumber: response.data.data.busRegNumber,
                    busName: response.data.data.busName,
                    busType: response.data.data.busType,
                    status: response.data.data.status

                });

            } catch (error) {

                setError(error.response?.data?.message || "Failed to load bus")

            } finally {

                setLoading(false);

            }

        }

        fetchBus();

    }, [id])

    if (loading) {

        return <Loading message="Loading bus..." />

    }

    if (error) {

        return <ErrorMessage message={error} />
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

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Update Bus
                </h1>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5">

                {/* Bus Registration Number */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">
                        Bus Registration Number
                    </label>

                    <Input
                        {...register("busRegNumber")}
                        placeholder="Enter Bus Registration Number"
                    />

                    {errors.busRegNumber && (
                        <ErrorMessage message={errors.busRegNumber.message} />
                    )}

                </div>

                {/* Bus Name */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">
                        Bus Name
                    </label>

                    <Input
                        {...register("busName")}
                        placeholder="Enter Bus Name"
                    />

                    {errors.busName && (
                        <ErrorMessage message={errors.busName.message} />
                    )}

                </div>

                {/* Bus Type */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">
                        Bus Type
                    </label>

                    <Select
                        {...register("busType")}
                        options={[
                            {
                                value: "",
                                label: "Select Bus Type"
                            },
                            {
                                value: "ordinary",
                                label: "Ordinary"
                            },
                            {
                                value: "express",
                                label: "Express"
                            },
                            {
                                value: "super_fast",
                                label: "Super Fast"
                            }
                        ]}

                    />

                    {errors.busType && (
                        <ErrorMessage message={errors.busType.message} />
                    )}

                </div>

                {/* Status */}

                <div>

                    <label className="block mb-2 font-medium text-gray-700">
                        Status
                    </label>

                    <Select
                        {...register("status")}
                        options={[
                            {
                                value: "",
                                label: "Select Status"
                            },
                            {
                                value: "active",
                                label: "Active"
                            },
                            {
                                value: "inactive",
                                label: "Inactive"
                            }
                        ]}

                    />

                    {errors.status && (
                        <ErrorMessage message={errors.status.message} />
                    )}

                </div>

                {/* Update Button */}

                <div className="pt-2">

                    <Button
                        type="submit"
                        disabled={updating}
                    >
                        {updating ? "Updating..." : "Update Bus"}
                    </Button>

                </div>

            </form>

        </div>
    )

}

export default UpdateBus;