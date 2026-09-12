import * as yup from "yup";

const createStopSchema = yup.object({
  stopName: yup.string().trim().required("Stop Name is required"),

  latitude: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null || isNaN(value)
        ? undefined
        : Number(originalValue),
    )
    .typeError("Latitude must be a valid decimal number")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .required("Latitude is required"),

  longitude: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null || isNaN(value)
        ? undefined
        : Number(originalValue),
    )
    .typeError("Longitude must be a valid decimal number")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .required("Longitude is required"),
});

export default createStopSchema;
