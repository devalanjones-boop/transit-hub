let Joi = require("joi")

const stopValidationSchema = Joi.object({
  stopName: Joi.string().trim().required(),

  latitude: Joi.number()
    .min(-90)
    .max(90)
    .precision(8) // Optional: allows up to 8 decimal places
    .required(),

  longitude: Joi.number()
    .min(-180)
    .max(180)
    .precision(8)
    .required(),
});

module.exports = stopValidationSchema 

