import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import createBusSchema from "../../../validations/bus/createBusSchema";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { createBus } from "../../../services/busService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllBusTypes } from "../../../services/fareService";




const CreateBus = () => {

    let navigate = useNavigate()

    let {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(createBusSchema)
    })

    let [loading, setLoading] = useState(false)
    let [busTypes, setBusTypes] = useState([]);

    let onSubmit = async (data) => {

        try {

            setLoading(true);

            let response = await createBus(data);

            toast.success(response.data.message);

            navigate("/admin/buses");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Create Bus");

        } finally {

            setLoading(false);
        }

    }

    useEffect(() => {

        let fetchBusTypes = async () => {

            try {

                let response = await getAllBusTypes();

                setBusTypes(response.data.data);

            } catch (error) {

                toast.error(error.response?.data?.message || "Failed to load bus types");

            }

        };

        fetchBusTypes();

    }, []);

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
                    Create Bus
                </h1>

            </div>

            {/* Form */}

            <div className="border border-gray-300 rounded-lg p-6">


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">

                    {/* Bus Registration Number */}

                    <div>

                        <label
                            htmlFor="busRegNumber"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Bus Registration Number

                        </label>

                        <Input
                            id="busRegNumber"
                            {...register("busRegNumber")}
                            placeholder="Enter Bus Registration Number"
                        />

                        {errors.busRegNumber && (
                            <ErrorMessage message={errors.busRegNumber.message} />
                        )}

                    </div>

                    {/* Bus Name */}

                    <div>

                        <label
                            htmlFor="busName"
                            className="block mb-2 font-medium text-gray-700"
                        >

                            Bus Name

                        </label>

                        <Input
                            id="busName"
                            {...register("busName")}
                            placeholder="Enter Bus Name"
                        />

                        {errors.busName && (
                            <ErrorMessage message={errors.busName.message} />
                        )}

                    </div>

                    {/* Bus Type */}

                    <div>

                        <label
                            htmlFor="busType"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Bus Type
                        </label>

                        <Select
                            id="busType"
                            {...register("busType")}
                            options={[
                                {
                                    value: "",
                                    label: "Select Bus Type"
                                },
                                ...busTypes.map((type) => ({
                                    value: type._id,
                                    label: type.busType
                                }))
                            ]}
                        />

                        {errors.busType && (
                            <ErrorMessage message={errors.busType.message} />
                        )}

                    </div>

                    {/* Status */}

                    <div>

                        <label
                            htmlFor="status"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Status
                        </label>

                        <Select
                            id="status"
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

                    {/* Create Button */}

                    <div className="pt-2">

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Bus"}
                        </Button>

                    </div>

                </form>


            </div>


        </div>

    );

};

export default CreateBus;