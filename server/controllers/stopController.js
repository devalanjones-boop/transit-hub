const stopService = require("../services/stopService");
const { message } = require("../validations/stopValidation");

const createStop = async (req, res) => {
  try {
    const stop = await stopService.createStop(req.body);

    res.status(201).json({
      success: true,
      message: "stop created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllStops = async (req, res) => {
  try {
    const stops = await stopService.getAllStops();

    res.status(200).json({
      success: true,
      data: stops,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getStopById = async (req, res) => {
  try {
    const stop = await stopService.getStopById(req.params.id);

    if (!stop) {
        return res.status(404).json({
            success: false,
            message: "Stop not found"
        })
    }

    res.status(200).json({
      success: true,
      data: stop,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateStop = async (req, res) => {
  try {
    const stop = await stopService.updateStop(req.params.id, req.body);

    if (!stop) {
        return res.status(404).json({
            success: false,
            message: "Stop not found"
        })
    }

    res.status(200).json({
      success: true,
      message: "stop updated successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteStop = async (req, res) => {
  try {
    const stop = await stopService.deleteStop(req.params.id);

    if (!stop) {
        return res.status(404).json({
            success: false,
            message: "Stop not found"
        })
    }

    res.status(200).json({
      success: true,
      message: "Stop deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
    createStop,
    getAllStops,
    getStopById,
    updateStop,
    deleteStop
}