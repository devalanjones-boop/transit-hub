const express = require("express")
const { validateFareQuery, validateIdParam, validateCalculateFare, validateUpdateFare } = require("../middleware/validateBusType")
const { estimateFare, getAllFares, getFareById, calculateFare, updateFare } = require("../controllers/busTypeController")
const router = express.Router()

router.get("/estimate", validateFareQuery, estimateFare)
router.get("/", getAllFares)
router.get("/:id", validateIdParam, getFareById)
router.post("/fare", validateCalculateFare, calculateFare)
router.put("/:id", validateIdParam, validateUpdateFare, updateFare)

module.exports = router