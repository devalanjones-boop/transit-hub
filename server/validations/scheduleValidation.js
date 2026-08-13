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
    
})
