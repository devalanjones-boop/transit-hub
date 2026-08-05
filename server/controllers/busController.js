const busService = require("../services/busServices");

let createBus = async (req, res) => {
  try {
    await busService.createBus(req.body);

    return res.status(201).json({
      success: true,
      message: "Bus created successfully",
    });
  } catch (err) {
    if (err.message == "Bus already exists") {
      return res.status(409).json({
        success: false,
        message: "Bus registration number already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let getAllBuses = async (req, res) => {
  try {
    const buses = await busService.getAllBuses();

    res.status(200).json({
      success: true,
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

let getBusById = async (req, res) => {
  try {
    const bus = await busService.getBusById(req.params.id)

    return res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

let updateBus = async (req, res) => {
  try {
    await busService.updateBus(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Bus update successfully",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

let deleteBus = async (req, res) => {
  try {
    await busService.deleteBus(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
