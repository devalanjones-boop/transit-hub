const Joi = require("joi");

const objectId = Joi.string()
  .hex()
  .length(24)
  .message("Invalid ObjectId format");

const timeFormat = Joi.string()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .message("Time must be in 24-hour HH:mm format");

const daysEnum = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const statusEnum = ["ON_TIME", "DELAYED", "CANCELLED", "COMPLETED"];

const scheduleValidationSchema = Joi.object({
  busId: objectId.required(),
  routeId: objectId.required(),
  stops: Joi.array()
    .items(
      Joi.object({
        stopId: objectId.required(),
        stopSequence: Joi.number().integer().min(1).required(),
      })
    )
    .min(2)
    .required()
    .messages({
      "array.min": "A schedule must have at least an origin and a destination stop",
    }),
  arrivalTime: timeFormat.required(),
  departureTime: timeFormat.required(),
  days: Joi.array()
    .items(Joi.string().valid(...daysEnum))
    .min(1)
    .unique()
    .required(),
  status: Joi.string()
    .valid(...statusEnum)
    .default("ON_TIME"),
});

const updateScheduleValidationSchema = Joi.object({
  busId: objectId,
  routeId: objectId,
  stops: Joi.array()
    .items(
      Joi.object({
        stopId: objectId.required(),
        stopSequence: Joi.number().integer().min(1).required(),
      })
    )
    .min(2),
  arrivalTime: timeFormat,
  departureTime: timeFormat,
  days: Joi.array().items(Joi.string().valid(...daysEnum)).min(1).unique(),
  status: Joi.string().valid(...statusEnum),
}).min(1);

module.exports = {
  scheduleValidationSchema,
  updateScheduleValidationSchema,
};