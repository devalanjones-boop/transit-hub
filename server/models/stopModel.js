const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema(
  {
    stopName: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stop", stopSchema);