let Joi = require("joi")

const routeValidationSchema = Joi.object({
    routeName: Joi.string().required().messages({
    "string.empty": "Route name is required",
    "any.required": "Route name is required",
  }),

    source: Joi.string().required().messages({
    "string.empty": "Source is required",
    "any.required": "Source is required",
  }),

    destination: Joi.string().required().messages({
    "string.empty": "Destination is required",
    "any.required": "Destination is required",
  })
})

const updateRouteValidationSchema = Joi.object({
  routeName: Joi.string().trim().messages({
    "string.empty": "Route name cannot be empty",
  }),

  source: Joi.string().trim().messages({
    "string.empty": "Source cannot be empty",
  }),

  destination: Joi.string().trim().messages({
    "string.empty": "Destination cannot be empty",
  }),

}).min(1).messages({
  "object.min": "At least one field is required to update the route",
});


module.exports = {
  routeValidationSchema,
  updateRouteValidationSchema,
};