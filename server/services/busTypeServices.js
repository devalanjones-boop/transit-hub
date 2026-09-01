const busType = require("../models/busTypeModel");

const calculateFareService = async (
  busTypeId,
  distanceInKm,
  passengers = 1,
) => {
  const bus = await busType.findById(busTypeId);
  if (!bus) {
    const err = new Error("Bus type not found");
    err.statusCode = 404;
    throw err;
  }

  const farePerPassenger = bus.baseFare + distanceInKm * buss.farePerKm;
  const totalFare = farePerPassenger * passengers;

  return {
    busType: bus.busType,
    baseFare: bus.baseFare,
    farePerKm: bus.farePerKm,
    distanceInKm,
    passengers,
    farePerPassenger: Number(farePerPassenger.toFixed(2)),
    totalFare: Number(totalFare.toFixed(2)),
  };
};

const getAllFaresService = async () => {
  return await BusType.find().select("busType baseFare farePerKm createdAt updatedAt");
};

const getFareByIdService = async (id) => {
  const fare = await BusType.findById(id);
  if (!fare) {
    const err = new Error("Fare rate configuration not found");
    err.statusCode = 404;
    throw err;
  }
  return fare;
};

const updateFareService = async (id, updateData) => {
  const updatedFare = await BusType.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedFare) {
    const err = new Error("Fare rate configuration not found to update");
    err.statusCode = 404;
    throw err;
  }

  return updatedFare;
};

module.exports = {
  calculateFareService,
  getAllFaresService,
  getFareByIdService,
  updateFareService,
};