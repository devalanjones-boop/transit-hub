const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: [true, "Bus ID is required"],
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: [true, "Route ID is required"],
    },
    stopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop",
      required: [true, "Stop ID is required"],
    },
    departureTime: {
      type: String,
      required: [true, "Departure time is required"],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Please use 24-hour HH:mm format"],
    },
    arrivalTime: {
      type: String,
      required: [true, "Arrival time is required"],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Please use 24-hour HH:mm format"],
    },
    days: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one operational day must be specified",
      },
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    status: {
      type: String,
      enum: ["ON_TIME", "DELAYED", "CANCELLED", "COMPLETED"],
      default: "ON_TIME",
    },
  },
  {
    timestamps: true,
  },
);

scheduleSchema.index({ routeId: 1, days: 1})

module.exports = mongoose.model("Schedule", scheduleSchema);