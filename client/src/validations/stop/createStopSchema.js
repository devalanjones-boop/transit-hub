
import * as yup from "yup";

const createStopSchema = yup.object({

    stopName: yup
        .string()
        .trim()
        .required("Stop Name is required"),

    latitude: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .typeError("Latitude must be a number")
        .required("Latitude is required"),

    longitude: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .typeError("Longitude must be a number")
        .required("Longitude is required")

})

export default createStopSchema;