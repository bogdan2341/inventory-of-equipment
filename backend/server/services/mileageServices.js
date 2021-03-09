const mileageModel = require("../models/mileageModel");
const trainsServices = require("./trainServices");
const { dataBaseError } = require("../serverErrors");

exports.getMileagePerMonth = async (trainId, year, month) => {
  try {
    const mileagePerMonth = await mileageModel
      .findOne({ trainId, year, month })
      .exec();

    if (!mileagePerMonth)
      throw dataBaseError.notYetCreated(
        `Mileage per ${month}/${year} not yet created.`
      );

    return mileagePerMonth;
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

exports.getMileagePerYear = async (trainId, year) => {
  try {
    const mileagePerYear = await mileageModel.find({ trainId, year }).exec();
    if (!mileagePerYear) {
      throw dataBaseError.notYetCreated(
        `Mileage per ${month}/${year} not yet created.`
      );
    }
    return mileagePerYear;
  } catch (error) {
    throw dataBaseError.somethingWrong(error);
  }
};

/*
  1. Find trainId by number
  2. Find mileage by month, year and trainId
    2.1 if not exist create
  3. Push or Update information about day.
*/

exports.saveMileagePerDay = async (trainId, year, month, dayInfo) => {
  try {
    const mileagePerMonth = await this.getMileagePerMonth(trainId, year, month);

    const updatedDate = mileagePerMonth.days.find(
      (obj) => obj.day == dayInfo.day
    );

    if (!updatedDate) {
      await mileagePerMonth
        .updateOne({
          $push: { days: dayInfo },
          $inc: { mileagePerMonth: dayInfo.mileageToday },
        })
        .exec();
    } else {
      updatedDate.dayAfterService = dayInfo.dayAfterService;
      updatedDate.mileageToday = dayInfo.mileageToday;
      updatedDate.typeOfService = dayInfo.typeOfService;

      mileagePerMonth.mileagePerMonth = mileagePerMonth.days.reduce(
        (acc, day) => acc + day.mileageToday,
        0
      );
      await mileagePerMonth.save();
    }
  } catch (error) {
    throw new dataBaseError.somethingWrong(error);
  }
};

const findOrCreateMileagePerMonth = async (trainId, year, month) => {
  try {
    let mileagePerMonth = await mileageModel.findOne({
      trainId,
      year,
      month,
    });

    if (!mileagePerMonth) {
      mileagePerMonth = await mileageModel.create({
        trainId,
        year,
        month,
        mileagePerMonth: 0,
        days: [],
      });
    }

    return mileagePerMonth;
  } catch (error) {
    throw new dataBaseError.somethingWrong(error);
  }
};

exports.findOrCreateMileagePerMonth = findOrCreateMileagePerMonth;
