import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import createRouteSchema from "../../../validations/route/createRouteSchema";
import { useState } from "react";
import { createRoute } from "../../../services/routeService";
import { toast } from "sonner";




const CreateRoute = () => {

    let navigate = useNavigate();

    let {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createRouteSchema)
    })

    let [loading, setLoading] = useState(false)

    let source = watch("source");
    let destination = watch("destination");

    let routeName =
        source?.trim() && destination?.trim()
            ? `${source.trim()} - ${destination.trim()}`
            : "";

    let onSubmit = async (data) => {

        try {

            setLoading(true);

            let routeData = {
                source: data.source.trim(),
                destination: data.destination.trim(),
                routeName: `${data.source.trim()} - ${data.destination.trim()}`
            }

            let response = await createRoute(routeData);

            toast.success(response.data.message);

            navigate("/admin/routes");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to Create Route");

        } finally {

            setLoading(false);
        }

    }

    return(
        
    )


}