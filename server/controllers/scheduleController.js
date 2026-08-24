const scheduleService = require("../services/scheduleServices")

let createSchedule = async (req, res) => {
  try {
    await scheduleService.createSchedule(req.body);

    return res.status(201).json({
      success: true,
      message: "Schedule created successfully",
    });
  } catch (err) {
    if (err.message === "Schedule already exists") {
      return res.status(409).json({
        success: false,
        message: "Schedule for this bus and route already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();

    return res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

let getScheduleById = async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.id);

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

let updateSchedule = async (req, res) => {
  try {
    await scheduleService.updateSchedule(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

let deleteSchedule = async (req, res) => {
  try {
    await scheduleService.deleteSchedule(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};