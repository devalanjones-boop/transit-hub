const Stop = require("../models/stopModel");

const createStop = async (data) => {
  return await Stop.create(data);
};

const getAllStops = async () => {
  return await Stop.find();
};

const getStopById = async () => {
  return await Stop.findById(id);
};

const updateStop = async (id, data) => {
  return await Stop.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteStop = async (id) => {
    return await Stop.findByIdAndDelete(id)
}

module.exports = {
    createStop,
    getAllStops,
    getStopById,
    updateStop,
    deleteStop
}