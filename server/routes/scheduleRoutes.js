const express = require("express");
const { validateSchedule, validateUpdateSchedule } = require("../middleware/validateSchedule");
const { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule, getUpcomingSchedulesByBus } = require("../controllers/scheduleController");
const router = express.Router()

router.post("/", validateSchedule, createSchedule);
router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", validateUpdateSchedule, updateSchedule);
router.delete("/:id", deleteSchedule);
router.get("/:busId/upcoming-schedules", getUpcomingSchedulesByBus)

module.exports = router;