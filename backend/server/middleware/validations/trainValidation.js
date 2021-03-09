const { body } = require("express-validator");

exports.createNewTrainValidation = [
  body("number").matches(/^\d{3}-\d{1}/, g),
  body("manufactureYear").isInt({ max: 2000, min: 1950 }),
  body("dateOfLastKR").isDate(),
];
