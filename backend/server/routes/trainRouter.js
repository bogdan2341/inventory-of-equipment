const router = require("express").Router();
const trainController = require("../controllers/trainController");
const { createNewTrainValidation } = require("../middleware/validations");

router.get("/", trainController.getAllTrains);

router.post("/", createNewTrainValidation, trainController.createNewTrain);

router.get("/:id", trainController.getTrainById);

router.delete("/:id", trainController.deleteTrainById);

module.exports = router;
