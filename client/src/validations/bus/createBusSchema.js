
import * as yup from "yup";

const createBusSchema = yup.object({

    busRegNumber: yup
        .string()
        .required("Bus registration number is required"),

    busName: yup
        .string()
        .required("Bus Name is Required"),

    busType: yup
        .string()
        .required("Bus Type is required"),

    status: yup
        .string()
        .required("Bus Status is required")


})

export default createBusSchema;