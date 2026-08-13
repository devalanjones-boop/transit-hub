let Bus = require("../models/busModel");

const createBus = async (data) => {
  let existingBus = await Bus.findOne({
    busRegNumber: data.busRegNumber,
  });

  if (existingBus) {
    throw new Error("Bus already exists");
  }

  let bus = await Bus.create(data);

  return bus;
};

const getAllBuses = async () => {
  return await Bus.find().populate("busType");
};

const getBusById = async (id) => {
  return await Bus.findById(id).populate("busType");

  if (!bus) {
    const error = new Error("Bus not found");
    error.status = 404;
    throw error;
  }

  return bus;
};

const updateBus = async (id, busData) => {
  let bus = await Bus.findByIdAndUpdate(id, busData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!bus) {
    const error = new Error("Bus not found");
    error.status = 404;
    throw error;
  }

  return bus;
};

const deleteBus = async (id) => {
  const bus = await Bus.findByIdAndDelete(id);

  if (!bus) {
    const error = new Error("Bus not found");
    error.status = 404;
    throw error;
  }

  return bus;
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
