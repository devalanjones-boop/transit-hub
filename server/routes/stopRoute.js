const express = require("express")
const validateStop = require("../middleware/validateStop")
const { createStop, updateStop, getAllStops, getStopById, deleteStop } = require("../controllers/stopController")
const router = express.Router()

router.post("/", validateStop, createStop)
router.get("/", getAllStops)
router.get("/:id", getStopById) 
router.put("/:id", validateStop, updateStop)
router.get("/:id", deleteStop) 

module.exports = router