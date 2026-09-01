const busTypeService = require("../services/busTypeServices")

const calculateFare = async (req, res) => {
  try {
    const { busTypeId, distanceInKm, passengers } = req.body;
    const result = await busTypeService.calculateFareService(busTypeId, distanceInKm, passengers);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const estimateFare = async (req, res) => {
  try {
    const { busTypeId, distanceInKm, passengers } = req.query;
    const result = await busTypeService.calculateFareService(busTypeId, distanceInKm, passengers);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const getAllFares = async (req, res) => {
  try {
    const fareRates = await busTypeService.getAllFaresService();
    return res.status(200).json({ success: true, data: fareRates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFareById = async (req, res) => {
  try {
    const fareRate = await busTypeService.getFareByIdService(req.params.id);
    return res.status(200).json({ success: true, data: fareRate });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

const updateFare = async (req, res) => {
  try {
    const updatedFare = await busTypeService.updateFareService(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Fare rates updated successfully",
      data: updatedFare,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

module.exports = {
  calculateFare,
  estimateFare,
  getAllFares,
  getFareById,
  updateFare,
};