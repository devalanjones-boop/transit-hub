const mongoose = require("mongoose");

const busTypeSchema = new mongoose.Schema(
  {
    busType: {
      type: String,
      required: true,
      trim: true,
    },
    baseFare: {
      type: Number,
      required: true,
    },
    farePerKm: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("busType", busTypeSchema);