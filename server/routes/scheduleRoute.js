let express = require("express");
const { validateSchedule, validateUpdateSchedule } = require("../middleware/validateSchedule");
const { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } = require("../controllers/scheduleController");
const router = express.Router()

router.post("/", validateSchedule, createSchedule);
router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", validateUpdateSchedule, updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;