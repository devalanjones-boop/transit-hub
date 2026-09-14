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
    .populate({
      path: "busId",
      populate: {
        path: "busType"
      }
    })
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

const getAssignedSchedulesByBus = async (busId) => {

  const now = new Date();

  const currentDay = now.toLocaleDateString("en-US", {
    weekday: "long"
  });

  const currentTime = now.toTimeString().slice(0, 5);

  const schedules = await Schedule.find({
    busId,
  })
    .populate("routeId", "routeName startLocation endLocation")
    .populate("stops.stopId", "stopName location")
    .sort({
      departureTime: 1
    });

  return schedules;

};

const getSchedulesByRoute = async (routeId) => {

  const schedules = await Schedule.find({
    routeId
  })
    .populate({
      path: "busId",
      populate: {
        path: "busType"
      }
    })
    .populate("routeId")
    .sort({
      departureTime: 1
    });

  return schedules;
};

const getSchedulesByStop = async (stopId) => {

  const schedules = await Schedule.find({
    "stops.stopId": stopId
  })
    .populate({
      path: "busId",
      populate: {
        path: "busType"
      }
    })
    .populate("routeId")
    .populate("stops.stopId")
    .sort({
      departureTime: 1
    });

  return schedules;

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
  getAssignedSchedulesByBus,
  getSchedulesByRoute,
  getSchedulesByStop,
  updateSchedule,
  deleteSchedule,
};