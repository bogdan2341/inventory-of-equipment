const router = require("express").Router();
const trainRouter = require("./trainRouter");
const mileageRouter = require("./mileageRouter");

router.use("/trains", trainRouter);
router.use("/mileage", mileageRouter);

module.exports = router;
