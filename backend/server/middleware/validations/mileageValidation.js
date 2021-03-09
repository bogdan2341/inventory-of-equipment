const { body } = require("express-validator");

exports.saveMileagePerDayValidation = [
  body("day").isInt({ min: 1, max: 31 }),
  body("mileageToday").isInt({ max: 1000 }),
  body("dayAfterService").isInt({ max: 20 }),
  body("typeOfService").trim().isString().isIn(["", "ТО-3", "ТР-1", "ТР-3"]),
];
