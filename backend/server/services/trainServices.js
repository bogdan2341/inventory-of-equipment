const TrainModel = require("../models/trainModel");

const { dataBaseError, checkDataBaseError } = require("../serverErrors");

exports.getAllTrains = async () => {
  try {
    const trains = await TrainModel.find();
    if (!trains) {
      throw dataBaseError.notFound("Train not found");
    }
    return trains;
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

exports.getTrainById = async (id) => {
  try {
    const train = await TrainModel.findOne({ _id: id }).exec();
    if (!train) {
      throw dataBaseError.notFound("Train not found");
    }
    return train;
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

exports.getTrainIdByNumber = async (number) => {
  try {
    const train = await TrainModel.findOne({ number }).exec();
    if (!train) {
      throw dataBaseError.notFound(`TrainId not found by number ${number}`);
    }
    return train.id;
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

exports.createNewTrain = async (number, manufactureYear, dateOfLastKR) => {
  try {
    await new TrainModel({
      number,
      manufactureYear,
      dateOfLastKR,
    }).save();
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

exports.deleteTrainById = async (id) => {
  try {
    await TrainModel.findOneAndDelete({ _id: id }).exec();
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};
