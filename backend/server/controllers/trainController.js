const trainServices = require("../services/trainServices");
const { validationResult } = require("express-validator");

exports.getAllTrains = async (req, res, next) => {
  try {
    const allTrains = await trainServices.getAllTrains();
    res.json(allTrains).status(201);
  } catch (error) {
    next(error);
  }
};

exports.getTrainById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const train = await trainServices.getTrainById(id);
    res.json(train).status(201);
  } catch (error) {
    next(error);
  }
};

exports.createNewTrain = async (req, res, next) => {
  try {
    validationResult(req).throw();
    const { number, manufactureYear, dateOfLastKR } = req.body;
    await trainServices.createNewTrain(number, manufactureYear, dateOfLastKR);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrainById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await trainServices.deleteTrainById(id);
  } catch (error) {
    next(error);
  }
};

// const trainSchema = new Schema({
//     number: String,
//     manufactureYear: {
//         type: Number,
//         min: 1960,
//         max: 1995
//     },
//     dateOfLastKR: Date
// });
