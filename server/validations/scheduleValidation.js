const Joi = require("joi");
const mongoose = require("mongoose");

let daysEnum = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const objectIdValidator = (value, helper) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.console.error("any.invalid");
    }
    return value
}

const scheduleValidattioSchema = Joi.object({
    busId: Joi.string().custom(objectIdValidator).required().messages({
        "any.invalid": "busId must be a valid MongoDB ObjectId",
        "any.required":"busId is required",
    }),
    routeId: Joi.string().custom(objectIdValidator).required().messages({
        "any.invalid": "routeId must be a valid MongoDB ObjectId",
        "any.required":"routeId is required",
    }),
    stopId: Joi.string().custom(objectIdValidator).required().messages({
        "any.invalid": "stopId must be a valid MongoDB ObjectId",
        "any.required":"stopId is required",
    }),
    departureTime: Joi.string().pattern(timeRegex).required().messages({
        "string.pattern.base": "departureTime must be in HH:mm 24-hour format",
        "any.required": "departureTime is required"
    }),
    arrivalTime: Joi.string().pattern(timeRegex).required().messages({
        "string.pattern.base": "arrivalTime must be in HH:mm 24-hour format",
        "any.required": "arrivalTime is required"
    }),
    days: Joi.array()
    .items(Joi.string().valid(...daysEnum))
    .min(1)
    .required()
    .messages({
        "array.min":"At least one operational day must be specified",
        "any.required": "days are required",
    }),
    status: Joi.string()
    .valid("ON_TIME", "DELAYED", "CANCELLED", "COMPLETED")
    .default("ON_TIME")
})

const updateScheduleValidationSchema = Joi.object({
  busId: Joi.string().custom(objectIdValidator),
  routeId: Joi.string().custom(objectIdValidator),
  stopId: Joi.string().custom(objectIdValidator),
  departureTime: Joi.string().pattern(timeRegex),
  arrivalTime: Joi.string().pattern(timeRegex),
  days: Joi.array()
    .items(Joi.string().valid(...daysEnum))
    .min(1),
  status: Joi.string().valid("ON_TIME", "DELAYED", "CANCELLED", "COMPLETED"),
}).min(1);

module.exports = {
    scheduleValidattioSchema,
    updateScheduleValidationSchema
}
