const Joi = require("joi");

let busValidationSchema = Joi.object({
  busName: Joi.string().trim().required().messages({
    "string.empty": "Bus name is required",
    "any.required": "Bus name is required",
  }),
  busRegNumber: Joi.string().trim().required().messages({
    "string.empty": "Bus registration number is required",
    "any.required": "Bus registration number is required",
  }),
  busType: Joi.string().hex().length(24).messages({
    "string.empty": "Bus type is required",
    "string.hex": "Invalid Bus Type ID",
    "string.length": "Invalid Bus Type ID",
    "any.required": "Bus type is required",
  }),
  status: Joi.string().valid("active", "inactive").default("active").messages({
    "any.only": "Status must be either active or inactive",
  }),
});

let updateBusValidationSchema = Joi.object({
  busName: Joi.string().trim(),
  busRegNumber: Joi.string().trim(),
  busType: Joi.string().hex().length(24),
  status: Joi.string().valid("active", "inactive"),
}).min(1);

module.exports = {
  busValidationSchema,
  updateBusValidationSchema,
};
