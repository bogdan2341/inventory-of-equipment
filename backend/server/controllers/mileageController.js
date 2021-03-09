const mileageServices = require("../services/mileageServices");
const trainServices = require("../services/trainServices");
const { validationResult } = require("express-validator");

const { dataBaseError } = require("../serverErrors");

exports.getMileagePerMonth = async (req, res, next) => {
  const { trainId, year, month } = req.params;
  try {
    const mileagePerMonth = await mileageServices.getMileagePerMonth(
      trainId,
      year,
      month
    );
    res.json(mileagePerMonth).status(201);
  } catch (error) {
    next(error);
  }
};

exports.createMileagePerMonth = async (req, res, next) => {
  const { trainId, year, month } = req.params;
  try {
    const mileagePerMonth = await mileageServices.findOrCreateMileagePerMonth(
      trainId,
      year,
      month
    );
    res.json({ ...mileagePerMonth.toObject() }).status(201);
  } catch (error) {
    next(error);
  }
};

exports.getMileagePerYear = async (req, res, next) => {
  const { trainNumber, year } = req.params;
  try {
    const mileagePerYear = await mileageServices.getMileagePerYear(
      trainNumber,
      year
    );
    res.json(mileagePerYear).status(201);
  } catch (error) {
    next(error);
  }
};

exports.saveMileagePerDay = async (req, res, next) => {
  const { trainId, year, month } = req.params;
  const { dayAfterService, mileageToday, day, typeOfService } = req.body;
  try {
    validationResult(req).throw();
    await mileageServices.saveMileagePerDay(trainId, year, month, {
      dayAfterService,
      mileageToday,
      day,
      typeOfService,
    });
    res.json({ msg: "Ok" }).status(201);
  } catch (error) {
    next(error);
  }
};
