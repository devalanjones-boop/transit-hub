let Joi = require("joi")

const stopValidationSchema = Joi.object({
    stopName: Joi.string().trim().required(),

    latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),

    longitude: Joi.number()
    .min(-180)
    .max(180)
    .required(),
})

module.exports = stopValidationSchema