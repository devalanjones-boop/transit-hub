const Joi = require("joi");

const fareCalculationScheme = Joi.object({
  busTypeId: Joi.string().hex().length(24).required().messages({
    "string.hex": "busTypeId must be a valid MongoDB ObjectId",
    "string.length": "busTypeId must be 24 characters long",
    "any.required": "busTypeId is required",
  }),
  distanceInKm: Joi.number().positive().required().messages({
    "number.positive": "distanceInKm must be greater than 0",
    "any.required": "distanceInKm is required",
  }),
  passengers: Joi.number().integer().min(1).default(1),
});

const fareQuerySchema = Joi.object({
  busTypeId: Joi.string().hex().length(24).required(),
  distanceInKm: Joi.number().positive().required(),
  passengers: Joi.number().integer().min(1).default(1),
});

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "ID must be a valid MongoDB ObjectId",
    "string.length": "ID must be 24 characters long",
  }),
});

const updateFareSchema = Joi.object({
  bustype: Joi.string().trim().optional(),
  baseFare: Joi.number().min(0).optional(),
  farePerKm: Joi.number().positive().optional(),
}).min(1);

module.exports = {
  fareCalculationScheme,
  fareQuerySchema,
  idParamSchema,
  updateFareSchema,
};
