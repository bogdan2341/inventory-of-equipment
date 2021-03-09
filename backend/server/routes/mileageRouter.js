const router = require("express").Router();
const mileageController = require("../controllers/mileageController");
const { saveMileagePerDayValidation } = require("../middleware/validations");

router.get("/:trainId/:year/:month", mileageController.getMileagePerMonth);

router.post("/:trainId/:year/:month", mileageController.createMileagePerMonth);

router.put(
  "/:trainId/:year/:month",
  saveMileagePerDayValidation,
  mileageController.saveMileagePerDay
);

router.get("/:trainNumber/:year", mileageController.getMileagePerYear);

module.exports = router;
