const Schedule = require("../models/scheduleModel")

const createSchedule = async (data) => {
    return await Schedule.create(data)
}
const getAllSchedules = async () => {
  return await Schedule.find()
    .populate("busId")
    .populate("routeId")
    .populate("stops.stopId")
    .lean();
};

const getScheduleById = async (id) => {
  const schedule = await Schedule.findById(id)
    .populate("busId")
    .populate("routeId")
    .populate("stops.stopId")
    .lean();

  if (!schedule) {
    const error = new Error("Schedule not found");
    error.status = 404;
    throw error;
  }

  return schedule;
};

const updateSchedule = async (id, data) => {
  const updatedSchedule = await Schedule.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!updatedSchedule) {
    const error = new Error("Schedule not found");
    error.status = 404;
    throw error;
  }

  return updatedSchedule;
};

const deleteSchedule = async (id) => {
  const deletedSchedule = await Schedule.findByIdAndDelete(id);

  if (!deletedSchedule) {
    const error = new Error("Schedule not found");
    error.status = 404;
    throw error;
  }

  return deletedSchedule;
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};