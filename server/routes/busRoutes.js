let express = require("express");
const { validateBus, validateUpdateBus } = require("../middleware/validateBus");
const { createBus, updateBus, getAllBuses, getBusById, deleteBus } = require("../controllers/busController");
let router = express.Router();

router.post("/", validateBus, createBus);
router.get("/", getAllBuses);
router.get("/:id", getBusById);
router.put("/:id", validateUpdateBus, updateBus);
router.delete("/:id", deleteBus);

module.exports = router;
