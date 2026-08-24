import * as yup from "yup"


const updateBusSchema = yup.object({

    busRegNumber: yup
        .string()
        .required("Bus registration number is required"),

    busName: yup
        .string()
        .required("Bus name is required"),

    busType: yup
        .string()
        .required("Bus type is required"),

    status: yup
        .string()
        .required("Bus status is required")

})

export default updateBusSchema;